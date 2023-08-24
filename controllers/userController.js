// productController.js
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const path = require('path');
const fs = require('fs');

// GET all products
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});
const createUser = asyncHandler(async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = new User({
        name,
        email,
        password
      });
  
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Hàm xử lý yêu cầu đăng nhập
const loginUser = async (req, res) => {
    const { email, password } = req.body;

  try {
    // Tìm người dùng dựa trên email và mật khẩu
    const user = await User.findOne({ email, password});

    // Kiểm tra kết quả
    if (user) {
      // Đăng nhập thành công
      res.status(200).json({ message: 'Login successful', user });
    } else {
      // Sai thông tin đăng nhập
      res.status(401).json({ message: 'Login failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  createUser,
  getUsers, loginUser
};
