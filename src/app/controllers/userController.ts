import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userRepository from "../../repositories/user.repository";

class authorizationController {
    async list(req: Request, res: Response, next: NextFunction) {
        const users = await userRepository.findAllUsers();
        res.status(StatusCodes.OK).json(users);
    };

    async fetch(req: Request<{ uuid: string }>, res: Response, next: NextFunction) {
        try {
            const uuid = req.params.uuid;
            const user = await userRepository.findById(uuid);
            console.log(user);
            if (user == null) { throw new Error('null') }
            res.status(StatusCodes.OK).send(user);
        } catch (err) {
            next(err);
        }
    };

    async create(req: Request, res: Response, next: NextFunction) {
        const newUser = req.body;
        try {
            const uuid = await userRepository.create(newUser);
            res.status(StatusCodes.CREATED).send(uuid);
        } catch (err) {
            next(err);
        }
    };

    async update(req: Request<{ uuid: string }>, res: Response, next: NextFunction) {
        const uuid = req.params.uuid;
        const modifiedUser = req.body;
        modifiedUser.uuid = uuid;

        await userRepository.update(modifiedUser);
        res.sendStatus(StatusCodes.OK);
    };

    async delete(req: Request<{ uuid: string }>, res: Response, next: NextFunction) {
        const uuid = req.params.uuid;
        await userRepository.remove(uuid);
        res.sendStatus(StatusCodes.OK);
    };
}
export default new authorizationController();