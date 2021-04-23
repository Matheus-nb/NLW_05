import { inject, injectable } from 'tsyringe';
import IConnectionsRepository from '../repositories/IConnectionsRepository';

interface ISettings {
    user_id: string;
    admin_id: string;
}

@injectable()
class UpdateAdminIdService {
    constructor(
        @inject('ConnectionsRepository')
        private connectionsRepository: IConnectionsRepository,
    ) {}

    public async execute({ admin_id, user_id }: ISettings): Promise<void> {
        await this.connectionsRepository.update(user_id, admin_id);
    }
}

export default UpdateAdminIdService;
