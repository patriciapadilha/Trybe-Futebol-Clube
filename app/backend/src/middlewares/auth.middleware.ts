import { NextFunction, Request, Response } from 'express';
import TokenGenerator from '../utils/tokenGenerator';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization || '';
    TokenGenerator.authenticateToken(token);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default authMiddleware;
