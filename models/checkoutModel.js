
const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
    name : String,
    email: String,
    phone: String,
    address: String,
    UserId: String,
    Totalbill: String,
    createdAt: {
        type: Date,
        default: Date.now,
      },
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
