import { Router } from 'express';

import customerController from '../controllers/customerController';

// import auth from '../../middlewares/authenticate';
// import permit from '../../middlewares/authorization';

const customerRouter = Router();

customerRouter.post('/login', customerController.login);
customerRouter.post('/register', customerController.register);

export default customerRouter;
