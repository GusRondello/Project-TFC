import { Router } from 'express';
import UserController from '../controllers/userController';
import User from '../database/models/usersModel';
import authMiddleware from '../middlewares/authMiddleware';
import UserModel from '../models/userModel';
import UserService from '../services/userService';

const router = Router();

const userController = new UserController(new UserService(new UserModel(User)));

router.post('/', authMiddleware, userController.login);
router.get('/validate', userController.getRole);
export default router;
