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
  dimension: {
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    lenght: { type: Number, required: true },
    weight: { type: Number, required: true }
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
