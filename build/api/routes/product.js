'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _productController = require('../controllers/productController');

var _productController2 = _interopRequireDefault(_productController);

var _authenticate = require('../../middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _authorization = require('../../middlewares/authorization');

var _authorization2 = _interopRequireDefault(_authorization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var productRouter = (0, _express.Router)();

productRouter.post('/', _authenticate2.default, _authorization2.default.permit('admin'), _productController2.default.create);
productRouter.get('/', _productController2.default.list);
productRouter.get('/:id', _productController2.default.findByID);

exports.default = productRouter;