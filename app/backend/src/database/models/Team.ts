import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import { ITeam } from '../../interfaces/ITeam';

class Team extends Model implements ITeam {
  id: number;
  teamName: string;
}

Team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(100),
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  modelName: 'teams',
  tableName: 'teams',
  timestamps: false,
});

export default Team;
