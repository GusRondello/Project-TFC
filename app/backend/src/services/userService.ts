import BcryptHelper from '../helpers/bcrypt';
import TokenHelper from '../helpers/token';
import ILogin from '../interfaces/login.interface';
import UserModel from '../models/userModel';

export default class UserService {
  constructor(private model: UserModel) {}

  public async login(login: ILogin): Promise<string> {
    const { email, password } = login;

    const result = await this.model.findOne(email);

    if (!result || !BcryptHelper.compare(result.password, password)) {
      const error = new Error('Incorrect email or password');
      error.name = 'ValidationError';
      throw error;
    }

    const token = TokenHelper.create(result.email);

    return token;
  }
}
