import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import DatabaseError from '../models/errors/database.error.model';
import ForbiddenError from '../models/errors/forbidden.error.model';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if(err instanceof DatabaseError) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
    } else if(err.message == 'null') {
        res.sendStatus(StatusCodes.NOT_FOUND);
    } else if(err instanceof ForbiddenError) {
        res.sendStatus(StatusCodes.FORBIDDEN);
    } else{
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default errorHandler;