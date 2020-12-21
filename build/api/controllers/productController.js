'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */


var _product = require('../../models/product');

var _product2 = _interopRequireDefault(_product);

var _attribute = require('../../models/attribute');

var _attribute2 = _interopRequireDefault(_attribute);

var _utils = require('../../helpers/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var errorResponse = _utils2.default.errorResponse,
    validateProduct = _utils2.default.validateProduct;

/**
   * @export
   * @class ProductController
   * @description Performs operations on the product
   */

var ProductController = function () {
  function ProductController() {
    _classCallCheck(this, ProductController);
  }

  _createClass(ProductController, null, [{
    key: 'create',

    /**
      * @description -This method registers a product
      * @param {object} req - The request payload
      * @param {object} res - The response payload sent back from the method
      * @returns {object} - product and accessToken
      */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, attributes, title, description, price, thumbnail, category, _validateProduct, error, errorField, errorMessage, productAtt, ids, product;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, attributes = _req$body.attributes, title = _req$body.title, description = _req$body.description, price = _req$body.price, thumbnail = _req$body.thumbnail, category = _req$body.category;
                _context.prev = 1;
                _validateProduct = validateProduct(req.body), error = _validateProduct.error;

                if (!error) {
                  _context.next = 7;
                  break;
                }

                errorField = error.details[0].context.key;
                errorMessage = error.details[0].message;
                return _context.abrupt('return', errorResponse(res, 400, 'PRO_01', errorMessage, errorField));

              case 7:
                productAtt = void 0;
                ids = [];
                _context.next = 11;
                return attributes.forEach(function (value) {
                  productAtt = new _attribute2.default(value);
                  productAtt.save();
                  ids.push(productAtt._id.toString());
                });

              case 11:
                _context.next = 13;
                return _product2.default.create({
                  title: title, description: description, price: price, thumbnail: thumbnail, category: category, attributes: ids
                });

              case 13:
                product = _context.sent;
                _context.next = 16;
                return _product2.default.findById(product._id.toString()).populate(['category', 'attributes', 'collection']);

              case 16:
                product = _context.sent;
                return _context.abrupt('return', res.status(201).json(product));

              case 20:
                _context.prev = 20;
                _context.t0 = _context['catch'](1);

                res.status(500).json({ error: 'Internal Server Error' });

              case 23:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 20]]);
      }));

      function create(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()

    /**
      * @description -This method registers a product
      * @param {object} req - The request payload
      * @param {object} res - The response payload sent back from the method
      * @returns {object} - product and accessToken
      */

  }, {
    key: 'list',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var product;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _product2.default.find().populate(['category', 'attributes', 'collection']);

              case 3:
                product = _context2.sent;
                return _context2.abrupt('return', res.status(200).json(product));

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2['catch'](0);

                res.status(500).json({ error: 'Internal Server Error' });

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
      * @description -This method registers a product
      * @param {object} req - The request payload
      * @param {object} res - The response payload sent back from the method
      * @returns {object} - product and accessToken
      */

  }, {
    key: 'findByID',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var id, product;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = req.params.id;
                _context3.prev = 1;
                _context3.next = 4;
                return _product2.default.findById(id).populate(['category', 'attributes', 'collection']);

              case 4:
                product = _context3.sent;

                if (product) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt('return', errorResponse(res, 400, 'PRO_01', 'Nenhum produto encontrado com esse ID'));

              case 7:
                return _context3.abrupt('return', res.status(200).json(product));

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3['catch'](1);

                res.status(500).json({ error: 'Internal Server Error' });

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 10]]);
      }));

      function findByID(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return findByID;
    }()
  }]);

  return ProductController;
}();

exports.default = ProductController;