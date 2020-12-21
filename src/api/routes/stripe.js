import { Router } from 'express';

import stripeController from '../controllers/stripeController';

const stripeRouter = Router();

stripeRouter.post('/createPayment', stripeController.sendPayment);

export default stripeRouter;
