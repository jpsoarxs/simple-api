'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _customerController = require('../controllers/customerController');

var _customerController2 = _interopRequireDefault(_customerController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import auth from '../../middlewares/authenticate';
// import permit from '../../middlewares/authorization';

var customerRouter = (0, _express.Router)();

customerRouter.post('/login', _customerController2.default.login);
customerRouter.post('/register', _customerController2.default.register);

exports.default = customerRouter;