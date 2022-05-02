import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const statusRoute = Router();


statusRoute.use('/status', (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
});

export default statusRoute;