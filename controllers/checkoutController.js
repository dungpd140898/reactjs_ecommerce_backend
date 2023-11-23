// productController.js
const Checkout = require('../models/checkoutModel');
const asyncHandler = require('express-async-handler');

const creatCheckout = asyncHandler(async (req, res) => {
    try {
        const { name, email, phone, address, UserId, Totalbill } = req.body;
        const checkout = new Checkout({
            name, email, phone, address, UserId, Totalbill
        });
        const savedCheckout= await checkout.save();
        res.status(201).json(savedCheckout);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  });

  const getCheckoutByUserId = asyncHandler(async (req, res) => {
    try {
      const userId = req.params.userId; // Assuming you pass userId as a parameter in the route
      const checkouts = await Checkout.find({ UserId: userId });
  
      if (!checkouts) {
        res.status(404).json({ message: 'No checkouts found for the given user ID' });
        return;
      }
  
      res.status(200).json(checkouts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
module.exports = {
    creatCheckout,
    getCheckoutByUserId
};




  
  
  
  
  