// routes/categoriesRouter.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Route: GET /api/categories
router.get('/', categoryController.getCategories);

// Route: GET /api/categories/:id
router.get('/:id', categoryController.getCategory);

router.post('/', categoryController.createCategory);

// Route: PUT /api/categories/:id
router.put('/:id',categoryController.updateCategory);

// Route: DELETE /api/categories/:id
router.delete('/:id',categoryController.deleteCategory);

module.exports = router;
