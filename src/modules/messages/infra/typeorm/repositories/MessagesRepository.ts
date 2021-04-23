import { getRepository, Repository } from 'typeorm';

import IMessagesRepository from '../../../repositories/IMessagesRepository';
import ICreateMessagesDTO from '../../../dtos/ICreateMessagesDTO';

import Messages from '../entities/Messages';

class MessagesRepository implements IMessagesRepository {
    private ormRepository: Repository<Messages>;

    constructor() {
        this.ormRepository = getRepository(Messages);
    }

    public async create({
        admin_id,
        text,
        user_id,
    }: ICreateMessagesDTO): Promise<Messages> {
        const messages = this.ormRepository.create({
            admin_id,
            text,
            user_id,
        });
        await this.ormRepository.save(messages);

        return messages;
    }

    public async findById(user_id: string): Promise<Messages[]> {
        const messages = await this.ormRepository.find({
            where: { user_id },
            relations: ['user'],
        });

        return messages;
    }
}

export default MessagesRepository;
