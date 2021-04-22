import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';
import IUsersRepository from '../../../repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async create(email: string): Promise<User> {
        const user = this.ormRepository.create({ email });

        await this.ormRepository.save(user);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = this.ormRepository.findOne({ where: { email } });

        return user;
    }
}

export default UsersRepository;
