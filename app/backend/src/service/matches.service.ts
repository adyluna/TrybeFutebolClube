import IMatch from '../interfaces/match.interface';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import Statistics from '../utils/Statistics';

export default class MatchesService {
  private _teamsAssociation = [{ model: TeamsModel, as: 'teamHome', attributes: ['teamName'] },
    { model: TeamsModel, as: 'teamAway', attributes: ['teamName'] }];

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

  finishMatch = async (id: number, path: string, body: IMatch) => {
    if (path.includes('finish')) {
      const [finishedMatch] = await MatchesModel.update({ inProgress: false }, { where: { id } });
      return finishedMatch;
    }

    const { homeTeamGoals, awayTeamGoals } = body;
    const [editedLeaderboard] = await MatchesModel
      .update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return editedLeaderboard;
  };

  leaderboard = async () => {
    // const matches = await MatchesModel
    //   .findAll({
    //     where: { inProgress: false },
    //     include: this._teamsAssociation });

    const teams = await TeamsModel.findAll();
    const filteredMatches = await Promise.all(teams.map(async ({ id }) => {
      const teamMatches = await MatchesModel.findAll({
        where: { inProgress: false, homeTeam: id },
        include: this._teamsAssociation });

      return teamMatches;
    }));

    const result = filteredMatches
      .map((elem) => elem.map((teamMatches) => Statistics(teamMatches as unknown as IMatch[])));
    console.log(result);

    return filteredMatches;
  };
}
