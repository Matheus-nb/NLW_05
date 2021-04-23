import { inject, injectable } from 'tsyringe';
import Connection from '../infra/typeorm/entities/Connection';
import IConnectionsRepository from '../repositories/IConnectionsRepository';

@injectable()
class ConnectionsWithoutAdminService {
    constructor(
        @inject('ConnectionsRepository')
        private connectionsRepository: IConnectionsRepository,
    ) {}

    public async execute(): Promise<Connection[] | undefined> {
        const users = await this.connectionsRepository.findWithoutAdmin();

        return users;
    }
}

export default ConnectionsWithoutAdminService;
