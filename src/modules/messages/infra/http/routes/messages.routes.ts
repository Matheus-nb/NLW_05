import { Router } from 'express';

import MessagesController from '../controllers/MessagesController';
import MessagesListByUserController from '../controllers/MessagesListByUserController';

const messagesController = new MessagesController();
const messagesListByUserController = new MessagesListByUserController();

const messagesRouter = Router();

messagesRouter.post('/', messagesController.create);
messagesRouter.get('/:id', messagesListByUserController.index);

export default messagesRouter;
