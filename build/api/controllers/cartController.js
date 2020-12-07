'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-underscore-dangle */


var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _cart = require('../../models/cart');

var _cart2 = _interopRequireDefault(_cart);

var _utils = require('../../helpers/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var errorResponse = _utils2.default.errorResponse,
    validateCartDetails = _utils2.default.validateCartDetails;

/**
   * @export
   * @class ProductController
   * @description Performs operations on the product
   */

var CartController = function () {
  function CartController() {
    _classCallCheck(this, CartController);
  }

  _createClass(CartController, null, [{
    key: 'generateUniqueId',

    /**
      * @description -This method generates a unique id
      * @param {object} req - The request payload sent from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - unique id
      */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var uniqueId;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _crypto2.default.randomBytes(16).toString('hex');

              case 3:
                uniqueId = _context.sent;

                if (!uniqueId) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', res.status(200).json({ token: uniqueId }));

              case 6:
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](0);

                res.status(500).json({ error: 'Internal server error' });

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function generateUniqueId(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return generateUniqueId;
    }()

    /**
      * @description -This method generates a unique id
      * @param {object} req - The request payload sent from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - unique id
      */

  }, {
    key: 'add',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body, token, color, size, product, quantity, _validateCartDetails, error, errorField, errorMessage, CartExist, cart, filter;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body = req.body, token = _req$body.token, color = _req$body.color, size = _req$body.size, product = _req$body.product, quantity = _req$body.quantity;
                _context2.prev = 1;
                _validateCartDetails = validateCartDetails(req.body), error = _validateCartDetails.error;

                if (!error) {
                  _context2.next = 7;
                  break;
                }

                errorField = error.details[0].context.key;
                errorMessage = error.details[0].message;
                return _context2.abrupt('return', errorResponse(res, 400, 'CAR_01', errorMessage, errorField));

              case 7:
                _context2.next = 9;
                return _cart2.default.find({ token: token, product: product });

              case 9:
                CartExist = _context2.sent;
                cart = [];

                if (!(CartExist.length > 0)) {
                  _context2.next = 29;
                  break;
                }

                filter = CartExist.filter(function (e) {
                  return e.color.name === color.name && e.size === size;
                });

                if (!(filter.length > 0)) {
                  _context2.next = 21;
                  break;
                }

                _context2.next = 16;
                return _cart2.default.updateOne({ _id: filter[0]._id.toString() }, { quantity: filter[0].quantity + quantity });

              case 16:
                _context2.next = 18;
                return _cart2.default.findById(filter[0]._id).populate(['product', 'customer']);

              case 18:
                cart = _context2.sent;
                _context2.next = 27;
                break;

              case 21:
                _context2.next = 23;
                return _cart2.default.create(req.body);

              case 23:
                cart = _context2.sent;
                _context2.next = 26;
                return _cart2.default.findById(cart._id).populate(['product', 'customer']);

              case 26:
                cart = _context2.sent;

              case 27:
                _context2.next = 35;
                break;

              case 29:
                _context2.next = 31;
                return _cart2.default.create(req.body);

              case 31:
                cart = _context2.sent;
                _context2.next = 34;
                return _cart2.default.findById(cart._id).populate(['product', 'customer']);

              case 34:
                cart = _context2.sent;

              case 35:
                return _context2.abrupt('return', res.status(200).json({ cart: cart }));

              case 38:
                _context2.prev = 38;
                _context2.t0 = _context2['catch'](1);

                res.status(500).json({ error: 'Internal server error' });

              case 41:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 38]]);
      }));

      function add(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return add;
    }()

    /**
      * @description -This method generates a unique id
      * @param {object} req - The request payload sent from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - unique id
      */

  }, {
    key: 'list',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var cart;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _cart2.default.find().populate(['customer', 'product']);

              case 3:
                cart = _context3.sent;
                return _context3.abrupt('return', res.status(200).json(cart));

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3['catch'](0);

                res.status(500).json({ error: 'Internal server error' });

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function list(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return list;
    }()
  }]);

  return CartController;
}();

exports.default = CartController;