import { RequestHandler } from 'express';
import BoardService from '../services/tableService';

export default class BoardController {
  constructor(private service: BoardService) {}

  public getAllHome:RequestHandler = async (_req, res, next) => {
    try {
      const result = await this.service.getAllHome();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public getAllAway:RequestHandler = async (_req, res, next) => {
    try {
      const result = await this.service.getAllAway();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public getAll:RequestHandler = async (_req, res, next) => {
    try {
      const result = await this.service.getAll();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
