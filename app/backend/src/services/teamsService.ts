import ITeams from '../interfaces/teams.interface';
import TeamsModel from '../models/teamsModel';

export default class TeamsService {
  constructor(private model: TeamsModel) {}

  public async getAll(): Promise<ITeams[]> {
    const result = await this.model.getAll();
    return result;
  }
}
