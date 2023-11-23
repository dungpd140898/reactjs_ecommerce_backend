const Category  =require('../models/categoryModel')
const asyncHandler = require('express-async-handler');
const uploadMiddleware = require('../middlewares/upload')
const path = require('path');
const fs = require('fs');

const getCategories = asyncHandler(async (req, res) => {
  const categoriess = await Category.find({});
  res.status(200).json(categoriess);
});
// GET all image URLs
const getImageUrls = asyncHandler(async (req, res) => {
    const uploadsDirectory = path.join(__dirname, '../uploads');
  
    fs.readdir(uploadsDirectory, (err, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading uploads directory' });
      }
  
      // Create an array of image URLs
      const imageUrls = files.map((file) => {
        return `${req.protocol}://${req.get('host')}/uploads/${file}`;
      });
  
      res.status(200).json(imageUrls);
    });
  });

const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  res.status(200).json(category);
});


const CreateCategory = asyncHandler(async (req, res) => {
    try {
      const { name } = req.body;
      const imageUrl = req.file ? req.file.path : '';
  
      const category = new Category({
        name,
        imageUrl, 
      });
  
      const savedCategory = await category.save();
      res.status(201).json(savedCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// UPDATE a product
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const imageUrl = req.file ? req.file.path : ''; // Lấy đường dẫn ảnh từ request nếu có

  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { name, imageUrl }, 
      { new: true } 
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
  CreateCategory,
   updateCategory, 
   deleteCategory,
  getImageUrls,
};
