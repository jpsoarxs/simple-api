/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
import helpers from '../../helpers/utils';

const {
  xmlToJson
} = helpers;

/**
   * @export
   * @class CupomController
   * @description Performs operations on the Cupom
   */
class CupomController {
  /**
    * @description -This method generates a unique id
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - unique id
    */
  static async calculate(req, res) {
    const {
      format, to, from, weight, width, height, lenght
    } = req.body;
    try {
      const url = `http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=08082650&sDsSenha=564321&sCepOrigem=${to}&sCepDestino=${from}&nVlPeso=${weight}&nCdFormato=${format}&nVlComprimento=${lenght}0&nVlAltura=${height}&nVlLargura=${width}&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=04510&nVlDiametro=0&StrRetorno=xml&nIndicaCalculo=3`;
      xmlToJson(url, (err, data) => {
        if (err) {
          return res.status(500).json({ error: 'Internal server error' });
        }
        // eslint-disable-next-line prefer-const
        let json = JSON.parse(JSON.stringify(data));
        json.Servicos.cServico.forEach((val) => {
          // eslint-disable-next-line prefer-const
          // eslint-disable-next-line guard-for-in
          // eslint-disable-next-line prefer-const
          for (const k in val) {
            // eslint-disable-next-line prefer-destructuring
            val[k] = val[k][0];
          }
        });

        return res.status(200).json(json.Servicos.cServico);
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default CupomController;
