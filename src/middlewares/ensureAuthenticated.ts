// middleware é uma função q  Intercepta requisições

import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void{

    // coletando o token na header de autorização
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new Error('JWT token is missing');
    }

    // separando token: Bearer, token
    const [, token] = authHeader.split(' ');

    try {
        // verify vai verificar se o token é verdadeiro por meio da chave secret
        // se o token for verdadeiro, o decoded vai conter os dados do nosso payload
        const decoded = verify(token, authConfig.jwt.secret);

        // vem a data de criação, data q expira o token e o id do usuario
        console.log(decoded);

        const { sub } = decoded as TokenPayload; 

        // quando nao reconhece, cria-se o arquivo types com a config
        request.user = {
            id: sub,
        };
        
        return next();

    } catch {
        throw new Error('Invalid JWT token');
    }
}