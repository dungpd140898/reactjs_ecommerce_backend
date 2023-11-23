// routes/categoriesRouter.js
const express = require('express');
const router = express.Router();
const OrderDetailController = require('../controllers/orderDetailController');

router.post('/', OrderDetailController.creatOrderDetail);
router.get('/:IdOrder', OrderDetailController.getOrDerDetailByIdOrDer)

module.exports = router;
