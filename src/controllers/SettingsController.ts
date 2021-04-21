import {Response, Request} from 'express';

import SettingsService from '../services/SettingsServices';


class SettingsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const settingsService = new SettingsService();
        const {chat, username} = request.body;

        
        const settings = await settingsService.execute({chat, username});
        
        return response.json(settings);
    }
}

export default SettingsController;