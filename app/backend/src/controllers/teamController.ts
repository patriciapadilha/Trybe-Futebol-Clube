import { Request, Response } from 'express';
import TeamService from '../services/teamService';

class TeamController {
  static async getAll(req: Request, res: Response) {
    const teams = await TeamService.getAllTeams();
    res.status(200).json(teams);
  }

  static async getById(req: Request, res: Response) {
    const team = await TeamService.getTeamById(req.params.id);
    res.status(200).json(team);
  }
}

export default TeamController;
