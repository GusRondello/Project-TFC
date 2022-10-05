import { RequestHandler } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  constructor(private service: MatchesService) {}

  public getAll:RequestHandler = async (_req, res, next) => {
    try {
      const result = await this.service.getAll();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public create: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      const error = new Error('Token must be a valid token');
      error.name = 'UnauthorizedError';
      return next(error);
    }
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
      const newMatch = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals };
      const result = await this.service.create(newMatch);

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  public endMatch: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await this.service.endMatch(id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
