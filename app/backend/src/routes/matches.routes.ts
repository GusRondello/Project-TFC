import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import Matches from '../database/models/matchesModel';
import MatchesModel from '../models/matchesModel';
import MatchesService from '../services/matchesService';

const matchesController = new MatchesController(new MatchesService(new MatchesModel(Matches)));
const router = Router();

router.get('/', matchesController.getAll);
router.post('/', matchesController.create);

export default router;
