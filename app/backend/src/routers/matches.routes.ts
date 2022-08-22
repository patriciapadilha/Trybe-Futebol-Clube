import { Request, Response, Router } from 'express';
import MatchController from '../controllers/matchController';

const matchesRouter = Router();

matchesRouter.get('/matches', (req: Request, res: Response) => {
  MatchController.getAll(req, res);
});

export default matchesRouter;
