import Teams from '../database/models/teamsModel';
import ITeams from '../interfaces/teams.interface';

export default class TeamsModel {
  constructor(private model: typeof Teams) {}

  public async getAll(): Promise<ITeams[]> {
    const result = await this.model.findAll();
    return result;
  }
}
