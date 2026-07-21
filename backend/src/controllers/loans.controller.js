import { Loan, Member, Book } from '../models/associations.js'
import sequelize from '../db/connectDb.js'

const borrowBook = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { member_id, book_id, due_date, status } = req.body;

    if (!member_id || !book_id || !due_date || !status) {
      return res.status(400).json({ message: "ALl fields are required" })
    }

    const member = await Member.findByPk(member_id);

    if (!member) return res.status(404).json({ message: "Member not found" })

    const book = await Book.findByPk(book_id)

    if (!book) {
      await t.rollback();
      res.status(404).json({ message: "Book not found" })
    }

    if (book.available_copies <= 0) {
      await t.rollback();
      res.status(404).json({ message: "No available Copies" })
    }

    const loan = await Loan.create({
      member_id: member_id,
      book_id: book_id,
      status: status,
      due_date: due_date
    }, { transaction: t })

    await Book.decrement('available_copies', {
      by: 1, where: { id: book_id }, transaction: t,
    })

    await t.commit();

    const loanWithDetails = await Loan.findByPk(loan.id, {
      include: [
        { model: Member, attributes: ['id', 'name', 'email'] },
        { model: Book, attributes: ['id', 'title', 'isbn', 'available_copies'] }
      ]
    })

    res.status(201).json({ message: "Book Borrowed successfully", loanWithDetails })
  } catch (error) {
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
      t.rollback();
      return res.status(404).json({ message: "Cannot find loan" })
    }

    if (loan.status === 'returned') {
      res.status(400).json({ message: "Book already returned" })
    }

    loan.return_date = new Date();
    loan.status = 'returned';
    await loan.save({ transaction: t });

    await Book.increment('available_copies', {
      by: 1, where: { id: loan.book_id }, transaction: t,
    })

    await t.commit();

    const updatedLoan = await Loan.findByPk(loan.id, {
      include: [
        { model: Member, attributes: ['id', 'name'] },
        { model: Book, attributes: ['id', 'title', 'available_copies'] }
      ]
    })

    res.status(200).json({ message: "Book returned successfully", updatedLoan })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong", error: error.message })
  }
}

const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll({
      include: [
        { model: Member, attributes: ["id", "name", 'email'] },
        { model: Book, attributes: ['id', 'title', 'available_copies'] }
      ]
    })

    if (!loans) {
      return res.status(404).json({ message: "Loans not found" })
    } else {
      return res.status(200).json({ message: "All loans fetched successfully", loans })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error: error.message })
  }
}

const getLoanById = async (req, res) => {
  try {
    const { id } = req.params;

    const loan = await Loan.findByPk(id, {
      include: [
        { model: Member, attributes: ['id', 'name', 'email'] },
        { model: Book, attributes: ['id', 'title', 'available_copies'] }
      ]
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
export { borrowBook, returnBook, getAllLoans, getLoanById }