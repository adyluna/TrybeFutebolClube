import IMatch from '../interfaces/match.interface';
import MatchesModel from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

export default class MatchesService {
  private _teamsAssociation = [{ model: Teams, as: 'teamHome', attributes: ['teamName'] },
    { model: Teams, as: 'teamAway', attributes: ['teamName'] }];

  findAll = async (): Promise<IMatch[]> => {
    const matches = await MatchesModel
      .findAll({ include: this._teamsAssociation });

    return matches;
  };

  findInProgressMatches = async (progress: string) => {
    const matches = await MatchesModel.findAll({
      where: { inProgress: progress === 'true' },
      include: this._teamsAssociation });

    return matches;
  };

  insertMatch = async (data: IMatch): Promise<IMatch> => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = data;
    const { dataValues } = await MatchesModel
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });

    return dataValues;
  };
}
