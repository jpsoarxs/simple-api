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
        var _req$body, token, attribute, product, quantity, _validateCartDetails, error, errorField, errorMessage, CartExist, filter, cart;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body = req.body, token = _req$body.token, attribute = _req$body.attribute, product = _req$body.product, quantity = _req$body.quantity;
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

                if (!(CartExist.length > 0)) {
                  _context2.next = 21;
                  break;
                }

                filter = CartExist.filter(function (e) {
                  return e.attribute.toString() === attribute;
                });

                if (!(filter.length > 0)) {
                  _context2.next = 17;
                  break;
                }

                _context2.next = 15;
                return _cart2.default.updateOne({ _id: filter[0]._id.toString() }, { quantity: filter[0].quantity + quantity });

              case 15:
                _context2.next = 19;
                break;

              case 17:
                _context2.next = 19;
                return _cart2.default.create(req.body);

              case 19:
                _context2.next = 23;
                break;

              case 21:
                _context2.next = 23;
                return _cart2.default.create(req.body);

              case 23:
                _context2.next = 25;
                return _cart2.default.find({ token: token }).populate(['product', 'attribute']);

              case 25:
                cart = _context2.sent;
                return _context2.abrupt('return', res.status(200).json(cart));

              case 29:
                _context2.prev = 29;
                _context2.t0 = _context2['catch'](1);

                res.status(500).json({ error: 'Internal server error' });

              case 32:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 29]]);
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
                return _cart2.default.find().populate('product');

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

    /**
      * @description -This method generates a unique id
      * @param {object} req - The request payload sent from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - unique id
      */

  }, {
    key: 'findById',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var token, cart;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                token = req.params.id;
                _context4.prev = 1;
                _context4.next = 4;
                return _cart2.default.find({ token: token }).populate('product');

              case 4:
                cart = _context4.sent;
                return _context4.abrupt('return', res.status(200).json(cart));

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4['catch'](1);

                res.status(500).json({ error: 'Internal server error' });

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 8]]);
      }));

      function findById(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return findById;
    }()

    /**
      * @description -This method generates a unique id
      * @param {object} req - The request payload sent from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - unique id
      */

  }, {
    key: 'remove',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var id, exist;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = req.params.id;
                _context5.prev = 1;
                _context5.next = 4;
                return _cart2.default.findOne({ _id: id });

              case 4:
                exist = _context5.sent;

                if (!exist) {
                  _context5.next = 9;
                  break;
                }

                _context5.next = 8;
                return _cart2.default.findByIdAndRemove({ _id: id });

              case 8:
                return _context5.abrupt('return', res.status(200).json({ _id: id, message: 'Produto removido com sucesso' }));

              case 9:
                return _context5.abrupt('return', errorResponse(res, 400, 'CAR_01', 'Produto não foi encontrado'));

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5['catch'](1);

                res.status(500).json({ error: 'Internal server error' });

              case 15:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 12]]);
      }));

      function remove(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return remove;
    }()
  }]);

  return CartController;
}();

exports.default = CartController;