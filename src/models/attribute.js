import mongoose from '../database/connection';

const AttributeSchema = new mongoose.Schema({
  images: {
    type: Array,
    required: true
  },
  color: {
    type: Object,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
});

const Attribute = mongoose.model('Attribute', AttributeSchema);

export default Attribute;
