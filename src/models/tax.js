import mongoose from '../database/connection';

const OrderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  delivery: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});


const Order = mongoose.model('Tax', OrderSchema);

export default Order;
