import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UsersService from '../../../services/UsersServices';

class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const createUsers = container.resolve(UsersService);

        const { email } = request.body;

        const user = await createUsers.execute(email);

        return response.json(user);
    }
}

export default UsersController;
