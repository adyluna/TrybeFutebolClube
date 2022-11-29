import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/HttpException';

const httpErrorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response => {
  const { status, message } = err as HttpException;
  return res.status(status || 500).json({ message });
};

export default httpErrorMiddleware;
