import { RequestHandler } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  constructor(private service: TeamsService) {}

  public getAll:RequestHandler = async (_req, res, next) => {
    try {
      const result = await this.service.getAll();
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };

  public findById:RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await this.service.findById(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };
}
