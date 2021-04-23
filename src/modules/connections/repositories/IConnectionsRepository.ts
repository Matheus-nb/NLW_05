import Connection from '../infra/typeorm/entities/Connection';
import ICreateConnectionDTO from '../dtos/ICreateConnectionDTO';

export default interface IConnectionsRepository {
    create(data: ICreateConnectionDTO): Promise<Connection>;
    findByUserId(user_id: string): Promise<Connection | undefined>;
    findUserByConnectionSocketId(
        socket_id: string,
    ): Promise<Connection | undefined>;
    findWithoutAdmin(): Promise<Connection[] | undefined>;
    update(user_id: string, admin_id: string): Promise<void>;
}
