import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  static async leaderboard(req: Request, res: Response, next: NextFunction) {
    try {
      const pathHome = req.path.includes('home');
      const pathAway = req.path.includes('away');
      if (pathHome) {
        const result = await LeaderboardService.getLeaderboard('home');
        return res.status(200).json(result);
      }
      if (pathAway) {
        const result = await LeaderboardService.getLeaderboard('away');
        return res.status(200).json(result);
      }
      const result = await LeaderboardService.getLeaderboard('homeAndAway');
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}
