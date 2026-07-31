import { Loan, Member, Book } from '../models/associations.js'
import sequelize from '../db/connectDb.js'
import { sendEmail, overdueEmailTemplate } from '../utils/emailService.js'
import { runOverdueCheck } from '../services/overdueService.js'

const loanIncludes = [
  { model: Member, attributes: ['id', 'name', 'email'] },
  { model: Book, attributes: ['id', 'title', 'isbn', 'available_copies'] }
]

const borrowBook = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { member_id, book_id, due_date, status } = req.body;

    if (!member_id || !book_id || !due_date) {
      await t.rollback();
      return res.status(400).json({ message: "All fields are required" })
    }

    const member = await Member.findByPk(member_id);

    if (!member) {
      await t.rollback();
      return res.status(404).json({ message: "Member not found" })
    }

    const book = await Book.findByPk(book_id)

    if (!book) {
      await t.rollback();
      return res.status(404).json({ message: "Book not found" })
    }

    if (book.available_copies <= 0) {
      await t.rollback();
      return res.status(404).json({ message: "No available Copies" })
    }

    const loan = await Loan.create({
      member_id: member_id,
      book_id: book_id,
      status: status || 'active',
      due_date: due_date
    }, { transaction: t })

    await Book.decrement('available_copies', {
      by: 1, where: { id: book_id }, transaction: t,
    })

    await t.commit();

    const loanWithDetails = await Loan.findByPk(loan.id, {
      include: loanIncludes
    })

    res.status(201).json({ message: "Book Borrowed successfully", loanWithDetails })
  } catch (error) {
    await t.rollback();
    console.log(error)
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const returnBook = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;

    const loan = await Loan.findByPk(id, { transaction: t })

    if (!loan) {
      await t.rollback();
      return res.status(404).json({ message: "Cannot find loan" })
    }

    if (loan.status === 'returned') {
      await t.rollback();
      return res.status(400).json({ message: "Book already returned" })
    }

    loan.return_date = new Date();
    loan.status = 'returned';
    await loan.save({ transaction: t });

    await Book.increment('available_copies', {
      by: 1, where: { id: loan.book_id }, transaction: t,
    })

    await t.commit();

    const updatedLoan = await Loan.findByPk(loan.id, {
      include: loanIncludes
    })

    res.status(200).json({ message: "Book returned successfully", updatedLoan })

  } catch (error) {
    await t.rollback();
    console.log(error)
    res.status(500).json({ message: "Something went wrong", error: error.message })
  }
}

const getAllLoans = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 100, 1), 200);
    const offset = (page - 1) * limit;

    const where = {};

    if (req.query.status) {
      where.status = req.query.status
    }

    if (req.query.member_id) {
      where.member_id = req.query.member_id
    }

    if (req.query.book_id) {
      where.book_id = req.query.book_id
    }

    const { count, rows } = await Loan.findAndCountAll({
      where,
      include: loanIncludes,
      order: [['loan_date', 'DESC']],
      limit,
      offset,
    })

    return res.status(200).json({
      message: "All loans fetched successfully",
      loans: rows,
      total: count,
      page,
      pages: Math.ceil(count / limit),
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error: error.message })
  }
}

const getLoanById = async (req, res) => {
  try {
    const { id } = req.params;

    const loan = await Loan.findByPk(id, {
      include: loanIncludes
    })

    if (!loan) {
      return res.status(400).json({ message: "Loan not found" })
    } else {
      return res.status(200).json({ message: "Loan fetched successfully", loan })
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong", error: error.message })
  }
}

const checkOverdueLoans = async (req, res) => {
  try {
    const result = await runOverdueCheck();

    return res.status(200).json({
      message: `Checked overdue loans: ${result.marked} marked overdue, ${result.emailed} email(s) sent`,
      ...result,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error: error.message })
  }
}

const sendReminder = async (req, res) => {
  try {
    const { id } = req.params;

    const loan = await Loan.findByPk(id, {
      include: [
        { model: Member, attributes: ['id', 'name', 'email'] },
        { model: Book, attributes: ['id', 'title'] },
      ]
    })

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" })
    }

    if (!loan.Member?.email) {
      return res.status(400).json({ message: "Member has no email address on record" })
    }

    if (loan.status === 'active' && loan.due_date < new Date().toISOString().slice(0, 10)) {
      await loan.update({ status: 'overdue' })
    }

    await sendEmail({
      to: loan.Member.email,
      subject: `Overdue Book Reminder: ${loan.Book?.title}`,
      html: overdueEmailTemplate({
        memberName: loan.Member.name,
        bookTitle: loan.Book?.title || 'Unknown book',
        dueDate: loan.due_date,
      }),
    })

    await loan.update({ overdue_notified: true })

    return res.status(200).json({ message: "Reminder email sent successfully", loan })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error: error.message })
  }
}

export { borrowBook, returnBook, getAllLoans, getLoanById, checkOverdueLoans, sendReminder }
