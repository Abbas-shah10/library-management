import { Author, Book } from '../models/associations.js'


const createAuthor = async (req, res) => {
  try {
    const { name, bio, bookIds } = req.body;

    if (!name || !bio) {
      res.status(400).json({ message: "All fields are required" })
    }

    const newAuthor = await Author.create({
      name: name,
      bio: bio
    })

    if (bookIds?.length) {
      const books = await Book.findAll({ where: { bookIds } })
      await author.setBooks(books);
    }

    if (newAuthor) {
      res.status(201).json({ message: "New Author created successfully", data: { newAuthor } })
    } else {
      return res.status(400).json({ message: "Error creating new author" })
    }

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong", error: error.message })
  }
}

const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const author = await Author.findByPk(id);

    if (author) {
      const updatedAuthor = await author.update(req.body);

      if (updatedAuthor) {
        return res.status(200).json({ message: "Author updated successfully", updatedAuthor })
      } else {
        return res.status(400).json({ message: "Error updating author" })
      }
    } else {
      return res.status(404).json({ message: "Could not find author" })
    }


  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong", error: error.message })
  }
}

const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;

    const author = await Author.findByPk(id);

    if (author) {
      res.status(200).json({ message: "Author fetched successfully", data: { author } })
    } else {
      res.status(404).json({ message: "Could not find author" })
    }

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong", error: error.message })
  }
}

const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const author = await Author.findByPk(id);

    if (author) {
      await author.destroy();
      res.status(200).json({ message: "Author Deleted successfully", })
    } else {
      res.status(404).json({ message: "Could not find author" })
    }

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong", error: error.message })
  }
}

export { createAuthor, updateAuthor, getAuthorById, deleteAuthor };