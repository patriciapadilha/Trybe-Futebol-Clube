import { Router } from 'express';
import login from './login.routes';
import teams from './teams.routes';
import matches from './matches.routes';

const router = Router();

router.use(matches);
router.use(login);
router.use(teams);

export default router;
