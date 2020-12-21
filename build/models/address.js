'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddressSchema = new _connection2.default.Schema({
  title: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
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
    required: true
  },
  cep: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var Address = _connection2.default.model('Address', AddressSchema);

exports.default = Address;