import { Router } from 'express';
import MatchesService from '../service/matches.service';
import MatchesController from '../controller/matches.controller';

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

const router = Router();

router.get('/', matchesController.findAll);

export default router;
