'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _cupomController = require('../controllers/cupomController');

var _cupomController2 = _interopRequireDefault(_cupomController);

var _authenticate = require('../../middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _authorization = require('../../middlewares/authorization');

var _authorization2 = _interopRequireDefault(_authorization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cupomRouter = (0, _express.Router)();

cupomRouter.post('/', _authenticate2.default, _authorization2.default.permit('admin'), _cupomController2.default.create);
cupomRouter.get('/', _authenticate2.default, _authorization2.default.permit('admin'), _cupomController2.default.list);
cupomRouter.post('/find', _cupomController2.default.findByID);

exports.default = cupomRouter;