import { ITeam } from '../interfaces/team.interface';
import TeamsModel from '../database/models/TeamsModel';

export default class TeamsService {
  findAll = async (): Promise<ITeam[]> => {
    const teams = await TeamsModel.findAll();

    return teams;
  };
}
