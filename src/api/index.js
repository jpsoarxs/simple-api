import express from 'express';

import customerRouter from './routes/customer';
import productsRouter from './routes/product';
import cartRouter from './routes/cart';
import cupomRouter from './routes/cupom';
import freteRouter from './routes/frete';
import orderRouter from './routes/order';
import stripeRouter from './routes/stripe';

const router = express.Router();

router.use('/customers', customerRouter);
router.use('/products', productsRouter);
router.use('/carts', cartRouter);
router.use('/cupoms', cupomRouter);
router.use('/frete', freteRouter);
router.use('/order', orderRouter);
router.use('/stripe', stripeRouter);

export default router;
