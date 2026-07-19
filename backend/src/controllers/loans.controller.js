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

export { borrowBook }