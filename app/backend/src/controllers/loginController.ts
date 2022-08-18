import { Request, Response } from 'express';
import LoginService from '../services/loginService';

class LoginController {
  static async login(req: Request, res: Response) {
    const token = await LoginService.authentication(req.body);
    res.status(200).json(token);
  }
}

export default LoginController;
