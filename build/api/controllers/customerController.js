'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../../helpers/utils');

var _utils2 = _interopRequireDefault(_utils);

var _customer = require('../../models/customer');

var _customer2 = _interopRequireDefault(_customer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var validateRegisterDetails = _utils2.default.validateRegisterDetails,
    validateLoginDetails = _utils2.default.validateLoginDetails,
    comparePasswords = _utils2.default.comparePasswords,
    createToken = _utils2.default.createToken,
    hashPassword = _utils2.default.hashPassword,
    errorResponse = _utils2.default.errorResponse;

/**
   * @export
   * @class CustomerController
   * @description Performs operations on the customer
   */

var CustomerController = function () {
  function CustomerController() {
    _classCallCheck(this, CustomerController);
  }

  _createClass(CustomerController, null, [{
    key: 'register',

    /**
      * @description -This method registers a customer
      * @param {object} req - The request payload
      * @param {object} res - The response payload sent back from the method
      * @returns {object} - customer and accessToken
      */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, name, lastname, email, password, _validateRegisterDeta, error, errorField, errorMessage, hashedPassword, customer, token, formatedJson;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, name = _req$body.name, lastname = _req$body.lastname, email = _req$body.email, password = _req$body.password;
                _context.prev = 1;
                _validateRegisterDeta = validateRegisterDetails(req.body), error = _validateRegisterDeta.error;

                if (!error) {
                  _context.next = 7;
                  break;
                }

                errorField = error.details[0].context.key;
                errorMessage = error.details[0].message;
                return _context.abrupt('return', errorResponse(res, 400, 'USR_01', errorMessage, errorField));

              case 7:
                _context.next = 9;
                return _customer2.default.exists({ email: email });

              case 9:
                if (!_context.sent) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt('return', errorResponse(res, 400, 'USR_03', 'Já existe um usuário com esse email', 'email'));

              case 11:
                _context.next = 13;
                return hashPassword(password);

              case 13:
                hashedPassword = _context.sent;
                _context.next = 16;
                return _customer2.default.create({
                  name: name, lastname: lastname, email: email, password: hashedPassword
                });

              case 16:
                customer = _context.sent;
                token = createToken(customer);
                formatedJson = {
                  // eslint-disable-next-line no-underscore-dangle
                  _id: customer._id,
                  name: customer.name,
                  lastname: customer.lastname,
                  email: customer.email,
                  createdAt: customer.createdAt
                };
                return _context.abrupt('return', res.status(200).json({
                  accessToken: 'Bearer ' + token, customer: formatedJson, expires_in: '24h'
                }));

              case 22:
                _context.prev = 22;
                _context.t0 = _context['catch'](1);

                res.status(500).json({ error: 'Internal Server Error' });

              case 25:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 22]]);
      }));

      function register(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return register;
    }()

    /**
      * @description -This method autenticate a customer
      * @param {object} req - The request payload
      * @param {object} res - The response payload sent back from the method
      * @returns {object} - customer and accessToken
      */

  }, {
    key: 'login',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body2, email, password, _validateLoginDetails, error, errorField, errorMessage, existingCustomer, match, customer, token, formatedJson;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                _context2.prev = 1;
                _validateLoginDetails = validateLoginDetails(req.body), error = _validateLoginDetails.error;

                if (!error) {
                  _context2.next = 7;
                  break;
                }

                errorField = error.details[0].context.key;
                errorMessage = error.details[0].message;
                return _context2.abrupt('return', errorResponse(res, 400, 'USR_01', errorMessage, errorField));

              case 7:
                _context2.next = 9;
                return _customer2.default.findOne({ email: email }).select('+password');

              case 9:
                existingCustomer = _context2.sent;

                if (existingCustomer) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt('return', errorResponse(res, 400, 'USR_02', 'Usuário não foi encontrado', 'email'));

              case 12:
                _context2.next = 14;
                return comparePasswords(password, existingCustomer.password);

              case 14:
                match = _context2.sent;

                if (!match) {
                  _context2.next = 22;
                  break;
                }

                customer = existingCustomer;
                _context2.next = 19;
                return createToken(customer);

              case 19:
                token = _context2.sent;
                formatedJson = {
                  // eslint-disable-next-line no-underscore-dangle
                  _id: customer._id,
                  name: customer.name,
                  lastname: customer.lastname,
                  email: customer.email,
                  createdAt: customer.createdAt
                };
                return _context2.abrupt('return', res.status(200).json({
                  accessToken: 'Bearer ' + token,
                  customer: formatedJson,
                  expires_in: '24h'
                }));

              case 22:
                return _context2.abrupt('return', errorResponse(res, 400, 'USR_03', 'A senha informada não é valida'));

              case 25:
                _context2.prev = 25;
                _context2.t0 = _context2['catch'](1);

                res.status(500).json({ error: 'Internal Server Error' });

              case 28:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 25]]);
      }));

      function login(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return login;
    }()
  }]);

  return CustomerController;
}();

exports.default = CustomerController;