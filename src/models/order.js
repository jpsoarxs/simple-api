import mongoose from '../database/connection';

const OrderSchema = new mongoose.Schema({
  cart: {
    type: String,
    required: true
  },
  transaction: {
    type: String,
    required: true
  },
  payment: {
    status: { type: String, default: 'pending' },
    dispatch: { type: Number, default: 0.00 },
    price: { type: Number, required: true }
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});


const Order = mongoose.model('Order', OrderSchema);

export default Order;
