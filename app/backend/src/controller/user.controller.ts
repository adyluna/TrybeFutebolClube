import { Request, Response } from 'express';
import UserService from '../service/user.service';

export default class UserController {
  constructor(private _userService: UserService) { }

  login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const token = await this._userService.login(email, password);
    return res.status(200).json({ token });
  };
}
