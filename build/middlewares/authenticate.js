'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

require('dotenv/config');

var _utils = require('../helpers/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errorResponse = _utils2.default.errorResponse;


var validateToken = function validateToken(req, res, next) {
  var token = req.headers['user-key'];
  if (!token) {
    return errorResponse(res, 401, 'AUT_01', 'Authorization code is empty', 'Bearer');
  }
  if (token.split(' ')[0] !== 'Bearer') {
    return errorResponse(res, 401, 'AUT_02', 'The userkey is invalid', 'Bearer');
  }
  var accessToken = token.split(' ')[1];
  _jsonwebtoken2.default.verify(accessToken, process.env.SECRET, function (err, decoded) {
    if (err) {
      return errorResponse(res, 401, 'AUT_02', 'The userkey is invalid', 'Bearer');
    }
    req.user = decoded;
    next();
  });
};
exports.default = validateToken;