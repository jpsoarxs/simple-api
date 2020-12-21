'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _freteController = require('../controllers/freteController');

var _freteController2 = _interopRequireDefault(_freteController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var freteRouter = (0, _express.Router)();

freteRouter.get('/', _freteController2.default.calculate);

exports.default = freteRouter;