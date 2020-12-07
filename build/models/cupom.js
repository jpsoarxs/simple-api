'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CupomSchema = new _connection2.default.Schema({
  code: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'percentage'
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
  }
});

var Cupom = _connection2.default.model('Cupom', CupomSchema);

exports.default = Cupom;