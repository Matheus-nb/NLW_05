import { Response, Request } from 'express';
import { container } from 'tsyringe';

import SettingsService from '../../../services/SettingsServices';
import SettingsFindByUsernameServices from '../../../services/SettingsFindByUsernameServices';
import SettingsUpdateChatServices from '../../../services/SettingsUpdateChatServices';

class SettingsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { chat, username } = request.body;

        const createSettings = container.resolve(SettingsService);

        const settings = await createSettings.execute({ chat, username });

        return response.json(settings);
    }

    public async search(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { username } = request.body;

        const settingsFindByUsernameServices = container.resolve(
            SettingsFindByUsernameServices,
        );

        const settings = await settingsFindByUsernameServices.execute(username);

        return response.json(settings);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { username } = request.params;
        const { chat } = request.body;

        const settingsUpdateChatServices = container.resolve(
            SettingsUpdateChatServices,
        );

        const settings = await settingsUpdateChatServices.execute({
            username,
            chat,
        });

        return response.json(settings);
    }
}

export default SettingsController;
