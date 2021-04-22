import { inject, injectable } from 'tsyringe';
import ISettingsRepository from '../repositories/ISettingsRepository';

interface ISettings {
    chat: boolean;
    username: string;
}

@injectable()
class SettingsUpdateChatServices {
    constructor(
        @inject('SettingsRepository')
        private settingsRepository: ISettingsRepository,
    ) {}

    public async execute({ chat, username }: ISettings): Promise<void> {
        await this.settingsRepository.Update({ chat, username });
    }
}

export default SettingsUpdateChatServices;
