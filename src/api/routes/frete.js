import { Router } from 'express';

import freteController from '../controllers/freteController';

const freteRouter = Router();

freteRouter.get('/', freteController.calculate);

export default freteRouter;
