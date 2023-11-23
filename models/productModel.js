// productModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  priceOld: { type: Number, required: true },
  discription: { type: String, required: true},
  imageUrl: { type: String, required: true },
  categoryId: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
