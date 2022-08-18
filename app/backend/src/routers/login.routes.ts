import { Request, Response, Router } from 'express';
import LoginController from '../controllers/loginController';

const loginRouter = Router();

loginRouter.post('/login', (req: Request, res: Response) => LoginController.login(req, res));

export default loginRouter;
