import { NextFunction, Request, Response, Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import MatchController from '../controllers/matchController';

const matchesRouter = Router();

matchesRouter.patch('/matches/:id/finish', (req: Request, res: Response, next: NextFunction) => {
  MatchController.updateFinish(req, res, next);
});
matchesRouter.patch('/matches/:id', (req: Request, res: Response, next: NextFunction) => {
  MatchController.updateMatch(req, res, next);
});
matchesRouter.post(
  '/matches',
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    MatchController.create(req, res, next);
  },
);

matchesRouter.get('/matches', (req: Request, res: Response, next: NextFunction) => {
  MatchController.getAll(req, res, next);
});

export default matchesRouter;
