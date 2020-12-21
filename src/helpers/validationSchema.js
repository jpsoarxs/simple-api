import Joi from '@hapi/joi';

const loginSchema = {
  email: Joi.string().min(5).max(100).required()
    .email(),
  password: Joi.string().min(5).max(50).required()
};

const customerSchema = {
  email: Joi.string().min(5).max(100).email(),
  password: Joi.string().min(5).max(50),
  name: Joi.string().min(1).max(50),
  lastname: Joi.string().min(1).max(50),
};

const registerSchema = {
  name: Joi.string().min(1).max(50),
  lastname: Joi.string().min(1).max(50),
  email: Joi.string().min(5).max(100).required()
    .email(),
  password: Joi.string().min(5).max(50).required(),
};

const shoppingCartSchema = {
  token: Joi.string().required(),
  product: Joi.string().required(),
  quantity: Joi.number().required(),
  attribute: Joi.string().required(),
};

const addressSchema = {
  title: Joi.string().required(),
  address: Joi.string().required(),
  complement: Joi.string(),
  uf: Joi.string().required(),
  city: Joi.string().required(),
  cep: Joi.string().required()
};

const orderSchema = {
  cart: Joi.string().required(),
  transaction: Joi.string().required(),
  cupom: Joi.string(),
  customer: Joi.string().required(),
  address: Joi.string().required(),
};

const productSchema = {
  title: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().required(),
  thumbnail: Joi.string().required(),
  category: Joi.string().required(),
  attributes: Joi.array().required()
};

const cardSchema = {
  credit_card: Joi.string().required()
};

export default {
  loginSchema,
  cardSchema,
  orderSchema,
  shoppingCartSchema,
  addressSchema,
  registerSchema,
  customerSchema,
  productSchema,
};
