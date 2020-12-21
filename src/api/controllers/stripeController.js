import Cart from '../../models/cart';
import Customer from '../../models/customer';
import Cupom from '../../models/cupom';
import Address from '../../models/address';


const stripe = require('stripe')('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');

/**
   * @export
   * @class CupomController
   * @description Performs operations on the Cupom
   */
class StripeController {
  /**
    * @description -This method generates a unique id
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - unique id
    */
  static async sendPayment(req, res) {
    const {
      token, cart, customer, discount, address
    } = req.body;
    let existingCustomer, existingDiscount, cardData, charge;
    let totalPrice = 0.00;

    if (!token) {
      return res.status(401).json({ error: { code: 401, message: 'Token is required' } });
    }

    if (!cart) {
      return res.status(400).json({ error: { code: 400, message: 'Card ID is required' } });
    }

    if (!customer) {
      return res.status(400).json({ error: { code: 400, message: 'Customer ID is required' } });
    }

    if (!address) {
      return res.status(400).json({ error: { code: 400, message: 'Address ID is required' } });
    }

    try {
      existingCustomer = await Customer.findOne({ _id: customer });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }

    if (!existingCustomer) {
      return res.status(400).json({ error: { code: 400, message: 'User not found' } });
    }

    try {
      cardData = await Cart.find({ token: cart }).populate(['product', 'attribute']);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }

    cardData.forEach((value) => {
      if (value.quantity > value.attribute.quantity) {
        return res.status(406).json({ error: { code: 406, message: `${value.product.title} so possui ${value.attribute.quantity} unidade(s) do tamanho ${value.attribute.size} na cor ${value.attribute.color.name}` } });
      }
      if (value.product.discounted_price === 0) {
        totalPrice += parseFloat(value.product.price);
      } else {
        totalPrice += parseFloat(value.product.discounted_price);
      }
    });

    if (discount) {
      existingDiscount = await Cupom.findOne({ _id: discount });
      if (existingDiscount) {
        if (existingDiscount.type === 'percentage') {
          totalPrice -= (totalPrice * existingDiscount.value) / 100;
        } else {
          totalPrice -= existingDiscount.value;
        }
      }
    }

    const existingAddress = await Address.findOne({ _id: address });
    if (!existingAddress) {
      return res.status(400).json({ error: { code: 400, message: 'User address not found' } });
    }

    try {
      charge = await stripe.charges.create({
        amount: totalPrice * 100,
        currency: 'brl',
        description: 'SMPLE',
        source: token,
        metadata: { cart_id: cart, discount: existingDiscount ? existingDiscount.code : 'Sem desconto' },
      });
    } catch (err) {
      return res.status(err.statusCode).json(
        { error: { code: err.raw.decline_code, message: err.raw.message } }
      );
    }
    console.log(charge);
  }
}

export default StripeController;
