import { Router } from 'express';
import TeamsService from '../service/teams.service';
import TeamsController from '../controller/teams.controller';

const router = Router();

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

router.get('/', teamsController.findAll);
router.get('/:id', teamsController.findById);

export default router;
