import { ITeam } from '../interfaces/team.interface';
import TeamsModel from '../database/models/TeamsModel';
import HttpException from '../utils/HttpException';

export default class TeamsService {
  findAll = async (): Promise<ITeam[]> => {
    const teams = await TeamsModel.findAll();

    return teams;
  };

  findById = async (id: string): Promise<ITeam> => {
    const team = await TeamsModel.findByPk(id);

    if (!team) {
      throw new HttpException(401, 'Invalid Team');
    }

    return team;
  };
}
