import { NextFunction, Request, Response, Router } from 'express';
import TeamController from '../controllers/teamController';
// import LoginController from '../controllers/loginController';

const teamsRouter = Router();

teamsRouter.get('/teams', (req: Request, res: Response, next: NextFunction) => {
  TeamController.getAll(req, res, next);
});
teamsRouter.get('/teams/:id', (req: Request, res: Response, next: NextFunction) => {
  TeamController.getById(req, res, next);
});

export default teamsRouter;
