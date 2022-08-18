import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

class LoginController {
  private loginService = new LoginService();

  // constructor() {
  //   this.authService = new AuthService();
  // }
  public async auth(req: Request, res: Response) {
    const token = await this.loginService.authentication(req.body);
    res.status(200).json(token);
  }
}

export default LoginController;
