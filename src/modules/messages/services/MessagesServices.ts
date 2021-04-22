import { injectable, inject } from 'tsyringe';

import Messages from '../infra/typeorm/entities/Messages';
import IMessagesRepository from '../repositories/IMessagesRepository';

interface IRequestDTO {
    admin_id?: string;
    text: string;
    user_id: string;
}

@injectable()
class MessagesServices {
    constructor(
        @inject('MessagesRepository')
        private messagesRepository: IMessagesRepository,
    ) {}

    public async execute({
        admin_id,
        text,
        user_id,
    }: IRequestDTO): Promise<Messages> {
        const message = await this.messagesRepository.create({
            admin_id,
            text,
            user_id,
        });

        return message;
    }
}

export default MessagesServices;
