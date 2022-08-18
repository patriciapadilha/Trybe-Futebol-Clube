import { Request, Response, Router } from 'express';
import LoginController from './controllers/loginController';

const routers = Router();

const loginController = new LoginController();

routers.post('/login', (req: Request, res: Response) => loginController.auth(req, res));

export default routers;
