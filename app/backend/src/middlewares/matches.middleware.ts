import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/HttpException';
import TeamsService from '../service/teams.service';

const validateMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    throw new HttpException(422, 'It is not possible to create a match with two equal teams');
  }
  const teamService = new TeamsService();
  await teamService.findById(homeTeam);
  await teamService.findById(awayTeam);

  next();
};

export default validateMatch;
