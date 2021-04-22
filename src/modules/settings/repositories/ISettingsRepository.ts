import ICreateSettings from '../dtos/ICreateSettingsDTO';
import Setting from '../infra/typeorm/entities/Setting';

export default interface ISettingsRepository {
    create(data: ICreateSettings): Promise<Setting>;
    findByUsername(username: string): Promise<Setting | undefined>;
    Update(data: ICreateSettings): Promise<void>;
}
