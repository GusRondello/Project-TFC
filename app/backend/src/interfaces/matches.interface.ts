import ITeams from './teams.interface';

export default interface IMatches {
  id?: number | string;
  homeTeam?: number | string;
  homeTeamGoals: number;
  awayTeam?: number | string;
  awayTeamGoals: number;
  inProgress?: boolean;
  teamHome?: ITeams;
  teamAway?: ITeams;
}
