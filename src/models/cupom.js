import mongoose from '../database/connection';

const CupomSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'percentage',
  },
  value: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 1
  },
  expiredAt: {
    type: Date,
    default: null,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const Cupom = mongoose.model('Cupom', CupomSchema);

export default Cupom;
