import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardRoute = Router();

leaderboardRoute.get('/leaderboard/home', LeaderboardController.leaderboard);

leaderboardRoute.get('/leaderboard/away', LeaderboardController.leaderboard);

leaderboardRoute.get('/leaderboard', LeaderboardController.leaderboard);

export default leaderboardRoute;
