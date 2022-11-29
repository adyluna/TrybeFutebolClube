import { Router } from 'express';
import UserService from '../service/user.service';
import UserController from '../controller/user.controller';
import Jwt from '../utils/Jwt';
import validateLogin from '../middlewares/login.middleware';

const router = Router();

const jwt = new Jwt();
const userService = new UserService(jwt);
const userController = new UserController(userService);

router.post('/', validateLogin, (req, res) => userController.login(req, res));
router.get('/validate', userController.validateToken);

export default router;
