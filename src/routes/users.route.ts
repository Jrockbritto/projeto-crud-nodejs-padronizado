import { Router } from 'express';
import userController from '../app/controllers/userController';
// get /users
// get /users/:uuid
// post / users
// put /users/:uuid
// delete /users/:uuid

const usersRoute = Router();
//List all users
usersRoute.get('/users', userController.list);

//get specific user
usersRoute.get('/users/:uuid', userController.fetch);

//create a new user
usersRoute.post('/users', userController.create);

//update a user
usersRoute.put('/users/:uuid', userController.update);

//delete a user
usersRoute.delete('/users/:uuid', userController.delete);

export default usersRoute;