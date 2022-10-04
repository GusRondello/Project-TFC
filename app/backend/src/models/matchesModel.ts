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
}
