import 'dotenv/config';
import { sign } from 'jsonwebtoken';
import { IUser } from '../interfaces/userInterface';
import IJwt from '../interfaces/jwtInterface';

export default class Jwt implements IJwt {
  private _jwtSecret: string;

  constructor() {
    this._jwtSecret = process.env.JWT_SECRET as string;
  }

  createToken(data: IUser): string {
    const token = sign(data, this._jwtSecret);

    return token;
  }
}
