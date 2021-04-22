import { Request, Response } from 'express';
import { container } from 'tsyringe';

import MessagesServices from '../../../services/MessagesServices';

class MessagesController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { admin_id, text, user_id } = request.body;

        const createMessages = container.resolve(MessagesServices);

        const message = await createMessages.execute({
            admin_id,
            text,
            user_id,
        });

        return response.json(message);
    }
}

export default MessagesController;
