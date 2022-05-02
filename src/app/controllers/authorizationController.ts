import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ForbiddenError from "../../database/models/errors/forbidden.error.model";
import userRepository from "../../repositories/user.repository";
import JWT from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

class authorizationController {

    async register(req: Request, res: Response, next: NextFunction) {
        const newUser = req.body;//user defined in the request
        try {
            await userRepository.create(newUser);
            res.status(StatusCodes.CREATED).send(newUser);
        } catch (err) {
            next(err);
        }
    };

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user; //user defined in the middleware

            if (!user) {
                throw new ForbiddenError('Usuário não informado!')
            }

            const jwtPayload = { username: user.username, admin: user.admin };
            const jwtOptions = { subject: user?.uuid, expiresIn: 60 * 60 };
            const secretKey = process.env.APP_KEY;
            if (!secretKey) {
                throw new ForbiddenError("A chave da aplicação não foi configurada corretamente");
            }
            const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

            res.status(StatusCodes.OK).send({ token: jwt });
        } catch (err) {
            next(err);
        }
    };

    async validate(req: Request, res: Response, next: NextFunction) {
        res.sendStatus(StatusCodes.OK);
    };
}

export default new authorizationController();