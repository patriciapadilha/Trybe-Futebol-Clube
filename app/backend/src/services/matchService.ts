import HttpException from '../utils/http.exceptions';
import { IMatch } from '../interfaces/IMatch';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import TeamService from './teamService';

class MatchService {
  static async getAllMatches(): Promise<IMatch[]> {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  static async createMatch(matchInfos: IMatch): Promise<IMatch> {
    if (matchInfos.homeTeam === matchInfos.awayTeam) {
      throw new HttpException(401, 'It is not possible to create a match with two equal teams');
    }

    const homeTeam = TeamService.getTeamById(matchInfos.homeTeam);
    const awayTeam = TeamService.getTeamById(matchInfos.awayTeam);

    if (!homeTeam || !awayTeam) {
      throw new HttpException(404, 'There is no team with such id!');
    }

    const match = await Match.create({ ...matchInfos, inProgress: true });
    return match;
  }

  static async updateMatch(id: string, matchInfos: IMatch) {
    await Match.update(matchInfos, { where: { id } });
  }
}

export default MatchService;
