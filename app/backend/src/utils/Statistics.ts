import IMatch from '../interfaces/match.interface';

export default class Statistics {
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

  constructor(private teamMatches: IMatch[]) {
    this.name = teamMatches[0].teamHome.teamName;
  }

  calculate() {
    this.teamMatches.map((element: IMatch) => {
      if (element.homeTeamGoals > element.awayTeamGoals) {
        this.totalPoints += 3;
        this.totalVictories += 1;
      }
      if (element.homeTeamGoals === element.awayTeamGoals) {
        this.totalPoints += 1;
        this.totalDraws += 1;
      }
      if (element.homeTeamGoals < element.awayTeamGoals) {
        this.totalLosses += 1;
      }
      this.totalGames += 1;
      this.goalsFavor += element.homeTeamGoals;
      this.goalsOwn += element.awayTeamGoals;
      return true;
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