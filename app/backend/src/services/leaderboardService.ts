// import Team from '../database/models/Team';
// import Match from '../database/models/Match';
// import { ILeaderboard } from '../interfaces/ILeaderboard';
// import TeamService from './teamService';
// import GamePoints from '../utils/leardboardFunctions';

// export default class LeaderboardService {
//   static async sortLeaderboard(leaderboard: ILeaderboard[]) {
//     const result = leaderboard.sort((a: ILeaderboard, b: ILeaderboard) => {
//       if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
//       if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
//       if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
//       if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
//       if (a.goalsOwn !== b.goalsOwn) return b.goalsOwn - a.goalsOwn;

//       return 0;
//     });
//     return result;
//   }

//   static async findAllInProgress(inProgress: number) {
//     const matches = await Match.findAll({
//       include: [
//         { model: Team, as: 'teamHome', attributes: ['teamName'] },
//         { model: Team, as: 'teamAway', attributes: ['teamName'] },
//       ],
//       where: {
//         inProgress,
//       },
//     });
//     return matches;
//   }

//   static async getLeaderboard(path: string): Promise<ILeaderboard[]> {
//     const allMatches = await LeaderboardService.findAllInProgress(0);
//     const teams = await TeamService.getAllTeams();
//     const leaderboard = teams.map((team) => ({
//       name: team.teamName,
//       totalPoints: GamePoints.totalPoints(team.id as number, allMatches, path),
//       totalGames: GamePoints.totalGames(team.id as number, allMatches, path),
//       totalVictories: GamePoints.totalVictories(team.id as number, allMatches, path),
//       totalDraws: GamePoints.totalDraws(team.id as number, allMatches, path),
//       totalLosses: GamePoints.totalLosses(team.id as number, allMatches, path),
//       goalsFavor: GamePoints.goalsFavor(team.id as number, allMatches, path),
//       goalsOwn: GamePoints.goalsOwn(team.id as number, allMatches, path),
//       goalsBalance: GamePoints.goalsBalance(team.id as number, allMatches, path),
//       efficiency: GamePoints.efficiency(team.id as number, allMatches, path),
//     }));
//     const sortLeaderboard = this.sortLeaderboard(leaderboard);
//     return sortLeaderboard;
//   }
// }

import Sequelize from '../database/models';

const queryHome = `
SELECT
name,
(totalVictories * 3) + totalDraws AS totalPoints,
totalGames,
totalVictories,
totalDraws,
totalLosses,
goalsFavor,
goalsOwn,
goalsBalance,
ROUND(((totalVictories * 3) + totalDraws)/(totalGames * 3)*100, 2) AS efficiency
FROM(
  SELECT
team_name AS name,
count(*) AS totalGames,
sum(home_team_goals > away_team_goals) AS totalVictories,
sum(home_team_goals = away_team_goals) AS totalDraws,
sum(home_team_goals < away_team_goals) AS totalLosses,
sum(home_team_goals) AS goalsFavor,
sum(away_team_goals) AS goalsOwn,
sum(home_team_goals) - sum(away_team_goals) AS goalsBalance
FROM matches AS m
INNER JOIN teams AS t ON home_team = t.id
WHERE in_progress = 0
GROUP BY t.id
) AS q
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;
`;

const queryAway = `
SELECT
name,
(totalVictories * 3) + totalDraws AS totalPoints,
totalGames,
totalVictories,
totalDraws,
totalLosses,
goalsFavor,
goalsOwn,
goalsBalance,
ROUND(((totalVictories * 3) + totalDraws)/(totalGames * 3)*100, 2) AS efficiency
FROM(
  SELECT
  team_name AS name,
  count(*) AS totalGames,
  sum(away_team_goals > home_team_goals) AS totalVictories,
  sum(away_team_goals = home_team_goals) AS totalDraws,
  sum(away_team_goals < home_team_goals) AS totalLosses,
  sum(away_team_goals) AS goalsFavor,
  sum(home_team_goals) AS goalsOwn,
  sum(away_team_goals) - sum(home_team_goals) AS goalsBalance
  FROM matches AS m
  INNER JOIN teams AS t ON away_team = t.id
  WHERE in_progress = 0
  GROUP BY t.id
) AS q
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;
`;

class LeaderBoardService {
  static async homeTeams() {
    const [result] = await Sequelize.query(queryHome);
    return result;
  }

  static async awayTeams() {
    const [result] = await Sequelize.query(queryAway);
    return result;
  }
}

export default LeaderBoardService;
