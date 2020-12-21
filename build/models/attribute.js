'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AttributeSchema = new _connection2.default.Schema({
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
  }
});

var Attribute = _connection2.default.model('Attribute', AttributeSchema);

exports.default = Attribute;