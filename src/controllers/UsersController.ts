import { Request, Response } from "express";
import UsersService from "../services/UsersServices";



class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
        const usersService = new UsersService();

        const { email } = request.body;

        const user = await usersService.execute(email);

        return response.json(user)
    }
}


export default UsersController;