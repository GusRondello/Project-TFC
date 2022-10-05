import { NextFunction, Request, Response } from 'express';
import TokenHelper from '../helpers/token';

const tokenMiddleware = (req: Request, _res:Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    const error = new Error('Token must be a valid token');
    error.name = 'UnauthorizedError';
    return next(error);
  }
  const checkToken = TokenHelper.validate(authorization);
  if (!checkToken) {
    const error = new Error('Token must be a valid token');
    error.name = 'UnauthorizedError';
    return next(error);
  }
  next();
};

export default tokenMiddleware;
