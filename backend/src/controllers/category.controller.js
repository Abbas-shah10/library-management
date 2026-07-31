import { Category, Book } from '../models/associations.js'

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: { model: Book, attributes: ['id'] },
      order: [['name', 'ASC']],
    })

    const data = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
      bookCount: cat.Books?.length || 0,
    }))

    return res.status(200).json({ message: "Categories fetched successfully", categories: data })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Something went wrong", error: error.message })
  }
}

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (category) {
      res.status(200).json({ message: "Category fetched successfully", category })
    } else {
      res.status(404).json({ message: "Could not find category" })
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Something went wrong", error: error.message })
  }
}

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" })
    }

    const existing = await Category.findOne({ where: { name } })

    if (existing) {
      return res.status(400).json({ message: "Category with this name already exists" })
    }

    const category = await Category.create({ name, description });

    return res.status(201).json({ message: "Category created successfully", data: { category } })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Something went wrong", error: error.message })
  }
}

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Could not find category" })
    }

    if (name !== undefined) {
      const existing = await Category.findOne({ where: { name }, rejectOnEmpty: false })
      if (existing && existing.id !== category.id) {
        return res.status(400).json({ message: "Category with this name already exists" })
      }
      category.name = name
    }

    if (description !== undefined) {
      category.description = description
    }

    await category.save();

    return res.status(200).json({ message: "Category updated successfully", category })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Something went wrong", error: error.message })
  }
}

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Could not find category" })
    }

    await category.destroy();
    return res.status(200).json({ message: "Category deleted successfully" })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Something went wrong", error: error.message })
  }
}

export { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
