/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
import Product from '../../models/product';
import Attributes from '../../models/attribute';
import helpers from '../../helpers/utils';

const {
  errorResponse,
  validateProduct
} = helpers;

/**
   * @export
   * @class ProductController
   * @description Performs operations on the product
   */
class ProductController {
  /**
    * @description -This method registers a product
    * @param {object} req - The request payload
    * @param {object} res - The response payload sent back from the method
    * @returns {object} - product and accessToken
    */
  static async create(req, res) {
    const {
      attributes, title, description, price, thumbnail, category
    } = req.body;
    try {
      const { error } = validateProduct(req.body);

      if (error) {
        const errorField = error.details[0].context.key;
        const errorMessage = error.details[0].message;
        return errorResponse(res, 400, 'PRO_01', errorMessage, errorField);
      }

      let productAtt;
      let ids = [];

      await attributes.forEach((value) => {
        productAtt = new Attributes(value);
        productAtt.save();
        ids.push(productAtt._id.toString());
      });

      let product = await Product.create({
        title, description, price, thumbnail, category, attributes: ids
      });

      product = await Product.findById(product._id.toString()).populate(['category', 'attributes']);

      //   const product = await Product.create(req.body);
      return res.status(201).json({ product });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  /**
    * @description -This method registers a product
    * @param {object} req - The request payload
    * @param {object} res - The response payload sent back from the method
    * @returns {object} - product and accessToken
    */
  static async list(req, res) {
    try {
      const product = await Product.find().populate(['category', 'attributes']);
      return res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  /**
    * @description -This method registers a product
    * @param {object} req - The request payload
    * @param {object} res - The response payload sent back from the method
    * @returns {object} - product and accessToken
    */
  static async findByID(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findById(id).populate('category');

      if (!product) {
        return errorResponse(res, 400, 'PRO_01', 'Nenhum produto encontrado com esse ID');
      }

      return res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default ProductController;
