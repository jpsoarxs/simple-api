import { Router } from 'express';

import cartController from '../controllers/cartController';

import auth from '../../middlewares/authenticate';
import permission from '../../middlewares/authorization';

const cartRouter = Router();

cartRouter.get('/token', cartController.generateUniqueId);
cartRouter.post('/add', cartController.add);
cartRouter.get('/', auth, permission.permit('admin'), cartController.list);
cartRouter.get('/:id', cartController.findById);

export default cartRouter;
