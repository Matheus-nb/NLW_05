import {Router} from 'express'
import MessagesController from './controllers/MessagesController';
import MessagesListByUserController from './controllers/MessagesListByUserController';
import SettingsController from './controllers/SettingsController';
import UsersController from './controllers/UsersController';

const routes = Router();

const settingController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();
const messagesListByUserController = new MessagesListByUserController();



routes.post("/settings", settingController.create)
routes.post("/users", usersController.create)
routes.post("/messages", messagesController.create)
routes.get("/messages/:id", messagesListByUserController.index)




export {routes};