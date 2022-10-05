import Matches from '../database/models/matchesModel';
import Teams from '../database/models/teamsModel';
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
}
