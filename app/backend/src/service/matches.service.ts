import { Op } from 'sequelize';
import IMatch, { IMatchStatistics } from '../interfaces/match.interface';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import Statistics from '../utils/Statistics';

export default class MatchesService {
  private _teamsAssociation = [{ model: TeamsModel, as: 'teamHome', attributes: ['teamName'] },
    { model: TeamsModel, as: 'teamAway', attributes: ['teamName'] }];

  findAll = async (): Promise<MatchesModel[]> => {
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

  private sortResult = (result: IMatchStatistics[]) => {
    result.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.goalsBalance === b.goalsBalance) {
          if (a.goalsFavor === b.goalsFavor) {
            return b.goalsOwn - a.goalsOwn;
          }
          return b.goalsFavor - a.goalsFavor;
        }
        return b.goalsBalance - a.goalsBalance;
      }
      return b.totalPoints - a.totalPoints;
    });
  };

  private filterTeamsMatches = async (path: string) => {
    const home = path.includes('home');
    const teams = await TeamsModel.findAll();
    const filteredMatches = await Promise.all(teams.map(async ({ id }) => {
      const teamMatches = await MatchesModel.findAll({
        where: home ? { inProgress: false, homeTeam: id } : { inProgress: false, awayTeam: id },
        include: this._teamsAssociation });

      return teamMatches;
    }));
    return filteredMatches;
  };

  private teamsMatches = async () => {
    const teams = await TeamsModel.findAll();
    const filteredMatches = await Promise.all(teams.map(async ({ id }) => {
      const teamMatches = await MatchesModel.findAll({
        where: { inProgress: false,
          [Op.or]: [
            { homeTeam: id },
            { awayTeam: id },
          ] },
        include: this._teamsAssociation });
      return teamMatches;
    }));

    return filteredMatches;
  };

  private calculateStatistcs = (filteredMatches: MatchesModel[][], path: string) => {
    const away = path.includes('away');
    const result = filteredMatches
      .map((teamMatches) => {
        const teamMatchesService = new Statistics(path, teamMatches as unknown as IMatch[]);
        if (away) {
          teamMatchesService.calculateAwayTeamsStatistics();
        } else {
          teamMatchesService.calculateHomeTeamsStatistics();
        }
        return teamMatchesService.result();
      });

    return result;
  };

  leaderboard = async (path: string) => {
    const away = path.includes('away');
    const home = path.includes('home');
    const filteredMatches = away || home
      ? await this.filterTeamsMatches(path) : await this.teamsMatches();

    const result = this.calculateStatistcs(filteredMatches, path);

    this.sortResult(result);

    return result;
  };
}
