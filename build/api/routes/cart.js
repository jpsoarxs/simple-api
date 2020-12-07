'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _cartController = require('../controllers/cartController');

var _cartController2 = _interopRequireDefault(_cartController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import auth from '../../middlewares/authenticate';
// import permission from '../../middlewares/authorization';

var cartRouter = (0, _express.Router)();

cartRouter.get('/token', _cartController2.default.generateUniqueId);
cartRouter.post('/add', _cartController2.default.add);
cartRouter.get('/', _cartController2.default.list);

exports.default = cartRouter;