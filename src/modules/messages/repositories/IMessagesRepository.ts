import Messages from '../infra/typeorm/entities/Messages';
import ICreateMessagesDTO from '../dtos/ICreateMessagesDTO';

export default interface IMessagesRepository {
    create(data: ICreateMessagesDTO): Promise<Messages>;
    findById(user_id: string): Promise<Messages[]>;
}
