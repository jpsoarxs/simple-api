/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from '@hapi/joi';
import 'dotenv/config';
import xml2js from 'xml2js';
import http from 'http';
import schema from './validationSchema';

const options = { language: { key: '{{key}} ' } };

const { parseString } = xml2js;

export default {
  async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  },
  async comparePasswords(password, userPassword) {
    const match = await bcrypt.compare(password, userPassword);
    return match;
  },

  createToken(user) {
    const {
      _id, name, email, role
    } = user;
    return jwt.sign({
      _id,
      name,
      email,
      role,
    },
    process.env.SECRET, { expiresIn: 86400 });
  },

  xmlToJson(url, callback) {
    // eslint-disable-next-line no-var
    var req = http.get(url, (res) => {
      let xml = '';

      res.on('data', (chunk) => {
        xml += chunk;
      });

      res.on('error', (e) => {
        callback(e, null);
      });

      res.on('timeout', (e) => {
        callback(e, null);
      });

      res.on('end', () => {
        parseString(xml, (_err, result) => {
          callback(null, result);
        });
      });
    });
  },

  validateRegisterDetails(user) {
    return Joi.validate(user, schema.registerSchema, options);
  },

  validateLoginDetails(user) {
    return Joi.validate(user, schema.loginSchema, options);
  },

  validateAddressDetails(user) {
    return Joi.validate(user, schema.addressSchema, options);
  },
  validateCardDetails(user) {
    return Joi.validate(user, schema.cardSchema, options);
  },
  validateCustomerDetails(user) {
    return Joi.validate(user, schema.customerSchema, options);
  },
  validateCartDetails(user) {
    return Joi.validate(user, schema.shoppingCartSchema, options);
  },
  validateOrderDetails(user) {
    return Joi.validate(user, schema.orderSchema, options);
  },

  validateProduct(user) {
    return Joi.validate(user, schema.productSchema, options);
  },

  errorResponse(res, status, code, message, field = undefined) {
    if (field !== undefined) {
      return res.status(status).json({
        error: {
          status,
          code,
          message,
          field: field || null
        }
      });
    }
    return res.status(status).json({
      error: {
        status,
        code,
        message,
      }
    });
  },

  truncateDescription(products, descriptionLength) {
    const allProducts = products.map((product) => {
      const { length } = product.dataValues.description;
      if (length > descriptionLength) {
        product.dataValues.description = `${product.dataValues.description.slice(0, descriptionLength)}...`;
      }
      return product;
    });
    return allProducts;
  }
};
