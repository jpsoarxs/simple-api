'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _customerController = require('../controllers/customerController');

var _customerController2 = _interopRequireDefault(_customerController);

var _authenticate = require('../../middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import permit from '../../middlewares/authorization';

var customerRouter = (0, _express.Router)();

customerRouter.post('/login', _customerController2.default.login);
customerRouter.post('/register', _customerController2.default.register);
customerRouter.put('/update', _authenticate2.default, _customerController2.default.update);
customerRouter.post('/address', _authenticate2.default, _customerController2.default.address);

exports.default = customerRouter;