
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    idUser: String,
    items: [{ id: String, quantity: Number }]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
