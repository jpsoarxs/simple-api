import mongoose from '../database/connection';

const AddressSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
  },
  complement: {
    type: String,
    required: false
  },
  uf: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true,
  },
  cep: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const Address = mongoose.model('Address', AddressSchema);

export default Address;
