
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/User';

import uploadConfig from '../config/upload';

interface Request{
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({user_id, avatarFilename}: Request): Promise<User | undefined>{

        const repository = getRepository(User);

        const user = await repository.findOne(user_id);
        
        if(!user){
            throw new Error('User no exist');
        }

        // deletar avatar anterior
        if(user.avatar){
            // juntando duas variaveis e formando a rota da imagem do avatar
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

            // o fs stat retorna um estatus caso exista um arqivo
            const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExist){
                // apaga o arquivo
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        // salvar
        user.avatar = avatarFilename;

        await repository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;