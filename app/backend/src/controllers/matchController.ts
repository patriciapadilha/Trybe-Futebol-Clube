import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await MatchService.getAllMatches();
      res.status(200).json(teams);
    } catch (e) {
      next(e);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newMatch = await MatchService.createMatch(req.body);
      res.status(201).json(newMatch);
    } catch (e) {
      next(e);
    }
  }

  static async updateFinish(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await MatchService.updateFinish(id);
      res.status(200).json({ message: 'Finished' });
    } catch (e) {
      next(e);
    }
  }

  static async updateMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await MatchService.updateMatch(id, req.body);
      res.status(200).json({ message: 'Updated' });
    } catch (e) {
      next(e);
    }
  }
}

export default MatchController;
