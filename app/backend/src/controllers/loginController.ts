import { NextFunction, Request, Response } from 'express';
import TokenGenerator from '../utils/tokenGenerator';
import LoginService from '../services/loginService';
import ILoginToken from '../interfaces/ILoginToken';

class LoginController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await LoginService.authentication(req.body);
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }

  static async loginValidate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      const payload = TokenGenerator.authenticateToken(token as string) as ILoginToken;
      res.status(200).json({ role: payload.role });
    } catch (err) {
      next(err);
    }
  }
}

export default LoginController;
