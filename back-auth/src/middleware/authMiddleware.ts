import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer')) {
    const token = auth.slice(7);

    try {
      const tokenData = verifyToken(token, "token");
      req.body.tokenData = tokenData;
      next();
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error('Authentication error');
  }
};