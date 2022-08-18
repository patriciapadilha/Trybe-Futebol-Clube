import { Router } from 'express';
import login from './login.routes';

const router = Router();

router.use(login);

export default router;
