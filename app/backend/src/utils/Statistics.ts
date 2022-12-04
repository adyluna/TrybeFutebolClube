import IMatch from '../interfaces/match.interface';

const Statistics = (teamMatches: IMatch[]) => {
  let totalPoints = 0;
  let totalGames = 0;
  let totalVictories = 0;
  let totalDraws = 0;
  let totalLosses = 0;
  let goalsFavor = 0;
  let goalsOwn = 0;
  let goalsBalance = 0;
  let efficiency = 0;

  teamMatches.forEach((element: IMatch) => {
    if (element.homeTeamGoals as number > element.awayTeamGoals as number) {
      totalPoints += 3;
      totalVictories += 1;
    }
    if (element.homeTeamGoals as number === element.awayTeamGoals as number) {
      totalPoints += 1;
      totalDraws += 1;
    }
    if (element.homeTeamGoals as number < element.awayTeamGoals as number) {
      totalLosses += 1;
    }
    totalGames += 1;
    goalsFavor += element.homeTeamGoals as number;
    goalsOwn += element.awayTeamGoals as number;
  });
  goalsBalance = goalsFavor - goalsOwn;
  efficiency = (totalPoints / (totalGames * 3)) * 100;

  return {
    name: teamMatches[0].teamHome.teamName as string,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance,
    efficiency,
  }
};

export default Statistics;
