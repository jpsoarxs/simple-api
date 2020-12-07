'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-underscore-dangle */


var _cupom = require('../../models/cupom');

var _cupom2 = _interopRequireDefault(_cupom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
   * @export
   * @class CupomController
   * @description Performs operations on the Cupom
   */
var CupomController = function () {
  function CupomController() {
    _classCallCheck(this, CupomController);
  }

  _createClass(CupomController, null, [{
    key: 'create',

    /**
      * @description -This method generates a unique id
      * @param {object} req - The request payload sent from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - unique id
      */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, code, type, value, count, expiredAt, randomCode, possible, i, cupom;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, code = _req$body.code, type = _req$body.type, value = _req$body.value, count = _req$body.count, expiredAt = _req$body.expiredAt;
                _context.prev = 1;
                randomCode = '';

                if (!code || code === '' || code === undefined) {
                  possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

                  // eslint-disable-next-line no-plusplus

                  for (i = 0; i < 8; i++) {
                    randomCode += possible.charAt(Math.floor(Math.random() * possible.length));
                  }
                } else {
                  randomCode = code;
                }

                _context.next = 6;
                return _cupom2.default.create({
                  code: randomCode, type: type, value: value, count: count, expiredAt: expiredAt
                });

              case 6:
                cupom = _context.sent;
                return _context.abrupt('return', res.status(200).json({ cupom: cupom }));

              case 10:
                _context.prev = 10;
                _context.t0 = _context['catch'](1);

                res.status(500).json({ error: 'Internal server error' });

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 10]]);
      }));

      function create(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return create;
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
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var cupom;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _cupom2.default.find();

              case 3:
                cupom = _context2.sent;
                return _context2.abrupt('return', res.status(200).json(cupom));

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2['catch'](0);

                res.status(500).json({ error: 'Internal server error' });

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function list(_x3, _x4) {
        return _ref2.apply(this, arguments);
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
    key: 'findByID',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var id, cupom;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = req.params.id;
                _context3.prev = 1;
                _context3.next = 4;
                return _cupom2.default.findById(id);

              case 4:
                cupom = _context3.sent;
                return _context3.abrupt('return', res.status(200).json(cupom));

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3['catch'](1);

                res.status(500).json({ error: 'Internal server error' });

              case 11:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 8]]);
      }));

      function findByID(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return findByID;
    }()
  }]);

  return CupomController;
}();

exports.default = CupomController;