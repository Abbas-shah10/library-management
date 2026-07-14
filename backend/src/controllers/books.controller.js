import { Book } from '../models/associations.js'

const createBook = async (req, res) => {
  try {
    const { title, isbn, publisher, publication_year, total_copies, shelf_location } = req.body;

    if (!title | !isbn | !publisher) {
      res.status(400).json({ message: "All the fields are required " })
    }

    const book = await Book.findOne({ where: { title } })

    if (book) {
      res.status(400).json({ message: "Book with same details or title is present" })
    }

    const newBook = await Book.create({
      title,
      isbn,
      publisher,
      publication_year,
      total_copies,
      shelf_location
    })

    if (newBook) {
      res.status(201).json({ message: "Book created Successfully!", data: { newBook } })
    } else {
      res.status(400).json({ message: "Error creating the book" })
    }


  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { title, isbn, publisher, publication_year, total_copies, shelf_location } = req.body;

    let fieldsName = ["title", "isbn", "publisher", "publication_year", "total_copies", "shelf_location"];

    const booksDetails = {
      title: title,
      isbn: isbn,
      publisher: publisher,
      publication_year: publication_year,
      total_copies: total_copies,
      shelf_location: shelf_location
    }

    let updateData = {};

    for (const field of fieldsName) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    const book = await Book.findByPk(bookId);

    if (book) {
      await book.update(updateData)

      return res.status(200).json({ message: "Book updated Successfully", data: { book } })
    } else {
      res.status(404).json({ message: "there was an error updating book because book not found", })
    }
  } catch (error) {
    console.error("Logout error:", error);
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
    console.error("Logout error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const getAllbooks = async (req, res) => {
  try {
    const books = await Book.findAll();

    if (books) {
      res.status(200).json({ message: "All books fetched successfully.", books })
    } else {
      res.status(404).json({ message: "Books not found" })
    }
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });

  }
}

const getBookById = async (req, res) => {
  try {

    const { bookId } = req.params;

    const book = await Book.findByPk(bookId);

    if (book) {
      res.status(200).json({ message: "Book fetched successfully.", book })
    } else {
      res.status(404).json({ message: "Book not found" })
    }
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

export { createBook, updateBook, deleteBook, getAllbooks, getBookById }