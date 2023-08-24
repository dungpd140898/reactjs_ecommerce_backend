// routes/categoriesRouter.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route: GET /api/orders
router.get('/', orderController.getOrders);

// Route: GET /api/orders/:id
router.get('/:id', orderController.getOrder);
router.post('/', orderController.createOrder);

module.exports = router;
