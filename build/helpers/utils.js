'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _joi = require('@hapi/joi');

var _joi2 = _interopRequireDefault(_joi);

require('dotenv/config');

var _xml2js = require('xml2js');

var _xml2js2 = _interopRequireDefault(_xml2js);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _validationSchema = require('./validationSchema');

var _validationSchema2 = _interopRequireDefault(_validationSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable no-unused-vars */


var options = { language: { key: '{{key}} ' } };

var parseString = _xml2js2.default.parseString;
exports.default = {
  hashPassword: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(password) {
      var hash;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _bcrypt2.default.hash(password, 10);

            case 2:
              hash = _context.sent;
              return _context.abrupt('return', hash);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function hashPassword(_x) {
      return _ref.apply(this, arguments);
    }

    return hashPassword;
  }(),
  comparePasswords: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(password, userPassword) {
      var match;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _bcrypt2.default.compare(password, userPassword);

            case 2:
              match = _context2.sent;
              return _context2.abrupt('return', match);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function comparePasswords(_x2, _x3) {
      return _ref2.apply(this, arguments);
    }

    return comparePasswords;
  }(),
  createToken: function createToken(user) {
    var _id = user._id,
        name = user.name,
        email = user.email,
        role = user.role;

    return _jsonwebtoken2.default.sign({
      _id: _id,
      name: name,
      email: email,
      role: role
    }, process.env.SECRET, { expiresIn: 86400 });
  },
  xmlToJson: function xmlToJson(url, callback) {
    // eslint-disable-next-line no-var
    var req = _http2.default.get(url, function (res) {
      var xml = '';

      res.on('data', function (chunk) {
        xml += chunk;
      });

      res.on('error', function (e) {
        callback(e, null);
      });

      res.on('timeout', function (e) {
        callback(e, null);
      });

      res.on('end', function () {
        parseString(xml, function (_err, result) {
          callback(null, result);
        });
      });
    });
  },
  validateRegisterDetails: function validateRegisterDetails(user) {
    return _joi2.default.validate(user, _validationSchema2.default.registerSchema, options);
  },
  validateLoginDetails: function validateLoginDetails(user) {
    return _joi2.default.validate(user, _validationSchema2.default.loginSchema, options);
  },
  validateAddressDetails: function validateAddressDetails(user) {
    return _joi2.default.validate(user, _validationSchema2.default.addressSchema, options);
  },
  validateCardDetails: function validateCardDetails(user) {
    return _joi2.default.validate(user, _validationSchema2.default.cardSchema, options);
  },
  validateCustomerDetails: function validateCustomerDetails(user) {
    return _joi2.default.validate(user, _validationSchema2.default.customerSchema, options);
  },
  validateCartDetails: function validateCartDetails(user) {
    return _joi2.default.validate(user, _validationSchema2.default.shoppingCartSchema, options);
  },
  validateOrderDetails: function validateOrderDetails(user) {
    return _joi2.default.validate(user, _validationSchema2.default.orderSchema, options);
  },
  validateProduct: function validateProduct(user) {
    return _joi2.default.validate(user, _validationSchema2.default.productSchema, options);
  },
  errorResponse: function errorResponse(res, status, code, message) {
    var field = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;

    if (field !== undefined) {
      return res.status(status).json({
        error: {
          status: status,
          code: code,
          message: message,
          field: field || null
        }
      });
    }
    return res.status(status).json({
      error: {
        status: status,
        code: code,
        message: message
      }
    });
  },
  truncateDescription: function truncateDescription(products, descriptionLength) {
    var allProducts = products.map(function (product) {
      var length = product.dataValues.description.length;

      if (length > descriptionLength) {
        product.dataValues.description = product.dataValues.description.slice(0, descriptionLength) + '...';
      }
      return product;
    });
    return allProducts;
  }
};