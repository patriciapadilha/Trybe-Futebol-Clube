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

    await TeamService.getTeamById(matchInfos.homeTeam);
    await TeamService.getTeamById(matchInfos.awayTeam);

    const match = await Match.create({ ...matchInfos, inProgress: true });
    return match;
  }

  static async updateFinish(id: string) {
    await Match.update({ inProgress: false }, { where: { id } });
  }

  static async updateMatch(id: string, matchinfos: IMatch) {
    await Match.update({ ...matchinfos }, { where: { id } });
  }
}

export default MatchService;
