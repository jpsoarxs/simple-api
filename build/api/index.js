'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _customer = require('./routes/customer');

var _customer2 = _interopRequireDefault(_customer);

var _product = require('./routes/product');

var _product2 = _interopRequireDefault(_product);

var _cart = require('./routes/cart');

var _cart2 = _interopRequireDefault(_cart);

var _cupom = require('./routes/cupom');

var _cupom2 = _interopRequireDefault(_cupom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/customers', _customer2.default);
router.use('/products', _product2.default);
router.use('/carts', _cart2.default);
router.use('/cupoms', _cupom2.default);

exports.default = router;