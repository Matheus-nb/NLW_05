import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class UsersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(email: string): Promise<User> {
        const UserAlreadyExists = await this.usersRepository.findByEmail(email);

        if (UserAlreadyExists) {
            return UserAlreadyExists;
        }

        const user = this.usersRepository.create(email);

        return user;
    }
}

export default UsersService;
