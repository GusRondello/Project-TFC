import { RequestHandler } from 'express';
import TokenHelper from '../helpers/token';
import UserService from '../services/userService';

export default class UserController {
  constructor(private service: UserService) {}

  public login:RequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const token = await this.service.login({ email, password });

      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  public getRole: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      const error = new Error('Invalid user');
      error.name = 'UnauthorizedError';
      return next(error);
    }
    try {
      const email = TokenHelper.validate(authorization);
      const role = await this.service.getRole(email);
      return res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  };
}
