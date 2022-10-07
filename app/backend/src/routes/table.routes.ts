import { Router } from 'express';
import BoardController from '../controllers/tableController';
import Matches from '../database/models/matchesModel';
import Teams from '../database/models/teamsModel';
import MatchesModel from '../models/matchesModel';
import TeamsModel from '../models/teamsModel';
import BoardService from '../services/tableService';

const router = Router();

const boardController = new BoardController(new BoardService(
  new TeamsModel(Teams),
  new MatchesModel(Matches),
));

router.get('/home', boardController.getAllHome);
router.get('/away', boardController.getAllAway);

export default router;
