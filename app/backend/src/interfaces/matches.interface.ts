export default interface IMatches {
  id?: number | string;
  homeTeam?: string;
  homeTeamGoals: number;
  awayTeam?: string;
  awayTeamGoals: number;
  inProgress?: boolean;
}
