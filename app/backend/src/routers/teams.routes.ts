import { Request, Response, Router } from 'express';
import TeamController from '../controllers/teamController';
// import LoginController from '../controllers/loginController';

const teamsRouter = Router();

teamsRouter.get('/teams', (req: Request, res: Response) => {
  TeamController.getAll(req, res);
});
teamsRouter.get('/teams/:id', (req: Request, res: Response) => {
  TeamController.getById(req, res);
});

export default teamsRouter;
