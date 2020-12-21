'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */


var _utils = require('../../helpers/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var xmlToJson = _utils2.default.xmlToJson;

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
    key: 'calculate',

    /**
      * @description -This method generates a unique id
      * @param {object} req - The request payload sent from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - unique id
      */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, format, to, from, weight, width, height, lenght, url;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, format = _req$body.format, to = _req$body.to, from = _req$body.from, weight = _req$body.weight, width = _req$body.width, height = _req$body.height, lenght = _req$body.lenght;

                try {
                  url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=08082650&sDsSenha=564321&sCepOrigem=' + to + '&sCepDestino=' + from + '&nVlPeso=' + weight + '&nCdFormato=' + format + '&nVlComprimento=' + lenght + '0&nVlAltura=' + height + '&nVlLargura=' + width + '&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=04510&nVlDiametro=0&StrRetorno=xml&nIndicaCalculo=3';

                  xmlToJson(url, function (err, data) {
                    if (err) {
                      return res.status(500).json({ error: 'Internal server error' });
                    }
                    // eslint-disable-next-line prefer-const
                    var json = JSON.parse(JSON.stringify(data));
                    json.Servicos.cServico.forEach(function (val) {
                      // eslint-disable-next-line prefer-const
                      // eslint-disable-next-line guard-for-in
                      // eslint-disable-next-line prefer-const
                      for (var k in val) {
                        // eslint-disable-next-line prefer-destructuring
                        val[k] = val[k][0];
                      }
                    });

                    return res.status(200).json(json.Servicos.cServico);
                  });
                } catch (error) {
                  res.status(500).json({ error: 'Internal server error' });
                }

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function calculate(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return calculate;
    }()
  }]);

  return CupomController;
}();

exports.default = CupomController;