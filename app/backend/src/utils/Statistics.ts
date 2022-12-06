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

  constructor(private path: string, private teamMatches: IMatch[]) {
    const away = this.path.includes('away');
    if (away) {
      this.name = teamMatches[0].teamAway.teamName;
    } else {
      this.name = teamMatches[0].teamHome.teamName || teamMatches[0].teamAway.teamName;
    }
  }

  // Essa classe tem que receber o id do time para comparar com o teamMatch e decidir qual funcao usar, se home ou away
  // Tambem é preciso alterar as funcoes de home e away para que seja chamadas dentro de um map e nao o contrario

  calculateHomeTeamsStatistics() {
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

  calculateAwayTeamsStatistics() {
    this.teamMatches.map((element: IMatch) => {
      if (element.awayTeamGoals > element.homeTeamGoals) {
        this.totalPoints += 3;
        this.totalVictories += 1;
      }
      if (element.awayTeamGoals === element.homeTeamGoals) {
        this.totalPoints += 1;
        this.totalDraws += 1;
      }
      if (element.awayTeamGoals < element.homeTeamGoals) {
        this.totalLosses += 1;
      }
      this.totalGames += 1;
      this.goalsFavor += element.awayTeamGoals;
      this.goalsOwn += element.homeTeamGoals;
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
