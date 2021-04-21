import { getCustomRepository } from "typeorm";
import Messages from "../entities/Messages";
import MessagesRepository from "../repositories/MessagesRepository";

interface IMessageCreate {
    admin_id?: string;
    text: string;
    user_id: string;
};


class MessagesServices {
    public async execute({admin_id, text, user_id}: IMessageCreate): Promise<Messages> {
        const messagesRepository = getCustomRepository(MessagesRepository);

        const message = messagesRepository.create({
            admin_id,
            text,
            user_id
        })

        await messagesRepository.save(message);

        return message;
    }
}

export default MessagesServices;