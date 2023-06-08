// models/order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;