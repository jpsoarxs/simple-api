'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _orderController = require('../controllers/orderController');

var _orderController2 = _interopRequireDefault(_orderController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orderRouter = (0, _express.Router)();

orderRouter.post('/', _orderController2.default.create);

exports.default = orderRouter;