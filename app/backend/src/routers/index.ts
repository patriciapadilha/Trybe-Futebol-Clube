import { Router } from 'express';
import login from './login.routes';
import teams from './teams.routes';

const router = Router();

router.use(login);
router.use(teams);

export default router;
