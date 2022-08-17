import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class User extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING(50),
    allowNull: false,
    unique: true,
  },
  role: {
    type: STRING(100),
    allowNull: false,
  },
  email: {
    type: STRING(100),
    allowNull: false,
  },
  password: {
    type: STRING(100),
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'users',
  tableName: 'users',
  timestamps: false,
});

export default User;