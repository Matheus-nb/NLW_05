import { getCustomRepository } from "typeorm";
import User from "../entities/User";
import UsersRepository from "../repositories/UsersRepository";




class UsersService {
    public async execute(email: string): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        let user = await usersRepository.findOne({email});

        if(user){
            return user;
        }

        user = usersRepository.create({
            email,
        })

        await usersRepository.save(user);

        return user;
    };
};

export default UsersService;