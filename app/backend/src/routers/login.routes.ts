import { Request, Response, Router } from 'express';
import LoginController from '../controllers/loginController';
// import LoginService from 'src/services/loginService';

const loginRouter = Router();

// const loginController = new LoginController();

loginRouter.post('/login', (req: Request, res: Response) => LoginController.login(req, res));

export default loginRouter;
