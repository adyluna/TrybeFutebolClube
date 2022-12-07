export default interface IMatch {
  id?: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress?: boolean;
  teamHome: {
    teamName: string;
  },
  teamAway: {
    teamName: string;
  },
}

export interface IMatchTeamName {
  teamName: string;
}

export interface ICalcMatches {
  id: number;
  teamName: string;
  teamMatches: IMatch[];
}

export interface IMatchStatistics {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}
