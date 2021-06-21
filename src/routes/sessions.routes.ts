import Router from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {
        // pegar o q irá fazer a autenticação
        const { email, password } = request.body;
        // como possui uma regra de negocio, criar um service

        const authenticateUser = new AuthenticateUserService();

        // retorna o user e token, após email e senha serem verificados
        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        return response.json({ user, token });

    } catch (error) {
        return response.status(400).json({error: error.message})
    }
})

export default sessionsRouter;