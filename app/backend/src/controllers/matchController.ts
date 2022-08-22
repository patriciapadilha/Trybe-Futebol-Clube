import { Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  static async getAll(req: Request, res: Response) {
    const teams = await MatchService.getAllMatches();
    res.status(200).json(teams);
  }
}

export default MatchController;
