import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ConnectionsService from '../../../services/ConnectionsService';

class ConnectionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const createConnection = container.resolve(ConnectionsService);

        const { socket_id, admin_id, user_id, id } = request.body;

        const connection = await createConnection.execute({
            socket_id,
            admin_id,
            user_id,
            id,
        });

        return response.json(connection);
    }
}

export default ConnectionsController;
