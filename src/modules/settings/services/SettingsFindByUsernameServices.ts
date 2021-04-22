import { inject, injectable } from 'tsyringe';
import ISettingsRepository from '../repositories/ISettingsRepository';
import Setting from '../infra/typeorm/entities/Setting';

@injectable()
class SettingsFindByUsernameServices {
    constructor(
        @inject('SettingsRepository')
        private settingsRepository: ISettingsRepository,
    ) {}

    public async execute(username: string): Promise<Setting | undefined> {
        const settings = await this.settingsRepository.findByUsername(username);

        return settings;
    }
}

export default SettingsFindByUsernameServices;
