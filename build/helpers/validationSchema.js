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

var addressSchema = {
  address_1: _joi2.default.string().required(),
  address_2: _joi2.default.string(),
  city: _joi2.default.string().required(),
  region: _joi2.default.string().required(),
  postal_code: _joi2.default.string().required(),
  country: _joi2.default.string().required(),
  shipping_region_id: _joi2.default.number().required()
};

var shoppingCartSchema = {
  token: _joi2.default.string().required(),
  product: _joi2.default.string().required(),
  customer: _joi2.default.string().required(),
  quantity: _joi2.default.number().required(),
  color: _joi2.default.object().keys({
    name: _joi2.default.string().required(),
    hex: _joi2.default.string().required()
  }).required(),
  size: _joi2.default.string().required()
};

var orderSchema = {
  cart_id: _joi2.default.required(),
  shipping_id: _joi2.default.number().required(),
  tax_id: _joi2.default.number().required(),
  status: _joi2.default.number(),
  reference: _joi2.default.string(),
  auth_code: _joi2.default.string(),
  comments: _joi2.default.string(),
  shipped_on: _joi2.default.date()

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