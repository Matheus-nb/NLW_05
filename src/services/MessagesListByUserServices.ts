import { getCustomRepository } from "typeorm";
import Messages from "../entities/Messages";
import MessagesRepository from "../repositories/MessagesRepository";


class MessagesListByUserServices {
    public async execute(user_id: string): Promise<Messages[]> {
        const messagesRepository = getCustomRepository(MessagesRepository);

        const messages = messagesRepository.find({
            where: {user_id},
            relations: ["user"]
        })

        return messages;
    }
}

export default MessagesListByUserServices;