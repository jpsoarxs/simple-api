/* eslint-disable no-underscore-dangle */
import crypto from 'crypto';
import Cart from '../../models/cart';
import helpers from '../../helpers/utils';

const {
  errorResponse,
  validateCartDetails
} = helpers;

/**
   * @export
   * @class ProductController
   * @description Performs operations on the product
   */
class CartController {
  /**
    * @description -This method generates a unique id
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - unique id
    */
  static async generateUniqueId(req, res) {
    try {
      const uniqueId = await crypto.randomBytes(16).toString('hex');
      if (uniqueId) {
        return res.status(200).json({ token: uniqueId });
      }
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
  static async add(req, res) {
    const {
      token, color, size, product, quantity
    } = req.body;
    try {
      const { error } = validateCartDetails(req.body);

      if (error) {
        const errorField = error.details[0].context.key;
        const errorMessage = error.details[0].message;
        return errorResponse(res, 400, 'CAR_01', errorMessage, errorField);
      }

      const CartExist = await Cart.find({ token, product });

      let cart = [];
      if (CartExist.length > 0) {
        const filter = CartExist.filter(e => e.color.name === color.name && e.size === size);
        if (filter.length > 0) {
          await Cart.updateOne(
            { _id: filter[0]._id.toString() }, { quantity: filter[0].quantity + quantity }
          );
          cart = await Cart.findById(filter[0]._id).populate('product');
        } else {
          cart = await Cart.create(req.body);
          cart = await Cart.findById(cart._id).populate('product');
        }
      } else {
        cart = await Cart.create(req.body);
        cart = await Cart.findById(cart._id).populate('product');
      }

      return res.status(200).json({ cart });
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
      const cart = await Cart.find().populate(['customer', 'product']);
      return res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default CartController;
