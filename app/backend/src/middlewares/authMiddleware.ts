import { NextFunction, Request, Response } from 'express';

const authMiddleware = (req:Request, _res:Response, next:NextFunction) => {
  const emailRegex = /\S+@\S+\.\S+/;
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error('All fields must be filled');
    error.name = 'ValidationError';
    throw error;
  }

  if (!emailRegex.test(email) || password.length <= 6) {
    const error = new Error('Incorrect email or password');
    error.name = 'ConflictError';
    throw error;
  }
  next();
};

export default authMiddleware;
