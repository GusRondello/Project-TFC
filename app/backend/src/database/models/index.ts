import { Sequelize } from 'sequelize';
import * as config from '../config/database';
import Matches from './matchesModel';
import Teams from './teamsModel';
import User from './usersModel';

export default new Sequelize(config);
export { User, Matches, Teams };
