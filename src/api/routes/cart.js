import { Router } from 'express';

import cartController from '../controllers/cartController';

// import auth from '../../middlewares/authenticate';
// import permission from '../../middlewares/authorization';

const cartRouter = Router();

cartRouter.get('/token', cartController.generateUniqueId);
cartRouter.post('/add', cartController.add);
cartRouter.get('/', cartController.list);

export default cartRouter;
