import IMatches from '../interfaces/matches.interface';
import MatchesModel from '../models/matchesModel';

export default class MatchesService {
  constructor(private model: MatchesModel) {}

  public async getAll(): Promise<IMatches[]> {
    const result = await this.model.getAll();
    return result;
  }

  public async create(match: IMatches): Promise<IMatches> {
    const result = await this.model.create(match);
    return result;
  }
}
