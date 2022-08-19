import HttpException from '../utils/http.exceptions';
import Team from '../database/models/Team';
import { ITeam } from '../interfaces/ITeam';

class TeamService {
  static async getAllTeams(): Promise<ITeam[]> {
    const teams = await Team.findAll();
    return teams;
  }

  static async getTeamById(id: string): Promise<ITeam> {
    const team = await Team.findByPk(id);
    if (!team) {
      throw new HttpException(404, 'Team not found');
    }
    return team;
  }
}

export default TeamService;
