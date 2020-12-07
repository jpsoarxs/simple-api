import { Router } from 'express';

import productController from '../controllers/productController';

import auth from '../../middlewares/authenticate';
import permission from '../../middlewares/authorization';

const productRouter = Router();

productRouter.post('/', auth, permission.permit('admin'), productController.create);
productRouter.get('/', productController.list);
productRouter.get('/:id', productController.findByID);

export default productRouter;
