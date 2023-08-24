// productController.js
const Order= require('../models/orderModel');
const asyncHandler = require('express-async-handler');

// // GET all products
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  res.status(200).json(orders);
});
// GET a single product
const getOrder= asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  res.status(200).json(order);
});

// CREATE a product
const createOrder = asyncHandler(async (req, res) => {
    try {
        const { idUser, items } = req.body;
        const order = new Order({
         idUser,
         items
        });
        const savedOrder= await order.save();
        res.status(201).json(savedOrder);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  });
module.exports = {
    createOrder,
    getOrder,
    getOrders
};




  
  
  
  
  