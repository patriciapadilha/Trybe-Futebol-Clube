import { Request, Response } from 'express';
import TokenGenerator from '../utils/tokenGenerator';
import LoginService from '../services/loginService';
import { JwtPayload } from 'jsonwebtoken';
import ILoginToken from '../interfaces/ILoginToken';

class LoginController {
  static async login(req: Request, res: Response) {
    const token = await LoginService.authentication(req.body);
    console.log(res.locals);
    console.log(res.locals.payload);
    res.status(200).json({ token });
  }

  static async loginValidate(req: Request, res: Response) {
    const token = req.headers.authorization;
    const payload = TokenGenerator.authenticateToken(token as string) as ILoginToken;
    console.log(payload);
    res.status(200).json({ role: payload.role });
  }
}

export default LoginController;
