import User from '../database/models/usersModel';
import IUser from '../interfaces/user.interface';

export default class UserModel {
  constructor(private model: typeof User) {}

  public async findOne(email:string): Promise<IUser> {
    const result = await this.model.findOne({ where: { email } });
    return result as IUser;
  }
}
