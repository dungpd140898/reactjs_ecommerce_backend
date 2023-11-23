// productController.js
const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const uploadMiddleware = require('../middlewares/upload')
const path = require('path');
const fs = require('fs');

// GET all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
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
// GET a single product
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.status(200).json(product);
});

// CREATE a product
const createProduct = asyncHandler(async (req, res) => {
    try {
      const { name, quantity, price, priceOld, discription, categoryId } = req.body;
      const imageUrl = req.file ? req.file.path : '';
  
      const product = new Product({
        name,
        quantity,
        price,
        priceOld,
        discription,
        categoryId,
        imageUrl, // Lưu đường dẫn hình ảnh vào trường "imageUrl"
      });
  
      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// UPDATE a product
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price, priceOld, discription, categoryId } = req.body;
  const imageUrl = req.file ? req.file.path : ''; // Lấy đường dẫn ảnh từ request nếu có

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, quantity, price, priceOld,discription, imageUrl, categoryId }, // Cập nhật thông tin sản phẩm bao gồm đường dẫn ảnh mới
      { new: true } // Trả về sản phẩm sau khi cập nhật
    );

    if (!product) {
      res.status(404);
      throw new Error(`Cannot find any product with ID ${id}`);
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// DELETE a product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    res.status(404);
    throw new Error(`Cannot find any product with ID ${id}`);
  }
  res.status(200).json(product);
});

const getProductsByCategory  = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const products = await Product.find({categoryId: categoryId});
  res.status(200).json(products);

  });

const getProductsNew  = asyncHandler(async (req, res) => {
  try {
    const latestProducts = await Product.find().sort({ createdAt: -1 }).limit(4);
    res.json(latestProducts);
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm:', error);
    res.status(500).send('Lỗi server');
  }
});

 const getCountProductByCate  = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    // Sử dụng aggregation để đếm số lượng sản phẩm cho mỗi loại
    const count = await Product.countDocuments({ categoryId });

    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getImageUrls,
  getProductsByCategory,
  getProductsNew,
  getCountProductByCate

};
