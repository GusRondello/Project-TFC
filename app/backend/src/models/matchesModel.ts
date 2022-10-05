import Matches from '../database/models/matchesModel';
import Teams from '../database/models/teamsModel';
import ICurrentMatch from '../interfaces/currentMatch.interface';
import IMatches from '../interfaces/matches.interface';

export default class MatchesModel {
  constructor(private model: typeof Matches) {}

  public async getAll(): Promise<IMatches[]> {
    const result = await this.model.findAll({
      include: [
        { model: Teams,
          as: 'teamHome',
          attributes: { exclude: ['id'] } },
        { model: Teams,
          as: 'teamAway',
          attributes: { exclude: ['id'] } },
      ] });
    return result;
  }

  public async create(match: IMatches): Promise<IMatches> {
    if (match.homeTeam === match.awayTeam) {
      const error = new Error('It is not possible to create a match with two equal teams');
      error.name = 'UnauthorizedError';
      throw error;
    }
    const getHomeTeam = await this.model.findByPk(match.homeTeam);
    const getAwayTeam = await this.model.findByPk(match.awayTeam);

    if (!getHomeTeam || !getAwayTeam) {
      const error = new Error('There is no team with such id!');
      error.name = 'NotFoundError';
      throw error;
    }

    const result = await this.model.create({ ...match, inProgress: true });
    return result;
  }

  public async endMatch(id: string): Promise<string> {
    await this.model.update({ inProgress: false }, { where: { id } });
    return 'Fineshed';
  }

  public async updateMatch(match: IMatches): Promise<string> {
    const { id, homeTeamGoals, awayTeamGoals } = match;
    await this.model.update({ inProgress: true, homeTeamGoals, awayTeamGoals }, { where: { id } });
    return 'Updated!';
  }

  public async getAllHome(): Promise<ICurrentMatch[]> {
    const result = await this.model.findAll({
      where: { inProgress: false },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      ],
    });

    const homeMatches = result.map(MatchesModel.getHomeMatch);
    return homeMatches;
  }

  public async getAllAway(): Promise<ICurrentMatch[]> {
    const result = await this.model.findAll({
      where: { inProgress: false },
      include: [
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    const homeMatches = result.map(MatchesModel.getAwayMatch);
    return homeMatches;
  }

  private static getHomeMatch = (match: IMatches) => ({
    currTeamName: match.teamHome?.teamName,
    currTeamGoals: match.homeTeamGoals,
    oppoTeamGoals: match.awayTeamGoals,
  });

  private static getAwayMatch = (match: IMatches) => ({
    currTeamName: match.teamAway?.teamName,
    currTeamGoals: match.awayTeamGoals,
    oppoTeamGoals: match.homeTeamGoals,
  });
}
