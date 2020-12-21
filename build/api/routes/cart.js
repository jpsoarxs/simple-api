'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _cartController = require('../controllers/cartController');

var _cartController2 = _interopRequireDefault(_cartController);

var _authenticate = require('../../middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _authorization = require('../../middlewares/authorization');

var _authorization2 = _interopRequireDefault(_authorization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cartRouter = (0, _express.Router)();

cartRouter.get('/token', _cartController2.default.generateUniqueId);
cartRouter.post('/add', _cartController2.default.add);
cartRouter.get('/', _authenticate2.default, _authorization2.default.permit('admin'), _cartController2.default.list);
cartRouter.get('/:id', _cartController2.default.findById);
cartRouter.delete('/:id', _cartController2.default.remove);

exports.default = cartRouter;