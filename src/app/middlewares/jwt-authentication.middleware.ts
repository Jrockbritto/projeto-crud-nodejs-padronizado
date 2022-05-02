import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import ForbiddenError from "../../database/models/errors/forbidden.error.model";
import dotenv from "dotenv";

dotenv.config();

async function jwtAuthenticationMiddleware (req: Request,res: Response,next: NextFunction) {
    try{
        const authorizationHeader = req.headers['authorization'];
    
        if(!authorizationHeader) {
            throw new ForbiddenError('Credenciais não informadas');
        }

        //basic "token"

        const [authenticationType, token] = authorizationHeader.split(' ');
        
        if(authenticationType !== 'Bearer' || !token ) {
            throw new ForbiddenError('Tipo de autenticação invalido');
        }

        try{
            //secret app key
            const secretKey = process.env.APP_KEY;
            if(!secretKey) {
                throw new ForbiddenError("A chave da aplicação nao foi configurada corretamente");
            }
            const tokenPayload = JWT.verify(token,secretKey);

            if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
                throw new ForbiddenError('Token invalido');
            }
            // checks if user has the admin role
            if(!tokenPayload.admin){
                throw new ForbiddenError('Usuário não possui permissão');
            }
    
            const user = {
                uuid: tokenPayload.sub,
                username: tokenPayload.username,
                admin: tokenPayload.admin
            };
    
            req.user = user;
    
            next();
            
        } catch(err) {
            throw new ForbiddenError('Token invalido');
        }

    } catch (err) {
        next(err);
    }
}

export default jwtAuthenticationMiddleware;