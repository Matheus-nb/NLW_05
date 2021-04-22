import { getRepository, Repository } from 'typeorm';
import ICreateSettingsDTO from '../../../dtos/ICreateSettingsDTO';
import ISettingsRepository from '../../../repositories/ISettingsRepository';
import Setting from '../entities/Setting';

class SettingsRepository implements ISettingsRepository {
    private ormRepository: Repository<Setting>;

    constructor() {
        this.ormRepository = getRepository(Setting);
    }

    public async create({
        chat,
        username,
    }: ICreateSettingsDTO): Promise<Setting> {
        const setting = this.ormRepository.create({
            chat,
            username,
        });

        await this.ormRepository.save(setting);

        return setting;
    }

    public async findByUsername(
        username: string,
    ): Promise<Setting | undefined> {
        const setting = this.ormRepository.findOne(username);

        return setting;
    }

    public async Update({ chat, username }: ICreateSettingsDTO): Promise<void> {
        const setting = this.ormRepository
            .createQueryBuilder()
            .update(Setting)
            .set({ chat })
            .where('username = :username', {
                username,
            })
            .execute();
    }
}

export default SettingsRepository;
