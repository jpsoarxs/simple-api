import Cupom from '../../models/cupom';
import Cart from '../../models/cart';
import helpers from '../../helpers/utils';

const {
  errorResponse,
  validateOrderDetails,
} = helpers;
/**
   * @export
   * @class CupomController
   * @description Performs operations on the Cupom
   */
class OrderController {
  /**
    * @description -This method generates a unique id
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - unique id
    */
  static async create(req, res) {
    try {
      const { error } = validateOrderDetails(req.body);

      if (error) {
        const errorField = error.details[0].context.key;
        const errorMessage = error.details[0].message;
        return errorResponse(res, 400, 'ORD_01', errorMessage, errorField);
      }

      let price = 0;

      const cart = await Cart.find({ token: req.body.cart }).populate(['product', 'attribute']);

      if (!cart) {
        return errorResponse(res, 400, 'ORD_02', 'Carrinho informado não existe');
      }

      cart.forEach((value) => {
        if (value.product.discounted_price === 0) {
          price += value.product.price * value.quantity;
        } else {
          price += value.product.discounted_price * value.quantity;
        }
      });

      if (req.body.cupom) {
        const cupom = await Cupom.findOne({ _id: req.body.cupom });
        if (cupom) {
          if (cupom.type === 'percentage') {
            price -= (price * cupom.value) / 100;
          } else if (cupom.type === 'numeric') {
            price -= (price - cupom.value);
          }
        }
      }

      console.log(price);
      res.status(200).json(cart);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default OrderController;
