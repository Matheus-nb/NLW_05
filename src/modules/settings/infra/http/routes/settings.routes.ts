import { Router } from 'express';

import SettingsController from '../controllers/SettingsController';

const settingsController = new SettingsController();

const settingsRouter = Router();

settingsRouter.post('/', settingsController.create);
settingsRouter.get('/:username', settingsController.search);
settingsRouter.put('/:username', settingsController.update);

export default settingsRouter;
