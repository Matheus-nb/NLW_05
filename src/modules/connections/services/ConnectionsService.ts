import { inject, injectable } from 'tsyringe';
import Connection from '../infra/typeorm/entities/Connection';
import IConnectionsRepository from '../repositories/IConnectionsRepository';
import ICreateConnectionDTO from '../dtos/ICreateConnectionDTO';

@injectable()
class UsersService {
    constructor(
        @inject('ConnectionsRepository')
        private connectionsRepository: IConnectionsRepository,
    ) {}

    public async execute({
        socket_id,
        admin_id,
        user_id,
        id,
    }: ICreateConnectionDTO): Promise<Connection> {
        const user = this.connectionsRepository.create({
            socket_id,
            admin_id,
            user_id,
            id,
        });

        return user;
    }
}

export default UsersService;
