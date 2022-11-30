import { Request, Response } from 'express';
import MatchesService from '../service/matches.service';

export default class MatchesController {
  constructor(private _matchesService: MatchesService) {}

  findAll = async (_req: Request, res: Response): Promise<Response> => {
    const matches = await this._matchesService.findAll();

    return res.status(200).json(matches);
  };
}
