import { compareSync } from 'bcryptjs';
import HttpException from '../utils/HttpException';
import UserModel from '../database/models/UserModel';
import Jwt from '../utils/Jwt';

export default class UserService {
  constructor(private _jwt: Jwt) { }

  login = async (email: string, password: string): Promise<string> => {
    const userInfo = await UserModel.findOne({ where: { email } });

    if (!userInfo || !compareSync(password, userInfo.password as string)) {
      throw new HttpException(401, 'Wrong username or password');
    }

    const token = this._jwt.createToken({
      username: userInfo.username,
      email: userInfo.email,
      role: userInfo.role as string,
    });
    return token;
  };
}