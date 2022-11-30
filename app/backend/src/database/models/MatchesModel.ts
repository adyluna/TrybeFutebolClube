import { Model, INTEGER, BOOLEAN } from 'sequelize';
import TeamsModel from './TeamsModel';
import db from '.';

class Matches extends Model {
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamsGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    type: INTEGER,
  },
  homeTeamGoals: {
    type: INTEGER,
  },
  awayTeam: {
    type: INTEGER,
  },
  awayTeamsGoals: {
    type: INTEGER,
  },
  inProgress: {
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(TeamsModel, { foreignKey: 'homeTeam', as: 'teams' });
Matches.belongsTo(TeamsModel, { foreignKey: 'awayTeam', as: 'teams' });

TeamsModel.hasMany(Matches, { foreignKey: 'homeTeam', as: 'matches' });
TeamsModel.hasMany(Matches, { foreignKey: 'awayTeam', as: 'matches' });

export default Matches;
