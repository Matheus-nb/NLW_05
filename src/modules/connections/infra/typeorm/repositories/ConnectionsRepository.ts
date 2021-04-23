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
        const user = await this.ormRepository.findOne({ where: { user_id } });

        return user;
    }

    public async findWithoutAdmin(): Promise<Connection[] | undefined> {
        const user = await this.ormRepository.find({
            where: { admin_id: null },
            relations: ['user'],
        });

        return user;
    }

    public async findUserByConnectionSocketId(
        socket_id: string,
    ): Promise<Connection | undefined> {
        const connection = await this.ormRepository.findOne({
            where: { socket_id },
        });

        return connection;
    }

    public async update(user_id: string, admin_id: string): Promise<void> {
        await this.ormRepository
            .createQueryBuilder()
            .update(Connection)
            .set({ admin_id })
            .where('user_id = :user_id', {
                user_id,
            })
            .execute();
    }
}

export default ConnectionsRepository;
