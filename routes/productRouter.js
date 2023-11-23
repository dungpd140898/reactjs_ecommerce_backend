// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const uploadMiddleware = require('../middlewares/upload');

// Route: GET /api/products
router.get('/', productController.getProducts);
router.get('/productsnew', productController.getProductsNew);

// Route: GET /api/products/:id
router.get('/:id', productController.getProduct);
router.get('/images', productController.getImageUrls);
// Route: POST /api/products
// Sử dụng middleware upload để xử lý upload file ảnh
router.post('/', uploadMiddleware.single('image'), productController.createProduct);

// Route: PUT /api/products/:id
router.put('/:id',uploadMiddleware.single('image'), productController.updateProduct);
router.get('/category/:categoryId', productController.getProductsByCategory);
router.get('/count/:categoryId', productController.getProductsByCategory);
// Route: DELETE /api/products/:id
router.delete('/:id', productController.deleteProduct);

module.exports = router;
