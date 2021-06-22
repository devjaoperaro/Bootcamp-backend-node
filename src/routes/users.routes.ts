import { secondsInHour } from 'date-fns';
import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';



const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    // se precisar de regra de negocio, cria um service
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = createUser.execute({
            name,
            email,
            password,
        });

        return response.json(user);
        
    } catch (error) {
        return response.status(400).json({ message: error.message })
    }
});

// utilizamos o patch por estar querendo atualizar uma info unica, como avatar e senha
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    try {
        const updateUserAvatar = new UpdateUserAvatarService();

        console.log(request.file)

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        return response.json(user);

    } catch (error) {
        return response.status(400).json({ message: error.message })    
    }
});


export default usersRouter;