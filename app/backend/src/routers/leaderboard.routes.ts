import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardRoute = Router();

leaderboardRoute.get('/leaderboard/home', LeaderboardController.leaderboardHome);

leaderboardRoute.get('/leaderboard/away', LeaderboardController.leaderboardAway);

// leaderboardRoute.get('/leaderboard', LeaderboardController.leaderboard);

export default leaderboardRoute;
