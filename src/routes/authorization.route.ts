import { Router } from "express";
import basicAuthenticationMiddleware from "../app/middlewares/basic-authentication.middleware";
import jwtAuthenticationMiddleware from "../app/middlewares/jwt-authentication.middleware";

const authorizationController = require("../app/controllers/authorizationController");


const authorizationRoute = Router();
// endpoint to register a new admin user
authorizationRoute.post('/register', authorizationController.register)

//checks if token still valid (the token expires after 1 hour)
authorizationRoute.post('/login/validate', jwtAuthenticationMiddleware, authorizationController.validate);

//End point for login (both admin and not admin)
authorizationRoute.post('/login', basicAuthenticationMiddleware, authorizationController.login);

export default authorizationRoute;