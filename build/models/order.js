'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrderSchema = new _connection2.default.Schema({
  cart: {
    type: String,
    required: true
  },
  transaction: {
    type: String,
    required: true
  },
  payment: {
    status: { type: String, default: 'pending' },
    dispatch: { type: Number, default: 0.00 },
    price: { type: Number, required: true }
  },
  customer: {
    type: _connection2.default.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  address: {
    type: _connection2.default.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var Order = _connection2.default.model('Order', OrderSchema);

exports.default = Order;