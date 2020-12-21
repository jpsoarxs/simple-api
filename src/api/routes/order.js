import { Router } from 'express';

import orderController from '../controllers/orderController';

const orderRouter = Router();

orderRouter.post('/', orderController.create);

export default orderRouter;
