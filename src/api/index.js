import express from 'express';

import customerRouter from './routes/customer';
import productsRouter from './routes/product';
import cartRouter from './routes/cart';
import cupomRouter from './routes/cupom';

const router = express.Router();

router.use('/customers', customerRouter);
router.use('/products', productsRouter);
router.use('/carts', cartRouter);
router.use('/cupoms', cupomRouter);

export default router;
