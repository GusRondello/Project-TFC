import { BOOLEAN, INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import Teams from './teamsModel';

class Matches extends Model {
  id!: number;
  homeTeam!: string;
  homeTeamGoals!: number;
  awayTeam!: string;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: STRING(255),
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: true,
  },
  awayTeam: {
    type: STRING(255),
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: true,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  tableName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Matches;
