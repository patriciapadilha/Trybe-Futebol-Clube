import { error } from 'console';
import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await MatchService.getAllMatches();
      res.status(200).json(teams);
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newMatch = await MatchService.createMatch(req.body);
      res.status(201).json(newMatch);
    } catch (err) {
      next(error);
    }
  }

  static async updateFinish(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await MatchService.updateMatch(id, { inProgress: false });
      res.status(200).json({ message: 'Finished' });
    } catch (err) {
      next(err);
    }
  }

  static async updateMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await MatchService.updateMatch(id, req.body);
      res.status(200).json({ message: 'Updated' });
    } catch (err) {
      next(err);
    }
  }
}

export default MatchController;
