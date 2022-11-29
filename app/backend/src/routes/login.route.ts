import { Router } from 'express';
import UserService from '../service/user.service';
import UserController from '../controller/user.controller';
import Jwt from '../utils/Jwt';

const router = Router();

const jwt = new Jwt();
const userService = new UserService(jwt);
const userController = new UserController(userService);

router.post('/', userController.login);

export default router;
