import ICurrentMatch from '../interfaces/currentMatch.interface';
import IBoard from '../interfaces/table.interface';
import ITeams from '../interfaces/teams.interface';
import MatchesModel from '../models/matchesModel';
import TeamsModel from '../models/teamsModel';

export default class BoardService {
  constructor(private teamModel: TeamsModel, private matchesModel: MatchesModel) {}

  public async getAllHome() : Promise<IBoard[]> {
    const matches = await this.matchesModel.getAllHome();

    const teams = await this.teamModel.getAll();
    const newBoard = teams.filter((team) => matches
      .some((match) => match.currTeamName === team.teamName))
      .map(BoardService.createTeamBoard);

    const leaderboard = BoardService.createLeaderboard(newBoard, matches);
    const sortedBoard = BoardService.sortLeaderboard(leaderboard);
    return sortedBoard;
  }

  public async getAllAway() : Promise<IBoard[]> {
    const matches = await this.matchesModel.getAllAway();

    const teams = await this.teamModel.getAll();
    const newBoard = teams.filter((team) => matches
      .some((match) => match.currTeamName === team.teamName))
      .map(BoardService.createTeamBoard);

    const leaderboard = BoardService.createLeaderboard(newBoard, matches);
    const sortedBoard = BoardService.sortLeaderboard(leaderboard);
    return sortedBoard;
  }

  public async getAll(): Promise<IBoard[]> {
    const homeMatches = await this.matchesModel.getAllHome();
    const awayMatches = await this.matchesModel.getAllAway();
    const teams = await this.teamModel.getAll();
    const boardTeams = teams.map(BoardService.createTeamBoard);

    const homeBoard = BoardService.createLeaderboard(boardTeams, homeMatches);
    const leaderboard = BoardService.createLeaderboard(homeBoard, awayMatches);
    const sortedBoard = BoardService.sortLeaderboard(leaderboard);
    return sortedBoard;
  }

  private static createTeamBoard = (team: ITeams) => ({
    name: team.teamName,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '',
  });

  private static calcGoals = (acc: IBoard, match: ICurrentMatch) => {
    const goalsFavor = acc.goalsFavor + match.currTeamGoals;
    const goalsOwn = acc.goalsOwn + match.oppoTeamGoals;
    const goalsBalance = goalsFavor - goalsOwn;
    return { goalsFavor, goalsOwn, goalsBalance };
  } ;

  private static calcTotals = (acc: IBoard, match: ICurrentMatch) => {
    const totalGames = Number(acc.totalGames) + 1;
    const totalDraws = acc.totalDraws + Number(match.currTeamGoals === match.oppoTeamGoals);
    const totalVictories = acc.totalVictories + Number(match.currTeamGoals > match.oppoTeamGoals);
    const totalLosses = acc.totalLosses + Number(match.currTeamGoals < match.oppoTeamGoals);
    const totalPoints = totalVictories * 3 + totalDraws;
    return { totalGames, totalDraws, totalVictories, totalLosses, totalPoints };
  };

  private static createLeaderboard(teams: IBoard[], matches: ICurrentMatch[]): IBoard[] {
    const leaderboard = teams.map((team) => matches.reduce((acc, match) => {
      if (match.currTeamName === team.name) {
        return BoardService.calcTeamBoard(acc, match);
      }
      return acc;
    }, { ...team }));
    return leaderboard;
  }

  private static calcTeamBoard = (acc: IBoard, match: ICurrentMatch) => {
    const { goalsFavor, goalsOwn, goalsBalance } = BoardService.calcGoals(acc, match);
    const { totalGames, totalDraws, totalVictories,
      totalLosses, totalPoints } = BoardService.calcTotals(acc, match);

    const calcEfficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    const efficiency = String(calcEfficiency);
    return {
      ...acc,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency,
    };
  };

  private static sortLeaderboard = (board: IBoard[]): IBoard[] => {
    board.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);

    return board;
  };
}
