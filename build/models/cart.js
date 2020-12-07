'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CartSchema = new _connection2.default.Schema({
  token: {
    type: String,
    required: true
  },
  customer: {
    type: _connection2.default.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  product: {
    type: _connection2.default.Schema.Types.ObjectId,
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
  }
});

var Cart = _connection2.default.model('Cart', CartSchema);

exports.default = Cart;