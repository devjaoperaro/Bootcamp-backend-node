import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const userRespository = getRepository(User);

        // validação de um unico email
        const checkUserExists = await userRespository.findOne({
            where: { email: email },
        });

        if (checkUserExists){
            throw new Error('Email address already used');
        }

        const hashedPassword = await hash(password, 8);

        // instancia
        const user = userRespository.create({
            name,
            email,
            password: hashedPassword,
        });

        await userRespository.save(user);

        return user;
    }
}

export default CreateUserService;