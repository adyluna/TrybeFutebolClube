import { Router } from 'express';
import MatchesService from '../service/matches.service';
import MatchesController from '../controller/matches.controller';
import Jwt from '../utils/Jwt';

const jwt = new Jwt();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService, jwt);

const router = Router();

router.get('/home', matchesController.leaderBoards);
router.get('/away', matchesController.leaderBoards);
router.get('/', matchesController.leaderBoards);

export default router;
