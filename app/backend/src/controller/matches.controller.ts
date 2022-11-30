import { Request, Response } from 'express';
import MatchesService from '../service/matches.service';

export default class MatchesController {
  constructor(private _matchesService: MatchesService) {}

  findAll = async (req: Request, res: Response): Promise<Response> => {
    const { inProgress } = req.query;
    if (inProgress) {
      const matches = await this._matchesService.findInProgressMatches(inProgress as string);
      return res.status(200).json(matches);
    }
    const matches = await this._matchesService.findAll();

    return res.status(200).json(matches);
  };
}
