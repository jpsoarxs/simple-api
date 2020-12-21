'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('@hapi/joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginSchema = {
  email: _joi2.default.string().min(5).max(100).required().email(),
  password: _joi2.default.string().min(5).max(50).required()
};

var customerSchema = {
  email: _joi2.default.string().min(5).max(100).email(),
  password: _joi2.default.string().min(5).max(50),
  name: _joi2.default.string().min(1).max(50),
  lastname: _joi2.default.string().min(1).max(50)
};

var registerSchema = {
  name: _joi2.default.string().min(1).max(50),
  lastname: _joi2.default.string().min(1).max(50),
  email: _joi2.default.string().min(5).max(100).required().email(),
  password: _joi2.default.string().min(5).max(50).required()
};

var shoppingCartSchema = {
  token: _joi2.default.string().required(),
  product: _joi2.default.string().required(),
  quantity: _joi2.default.number().required(),
  attribute: _joi2.default.string().required()
};

var addressSchema = {
  title: _joi2.default.string().required(),
  address: _joi2.default.string().required(),
  complement: _joi2.default.string(),
  uf: _joi2.default.string().required(),
  city: _joi2.default.string().required(),
  cep: _joi2.default.string().required()
};

var orderSchema = {
  cart: _joi2.default.string().required(),
  transaction: _joi2.default.string().required(),
  cupom: _joi2.default.string(),
  customer: _joi2.default.string().required(),
  address: _joi2.default.string().required()
};

var productSchema = {
  title: _joi2.default.string().required(),
  description: _joi2.default.string(),
  price: _joi2.default.number().required(),
  thumbnail: _joi2.default.string().required(),
  category: _joi2.default.string().required(),
  attributes: _joi2.default.array().required()
};

var cardSchema = {
  credit_card: _joi2.default.string().required()
};

exports.default = {
  loginSchema: loginSchema,
  cardSchema: cardSchema,
  orderSchema: orderSchema,
  shoppingCartSchema: shoppingCartSchema,
  addressSchema: addressSchema,
  registerSchema: registerSchema,
  customerSchema: customerSchema,
  productSchema: productSchema
};