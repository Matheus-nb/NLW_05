import { inject, injectable } from 'tsyringe';
import ISettingsRepository from '../repositories/ISettingsRepository';
import AppError from '../../../shared/errors/AppError';
import Setting from '../infra/typeorm/entities/Setting';

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

@injectable()
class SettingsService {
    constructor(
        @inject('SettingsRepository')
        private settingsRepository: ISettingsRepository,
    ) {}

    public async execute({
        chat,
        username,
    }: ISettingsCreate): Promise<Setting> {
        const userAlreadyExists = await this.settingsRepository.findByUsername(
            username,
        );

        if (userAlreadyExists) {
            throw new AppError('Username already in use!', 400);
        }

        const settings = this.settingsRepository.create({
            chat,
            username,
        });

        return settings;
    }
}

export default SettingsService;
