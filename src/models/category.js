import mongoose from '../database/connection';

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});


const Category = mongoose.model('Category', CategorySchema);

export default Category;
