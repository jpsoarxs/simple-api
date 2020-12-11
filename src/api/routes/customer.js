import { Router } from 'express';

import customerController from '../controllers/customerController';

import auth from '../../middlewares/authenticate';
// import permit from '../../middlewares/authorization';

const customerRouter = Router();

customerRouter.post('/login', customerController.login);
customerRouter.post('/register', customerController.register);
customerRouter.put('/update', auth, customerController.update);
customerRouter.post('/address', auth, customerController.address);

export default customerRouter;
