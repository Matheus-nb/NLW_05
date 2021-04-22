import { Router } from 'express';

import ConnectionsController from '../controllers/ConnectionsController';

const connectionsController = new ConnectionsController();

const connectionsRouter = Router();

connectionsRouter.post('/', connectionsController.create);

export default connectionsRouter;
