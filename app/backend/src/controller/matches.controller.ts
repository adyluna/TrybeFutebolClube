import { Request, Response } from 'express';
import Jwt from '../utils/Jwt';
import MatchesService from '../service/matches.service';

export default class MatchesController {
  constructor(private _matchesService: MatchesService, private _jwt: Jwt) {}

  findAll = async (req: Request, res: Response): Promise<Response> => {
    const { inProgress } = req.query;
    if (inProgress) {
      const matches = await this._matchesService.findInProgressMatches(inProgress as string);
      return res.status(200).json(matches);
    }
    const matches = await this._matchesService.findAll();

    return res.status(200).json(matches);
  };

  insertMatch = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;
    const insertedMatch = await this._matchesService.insertMatch(req.body);

    this._jwt.validateToken(authorization as string);

    return res.status(201).json(insertedMatch);
  };

  finishMatch = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const numberId = Number(id);
    await this._matchesService.finishMatch(numberId, req.path, req.body);

    return res.status(200).json({ message: 'Finished' });
  };

  leaderBoards = async (req: Request, res: Response): Promise<Response> => {
    const matches = await this._matchesService.leaderboard(req.path);

    return res.status(200).json(matches);
  };
}
