import { Request, Response } from "express";
import MessagesServices from "../services/MessagesServices";

class MessagesController {
    public async create(request: Request, response: Response): Promise<Response> {
        const {admin_id, text, user_id} = request.body;
        const messagesServices = new MessagesServices();

        const message = await messagesServices.execute({
            admin_id,
            text,
            user_id,
        })

        return response.json(message)
    }
}

export default MessagesController;