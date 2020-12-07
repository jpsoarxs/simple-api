import { Router } from 'express';

import cupomController from '../controllers/cupomController';

import auth from '../../middlewares/authenticate';
import permission from '../../middlewares/authorization';

const cupomRouter = Router();

cupomRouter.post('/', auth, permission.permit('admin'), cupomController.create);
cupomRouter.get('/', auth, permission.permit('admin'), cupomController.list);
cupomRouter.get('/:id', cupomController.findByID);

export default cupomRouter;
