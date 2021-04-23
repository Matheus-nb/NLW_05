import { injectable, inject } from 'tsyringe';

import Messages from '../infra/typeorm/entities/Messages';
import IMessagesRepository from '../repositories/IMessagesRepository';

@injectable()
class MessagesListByUserServices {
    constructor(
        @inject('MessagesRepository')
        private messagesRepository: IMessagesRepository,
    ) {}

    public async execute(user_id: string): Promise<Messages[]> {
        const messages = await this.messagesRepository.findById(user_id);

        return messages;
    }
}

export default MessagesListByUserServices;
