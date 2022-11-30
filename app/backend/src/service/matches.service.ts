import IMatch from '../interfaces/match.interface';
import MatchesModel from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

export default class MatchesService {
  findAll = async (): Promise<IMatch[]> => {
    const matches = await MatchesModel
      .findAll({ include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ] });

    return matches;
  };
}
