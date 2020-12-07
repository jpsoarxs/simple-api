/* eslint-disable no-underscore-dangle */
import Cupom from '../../models/cupom';

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
  static async create(req, res) {
    const {
      code, type, value, count, expiredAt
    } = req.body;
    try {
      let randomCode = '';
      if (!code || code === '' || code === undefined) {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < 8; i++) {
          randomCode += possible.charAt(Math.floor(Math.random() * possible.length));
        }
      } else {
        randomCode = code;
      }

      const cupom = await Cupom.create({
        code: randomCode, type, value, count, expiredAt
      });

      return res.status(200).json({ cupom });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  /**
    * @description -This method generates a unique id
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - unique id
    */
  static async list(req, res) {
    try {
      const cupom = await Cupom.find();
      return res.status(200).json(cupom);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  /**
    * @description -This method generates a unique id
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - unique id
    */
  static async findByID(req, res) {
    const { id } = req.params;
    try {
      const cupom = await Cupom.findById(id);
      return res.status(200).json(cupom);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default CupomController;
