import IMatch, { ICalcMatches } from '../interfaces/match.interface';

// Entrei

export default class Statistics {
  id: number;
  name: string;
  totalPoints = 0;
  totalGames = 0;
  totalVictories = 0;
  totalDraws = 0;
  totalLosses = 0;
  goalsFavor = 0;
  goalsOwn = 0;
  goalsBalance = 0;
  efficiency = '';

  constructor(private matches: ICalcMatches, private path: string) {
    this.id = matches.id;
    this.name = matches.teamName;
  }

  private homeCalc(match: IMatch) {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      this.totalPoints += 3;
      this.totalVictories += 1;
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      this.totalPoints += 1;
      this.totalDraws += 1;
    }
    if (match.homeTeamGoals < match.awayTeamGoals) {
      this.totalLosses += 1;
    }
    this.totalGames += 1;
    this.goalsFavor += match.homeTeamGoals;
    this.goalsOwn += match.awayTeamGoals;
    return true;
  }

  private awayCalc(match: IMatch) {
    if (match.awayTeamGoals > match.homeTeamGoals) {
      this.totalPoints += 3;
      this.totalVictories += 1;
    }
    if (match.awayTeamGoals === match.homeTeamGoals) {
      this.totalPoints += 1;
      this.totalDraws += 1;
    }
    if (match.awayTeamGoals < match.homeTeamGoals) {
      this.totalLosses += 1;
    }
    this.totalGames += 1;
    this.goalsFavor += match.awayTeamGoals;
    this.goalsOwn += match.homeTeamGoals;
    return true;
  }

  calculateHomeTeamsStatistics() {
    this.matches.teamMatches.map((match: IMatch) => this.homeCalc(match));
  }

  calculateAwayTeamsStatistics() {
    this.matches.teamMatches.map((match: IMatch) => this.awayCalc(match));
  }

  calculateStatistics() {
    this.matches.teamMatches.map((match: IMatch) => {
      if (match.homeTeam === this.id) {
        return this.homeCalc(match);
      } return this.awayCalc(match);
    });
  }

  result() {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.efficiency = (Math
      .round(((this.totalPoints / (this.totalGames * 3)) * 100) * 100) / 100).toFixed(2);
    return ({
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    });
  }
}
