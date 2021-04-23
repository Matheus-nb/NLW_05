import { inject, injectable } from 'tsyringe';
import Connection from '../infra/typeorm/entities/Connection';
import IConnectionsRepository from '../repositories/IConnectionsRepository';

@injectable()
class UserByConnectionSocketIdService {
    constructor(
        @inject('ConnectionsRepository')
        private connectionsRepository: IConnectionsRepository,
    ) {}

    public async execute(socket_id: string): Promise<Connection | undefined> {
        const user = await this.connectionsRepository.findUserByConnectionSocketId(
            socket_id,
        );

        return user;
    }
}

export default UserByConnectionSocketIdService;
