import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { ILeaderboard } from '../interfaces/ILeaderboard';
import TeamService from './teamService';
import GamePoints from '../utils/leardboardFunctions';

export default class LeaderboardService {
  static async sortLeaderboard(leaderboard: ILeaderboard[]) {
    const result = leaderboard.sort((a: ILeaderboard, b: ILeaderboard) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      if (a.goalsOwn !== b.goalsOwn) return b.goalsOwn - a.goalsOwn;

      return 0;
    });
    return result;
  }

  static async findAllInProgressOrFinished(inProgress: number) {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
      where: {
        inProgress,
      },
    });
    return matches;
  }

  static async buildLeaderboard(path: string): Promise<ILeaderboard[]> {
    const allMatches = await LeaderboardService.findAllInProgressOrFinished(0);
    const allClubs = await TeamService.getAllTeams();
    const leaderboard = allClubs.map((team) => ({
      name: team.teamName,
      totalPoints: GamePoints.totalPoints(team.id as number, allMatches, path),
      totalGames: GamePoints.totalGames(team.id as number, allMatches, path),
      totalVictories: GamePoints.totalVictories(team.id as number, allMatches, path),
      totalDraws: GamePoints.totalDraws(team.id as number, allMatches, path),
      totalLosses: GamePoints.totalLosses(team.id as number, allMatches, path),
      goalsFavor: GamePoints.goalsFavor(team.id as number, allMatches, path),
      goalsOwn: GamePoints.goalsOwn(team.id as number, allMatches, path),
      goalsBalance: GamePoints.goalsBalance(team.id as number, allMatches, path),
      efficiency: GamePoints.efficiency(team.id as number, allMatches, path),
    }));
    const sortLeaderboard = this.sortLeaderboard(leaderboard);
    return sortLeaderboard;
  }
}
