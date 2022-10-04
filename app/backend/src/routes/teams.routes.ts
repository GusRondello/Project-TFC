import { Router } from 'express';
import TeamsController from '../controllers/teamsController';
import Teams from '../database/models/teamsModel';
import TeamsModel from '../models/teamsModel';
import TeamsService from '../services/teamsService';

const router = Router();

const teamsController = new TeamsController(new TeamsService(new TeamsModel(Teams)));

router.get('/', teamsController.getAll);
router.get('/:id', teamsController.findById);
export default router;
