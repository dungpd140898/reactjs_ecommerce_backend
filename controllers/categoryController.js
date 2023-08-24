// productController.js
const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');


// GET all products
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
});
// GET a single product
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  res.status(200).json(category);
});

// CREATE a product
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({
      name
    });

    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// UPDATE a category
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;


  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { name }, // Cập nhật mới danh mục
      { new: true } // Trả về danh mục được cập nhật
    );

    if (!category) {
      res.status(404);
      throw new Error(`Cannot find any category with ID ${id}`);
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// DELETE a product
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    res.status(404);
    throw new Error(`Cannot find any category with ID ${id}`);
  }
  res.status(200).json(category);
});

module.exports = {
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  createCategory
};
