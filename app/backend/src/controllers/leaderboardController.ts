import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

class LeaderBoardController {
  static async leaderboardHome(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await LeaderboardService.homeTeams();
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  static async leaderboardAway(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await LeaderboardService.awayTeams();
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export default LeaderBoardController;
