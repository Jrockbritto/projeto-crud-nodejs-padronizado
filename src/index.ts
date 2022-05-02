import express from 'express';
import usersRoute from './routes/users.route';
import statusRoute from './routes/status.route';
import errorHandler from './app/middlewares/error-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import jwtAuthenticationMiddleware from './app/middlewares/jwt-authentication.middleware';

const app = express();

//Application Configuration
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Route Configuration
app.use(statusRoute);
app.use(authorizationRoute);

app.use(jwtAuthenticationMiddleware);
app.use(usersRoute);

//Error Handler configuration

app.use(errorHandler);

// Route initialization
app.listen(3000, () => {
    console.log('listening on http://127.0.0.1:3000/status');
})