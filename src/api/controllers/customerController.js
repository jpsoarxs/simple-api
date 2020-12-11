/* eslint-disable no-underscore-dangle */
import helpers from '../../helpers/utils';
import Customer from '../../models/customer';
import Address from '../../models/address';

const {
  validateRegisterDetails,
  validateLoginDetails,
  validateAddressDetails,
  comparePasswords,
  createToken,
  hashPassword,
  errorResponse
} = helpers;


/**
   * @export
   * @class CustomerController
   * @description Performs operations on the customer
   */
class CustomerController {
  /**
    * @description -This method registers a customer
    * @param {object} req - The request payload
    * @param {object} res - The response payload sent back from the method
    * @returns {object} - customer and accessToken
    */
  static async register(req, res) {
    const {
      name, lastname, email, password
    } = req.body;
    try {
      const { error } = validateRegisterDetails(req.body);

      if (error) {
        const errorField = error.details[0].context.key;
        const errorMessage = error.details[0].message;
        return errorResponse(res, 400, 'USR_01', errorMessage, errorField);
      }

      if (await Customer.exists({ email })) {
        return errorResponse(res, 400, 'USR_03', 'Já existe um usuário com esse email', 'email');
      }

      const hashedPassword = await hashPassword(password);

      const customer = await Customer.create({
        name, lastname, email, password: hashedPassword
      });

      const token = createToken(customer);

      const formatedJson = {
        // eslint-disable-next-line no-underscore-dangle
        _id: customer._id,
        name: customer.name,
        lastname: customer.lastname,
        email: customer.email,
        address: customer.address,
        createdAt: customer.createdAt,
      };

      return res.status(200).json({
        accessToken: `Bearer ${token}`, customer: formatedJson, expires_in: '24h'
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  /**
    * @description -This method autenticate a customer
    * @param {object} req - The request payload
    * @param {object} res - The response payload sent back from the method
    * @returns {object} - customer and accessToken
    */
  static async login(req, res) {
    const {
      email, password
    } = req.body;
    try {
      const { error } = validateLoginDetails(req.body);

      if (error) {
        const errorField = error.details[0].context.key;
        const errorMessage = error.details[0].message;
        return errorResponse(res, 400, 'USR_01', errorMessage, errorField);
      }

      const existingCustomer = await Customer.findOne({ email }).select('+password').populate(['address']);

      if (!existingCustomer) {
        return errorResponse(res, 400, 'USR_02', 'Usuário não foi encontrado', 'email');
      }

      const match = await comparePasswords(password, existingCustomer.password);

      if (match) {
        const customer = existingCustomer;
        const token = await createToken(customer);

        const formatedJson = {
          // eslint-disable-next-line no-underscore-dangle
          _id: customer._id,
          name: customer.name,
          lastname: customer.lastname,
          email: customer.email,
          address: customer.address,
          createdAt: customer.createdAt
        };

        return res.status(200).json({
          accessToken: `Bearer ${token}`,
          customer: formatedJson,
          expires_in: '24h'
        });
      }
      return errorResponse(res, 400, 'USR_03', 'A senha informada não é valida');
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  /**
    * @description -This method autenticate a customer
    * @param {object} req - The request payload
    * @param {object} res - The response payload sent back from the method
    * @returns {object} - customer and accessToken
    */
  static async update(req, res) {
    const { _id } = req.user;
    try {
      if (req.body.address) {
        return errorResponse(res, 400, 'USR_01', 'Você não pode modificar o endereço', 'address');
      }

      await Customer.updateOne({ _id }, req.body);

      const customer = await Customer.findOne({ _id }).select('-address');
      return res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  /**
    * @description -This method autenticate a customer
    * @param {object} req - The request payload
    * @param {object} res - The response payload sent back from the method
    * @returns {object} - customer and accessToken
    */
  static async address(req, res) {
    const { _id } = req.user;
    try {
      const { error } = validateAddressDetails(req.body);

      if (error) {
        const errorField = error.details[0].context.key;
        const errorMessage = error.details[0].message;
        return errorResponse(res, 400, 'USR_01', errorMessage, errorField);
      }

      const find = await Customer.findOne({ _id });
      const address = await Address.create(req.body);
      await Customer.updateOne({ _id }, { address: [...find.address, address._id] });
      const updated = await Customer.findOne({ _id }).populate(['address']);

      return res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default CustomerController;
