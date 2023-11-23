// productController.js
const OrderDetail = require('../models/orderDetail');
const asyncHandler = require('express-async-handler');

const creatOrderDetail = asyncHandler(async (req, res) => {
    try {
        const { id_order, id_product, quantity } = req.body;
        const orderDetail = new OrderDetail({
            id_order, id_product, quantity
        });
        const savedOrderDetail= await orderDetail.save();
        res.status(201).json(savedCheckout);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  });
  const getOrDerDetailByIdOrDer = asyncHandler(async (req, res) => {
    try {
      const id_order = req.params.IdOrder; // Assuming you pass userId as a parameter in the route
      const orders = await OrderDetail.find({ id_order: id_order });
  
      if (!orders) {
        res.status(404).json({ message: 'No checkouts found for the given user ID' });
        return;
      }
  
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
module.exports = {
    creatOrderDetail,
    getOrDerDetailByIdOrDer
};




  
  
  
  
  