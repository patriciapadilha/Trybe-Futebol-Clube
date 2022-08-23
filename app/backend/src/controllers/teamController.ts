import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/teamService';

class TeamController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await TeamService.getAllTeams();
      res.status(200).json(teams);
    } catch (e) {
      next(e);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const team = await TeamService.getTeamById(req.params.id);
      res.status(200).json(team);
    } catch (e) {
      next(e);
    }
  }
}

export default TeamController;
