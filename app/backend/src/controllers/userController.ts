import { RequestHandler } from 'express';
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
}
