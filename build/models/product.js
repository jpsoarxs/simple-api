'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductSchema = new _connection2.default.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    require: true
  },
  discounted_price: {
    type: Number,
    default: 0,
    required: false
  },
  category: {
    type: _connection2.default.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  attributes: [{
    type: _connection2.default.Schema.Types.ObjectId,
    ref: 'Attribute',
    required: true
  }],
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var Product = _connection2.default.model('Product', ProductSchema);

exports.default = Product;