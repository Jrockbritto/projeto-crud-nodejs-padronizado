import { NextFunction, Request, Response, Router } from "express";
import JWT from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";
import ForbiddenError from "../models/errors/forbidden.error.model";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";
import userRepository from "../repositories/user.repository";
import dotenv from "dotenv";

dotenv.config();

const authorizationRoute = Router();
// endpoint to register a new admin user
authorizationRoute.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;//user defined in the request
    try{
        await userRepository.create(newUser);
        res.status(StatusCodes.CREATED).send(newUser);
    }catch(err){
        next(err);
    }
});
//checks if token still valid (the token expires after 1 hour)
authorizationRoute.post('/login/validate', jwtAuthenticationMiddleware, (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
});
//End point for login (both admin and not admin)
authorizationRoute.post('/login', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = req.user; //user defined in the middleware

        if (!user) {
            throw new ForbiddenError('Usuário não informado!')
        }

        const jwtPayload = { username: user.username, admin: user.admin };
        const jwtOptions = { subject: user?.uuid, expiresIn: 60*60 };
        const secretKey = process.env.APP_KEY;
        if(!secretKey) {
            throw new ForbiddenError("A chave da aplicação não foi configurada corretamente");
        }
        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

        res.status(StatusCodes.OK).send({ token:jwt });
    }catch(err){
        next(err);
    }
});

export default authorizationRoute;