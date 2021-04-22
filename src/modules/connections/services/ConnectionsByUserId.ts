import { inject, injectable } from 'tsyringe';
import Connection from '../infra/typeorm/entities/Connection';
import IConnectionsRepository from '../repositories/IConnectionsRepository';

@injectable()
class ConnectionsByUserId {
    constructor(
        @inject('ConnectionsRepository')
        private connectionsRepository: IConnectionsRepository,
    ) {}

    public async execute(user_id: string): Promise<Connection | undefined> {
        const user = this.connectionsRepository.findByUserId(user_id);

        return user;
    }
}

export default ConnectionsByUserId;
