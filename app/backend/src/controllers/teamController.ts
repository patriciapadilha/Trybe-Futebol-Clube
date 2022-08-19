import { Request, Response } from 'express';
import TeamService from '../services/teamService';

class TeamController {
  static async getAll(req: Request, res: Response) {
    const teams = await TeamService.getAllTeams();
    res.status(200).json(teams);
  }
}

export default TeamController;
