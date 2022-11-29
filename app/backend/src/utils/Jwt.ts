import 'dotenv/config';
import { sign, verify } from 'jsonwebtoken';
import { IUser } from '../interfaces/userInterface';
import IJwt from '../interfaces/jwtInterface';
import HttpException from './HttpException';

export default class Jwt implements IJwt {
  private _jwtSecret: string;

  constructor() {
    this._jwtSecret = process.env.JWT_SECRET as string;
  }

  createToken(data: IUser): string {
    const token = sign(data, this._jwtSecret);

    return token;
  }

  validateToken(token: string): string {
    try {
      const data = verify(token, this._jwtSecret) as IUser;
      return data.role as string;
    } catch (error) {
      throw new HttpException(401, 'Invalid Token');
    }
  }
}
