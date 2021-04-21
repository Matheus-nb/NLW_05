import { getCustomRepository } from "typeorm";
import SettingsRepository from "../repositories/SettingsRepository";
import AppError from '../errors/AppError';
import Setting from "../entities/Setting";

interface ISettingsCreate {
    chat: boolean;
    username: string
}

class SettingsService {
    public async execute({chat, username}:ISettingsCreate): Promise<Setting> {
        const settingsRepository = getCustomRepository(SettingsRepository);

        const userAlreadyExists = await settingsRepository.findOne({username});

        if(userAlreadyExists){
            throw new AppError(
                'Username already in use!',
                400,
            );
        };
        
        const settings = settingsRepository.create({
            chat,
            username,
        });

        await settingsRepository.save(settings);

        return settings;
    }
}

export default SettingsService;