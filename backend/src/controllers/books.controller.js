import { Author, Book, Category, User } from '../models/associations.js'
import sequelize from '../db/connectDb.js'

const bookIncludes = [
  { model: Author, attributes: ['id', 'name'], through: { attributes: [] } },
  { model: Category, attributes: ['id', 'name'] },
  { model: User, attributes: ['id', 'username'] },
]

const createBook = async (req, res) => {
  try {
    const { title, isbn, publisher, publication_year, total_copies, shelf_location, authorIds, category_id } = req.body;
    const userId = req.user.id;

    if (!title || !isbn || !publisher) {
      return res.status(400).json({ message: "All the fields are required " })
    }

    const newBook = await Book.create({
      title,
      isbn,
      publisher,
      publication_year,
      total_copies: total_copies || 1,
      available_copies: total_copies || 1,
      shelf_location,
      user_id: userId,
      category_id
    })

    if (authorIds?.length) {
      const authors = await Author.findAll({ where: { id: authorIds } })
      await newBook.setAuthors(authors)
    }

    const bookWithAuthor = await Book.findByPk(newBook.id, {
      include: bookIncludes
    })

    if (bookWithAuthor) {
      res.status(201).json({ message: "Book created Successfully!", data: { bookWithAuthor } });
    } else {
      res.status(400).json({ message: "Error creating book" })
    }
  } catch (error) {
    console.error("Create book error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { title, isbn, publisher, publication_year, total_copies, shelf_location, category_id, authorIds } = req.body;

    let fieldsName = ["title", "isbn", "publisher", "publication_year", "total_copies", "shelf_location", "category_id"];

    let updateData = {};

    for (const field of fieldsName) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ message: "there was an error updating book because book not found" })
    }

    if (authorIds) {
      const authors = await Author.findAll({ where: { id: authorIds } })
      await book.setAuthors(authors)
    }

    await book.update(updateData)

    const updatedBook = await Book.findByPk(book.id, { include: bookIncludes });

    return res.status(200).json({ message: "Book updated Successfully", data: { updatedBook } })
  } catch (error) {
    console.error("Update book error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findByPk(bookId);

    if (book) {
      await book.destroy()

      res.status(200).json({ message: "book deleted successfully!" })
    } else {
      res.status(404).json({ message: "Book not found in the db" })
    }

  } catch (error) {
    console.error("Delete book error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const getAllbooks = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 100, 1), 200);
    const offset = (page - 1) * limit;

    const where = {};

    if (req.query.search) {
      where[sequelize.Op.or] = [
        { title: { [sequelize.Op.like]: `%${req.query.search}%` } },
        { isbn: { [sequelize.Op.like]: `%${req.query.search}%` } },
        { publisher: { [sequelize.Op.like]: `%${req.query.search}%` } },
      ]
    }

    if (req.query.category_id) {
      where.category_id = req.query.category_id
    }

    const { count, rows } = await Book.findAndCountAll({
      where,
      include: bookIncludes,
      order: [['createdAt', 'DESC']],
      limit,
      offset,
      distinct: true,
    });

    res.status(200).json({
      message: "All books fetched successfully.",
      books: rows,
      total: count,
      page,
      pages: Math.ceil(count / limit),
    })
  } catch (error) {
    console.error("Fetch books error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const getBookById = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findByPk(bookId, { include: bookIncludes });

    if (book) {
      res.status(200).json({ message: "Book fetched successfully.", book })
    } else {
      res.status(404).json({ message: "Book not found" })
    }
  } catch (error) {
    console.error("Fetch book error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const getBookByIsbn = async (req, res) => {
  try {
    const { isbn } = req.params;

    const book = await Book.findOne({
      where: { isbn: String(isbn).trim() },
      include: bookIncludes,
    });

    if (book) {
      res.status(200).json({ message: "Book fetched successfully.", book })
    } else {
      res.status(404).json({ message: "Book not found" })
    }
  } catch (error) {
    console.error("Fetch book by ISBN error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

export { createBook, updateBook, deleteBook, getAllbooks, getBookById, getBookByIsbn }
