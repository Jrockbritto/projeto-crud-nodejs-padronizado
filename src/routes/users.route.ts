import { Router, Request, Response, NextFunction } from 'express';
import statusCode from 'http-status-codes';
import userRepository from '../repositories/user.repository';

// get /users
// get /users/:uuid
// post / users
// put /users/:uuid
// delete /users/:uuid

const usersRoute =  Router();
//List all users
usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    res.status(statusCode.OK).json(users);
});
//get specific user
usersRoute.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try{
        const uuid = req.params.uuid;
        const user = await userRepository.findById(uuid);
        console.log(user);
        if (user == null){throw new Error('null')}
        res.status(statusCode.OK).send(user);     
    }catch(err){
        next(err);
    }
});
//create a new user
usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    try{
        const uuid = await userRepository.create(newUser);
        res.status(statusCode.CREATED).send(uuid);
    } catch(err){
        next(err);
    }
});
//update a user
usersRoute.put('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;
    modifiedUser.uuid = uuid;

    await userRepository.update(modifiedUser);
    res.sendStatus(statusCode.OK);
});
//delete a user
usersRoute.delete('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await userRepository.remove(uuid);
    res.sendStatus(statusCode.OK);
});

export default usersRoute;