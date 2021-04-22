import { getRepository, Repository } from 'typeorm';
import Connection from '../entities/Connection';
import IConnectionsRepository from '../../../repositories/IConnectionsRepository';
import ICreateConnectionDTO from '../../../dtos/ICreateConnectionDTO';

class ConnectionsRepository implements IConnectionsRepository {
    private ormRepository: Repository<Connection>;

    constructor() {
        this.ormRepository = getRepository(Connection);
    }

    public async create(data: ICreateConnectionDTO): Promise<Connection> {
        const user = this.ormRepository.create(data);

        await this.ormRepository.save(user);

        return user;
    }

    public async findByUserId(
        user_id: string,
    ): Promise<Connection | undefined> {
        const user = this.ormRepository.findOne({ where: { user_id } });

        return user;
    }
}

export default ConnectionsRepository;
