import Team from '../database/models/Team';
import { ITeam } from '../interfaces/ITeam';

class TeamService {
  static async getAllTeams(): Promise<ITeam[]> {
    const teams = await Team.findAll();
    return teams;
  }
}

export default TeamService;
