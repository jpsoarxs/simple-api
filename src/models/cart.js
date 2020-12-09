import mongoose from '../database/connection';

const CartSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  color: {
    type: Object,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;
