import { Request, Response } from 'express';
import { container } from 'tsyringe';

import MessagesListByUserServices from '../../../services/MessagesListByUserServices';

class MessagesListByUserController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const messagesListByUserServices = container.resolve(
            MessagesListByUserServices,
        );

        const messages = await messagesListByUserServices.execute(id);

        return response.json(messages);
    }
}

export default MessagesListByUserController;
