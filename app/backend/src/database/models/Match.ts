import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import { IMatch } from '../../interfaces/IMatch';
import Team from './Team';

class Match extends Model implements IMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  modelName: 'matches',
  tableName: 'matches',
  timestamps: false,
});

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });

Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'teamAway' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
