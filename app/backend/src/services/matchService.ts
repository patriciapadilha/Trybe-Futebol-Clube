// import HttpException from '../utils/http.exceptions';
import { IMatch } from '../interfaces/IMatch';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

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
}

export default MatchService;
