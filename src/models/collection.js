import mongoose from '../database/connection';

const CollectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const Collection = mongoose.model('Collection', CollectionSchema);

export default Collection;
