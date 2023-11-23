// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const uploadMiddleware = require('../middlewares/upload');

router.get('/', categoryController.getCategories);

router.get('/:id', categoryController.getCategory);

router.get('/images', categoryController. getImageUrls);

router.post('/', uploadMiddleware.single('image'), categoryController.CreateCategory);

router.put('/:id',uploadMiddleware.single('image'), categoryController.updateCategory);

router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
