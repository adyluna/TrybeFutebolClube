import { Request, Response } from 'express';
import UserService from '../service/user.service';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public findUser = async (req: Request, res: Response) => {
    const user = req.body;

    const userFound = this.userService.findUser(user.username);

    if ([userFound].length === 0) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }

    res.status(200).json({ userFound });
  };
}
