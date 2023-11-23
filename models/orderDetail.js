
const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
    id_order : String,
    id_product : String,
    quantity: Number,
    createdAt: {
        type: Date,
        default: Date.now,
      },
});

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

module.exports = OrderDetail;
