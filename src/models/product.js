import mongoose from '../database/connection';

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    require: true
  },
  desconted_price: {
    type: Number,
    default: 0,
    required: false
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  attributes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attribute',
    required: true
  }],
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});


const Product = mongoose.model('Product', ProductSchema);

export default Product;
