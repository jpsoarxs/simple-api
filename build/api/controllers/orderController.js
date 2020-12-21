'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cupom = require('../../models/cupom');

var _cupom2 = _interopRequireDefault(_cupom);

var _cart = require('../../models/cart');

var _cart2 = _interopRequireDefault(_cart);

var _utils = require('../../helpers/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var errorResponse = _utils2.default.errorResponse,
    validateOrderDetails = _utils2.default.validateOrderDetails;
/**
   * @export
   * @class CupomController
   * @description Performs operations on the Cupom
   */

var OrderController = function () {
  function OrderController() {
    _classCallCheck(this, OrderController);
  }

  _createClass(OrderController, null, [{
    key: 'create',

    /**
      * @description -This method generates a unique id
      * @param {object} req - The request payload sent from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - unique id
      */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _validateOrderDetails, error, errorField, errorMessage, price, cart, cupom;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _validateOrderDetails = validateOrderDetails(req.body), error = _validateOrderDetails.error;

                if (!error) {
                  _context.next = 6;
                  break;
                }

                errorField = error.details[0].context.key;
                errorMessage = error.details[0].message;
                return _context.abrupt('return', errorResponse(res, 400, 'ORD_01', errorMessage, errorField));

              case 6:
                price = 0;
                _context.next = 9;
                return _cart2.default.find({ token: req.body.cart }).populate(['product', 'attribute']);

              case 9:
                cart = _context.sent;

                if (cart) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt('return', errorResponse(res, 400, 'ORD_02', 'Carrinho informado não existe'));

              case 12:

                cart.forEach(function (value) {
                  if (value.product.discounted_price === 0) {
                    price += value.product.price * value.quantity;
                  } else {
                    price += value.product.discounted_price * value.quantity;
                  }
                });

                if (!req.body.cupom) {
                  _context.next = 18;
                  break;
                }

                _context.next = 16;
                return _cupom2.default.findOne({ _id: req.body.cupom });

              case 16:
                cupom = _context.sent;

                if (cupom) {
                  if (cupom.type === 'percentage') {
                    price -= price * cupom.value / 100;
                  } else if (cupom.type === 'numeric') {
                    price -= price - cupom.value;
                  }
                }

              case 18:

                console.log(price);
                res.status(200).json(cart);
                _context.next = 26;
                break;

              case 22:
                _context.prev = 22;
                _context.t0 = _context['catch'](0);

                console.log(_context.t0);
                res.status(500).json({ error: 'Internal server error' });

              case 26:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 22]]);
      }));

      function create(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return OrderController;
}();

exports.default = OrderController;