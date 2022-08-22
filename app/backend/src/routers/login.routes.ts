import { NextFunction, Request, Response, Router } from 'express';
import LoginController from '../controllers/loginController';

const loginRouter = Router();

loginRouter.post(
  '/login',
  (req: Request, res: Response, next: NextFunction) => LoginController.login(req, res, next),
);
loginRouter.get('/login/validate', (req: Request, res: Response, next: NextFunction) => {
  LoginController.loginValidate(req, res, next);
});

export default loginRouter;
