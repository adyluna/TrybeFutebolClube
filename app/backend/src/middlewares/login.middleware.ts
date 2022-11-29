import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/HttpException';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new HttpException(400, 'All fields must be filled');
  }

  next();
};

export default validateLogin;
