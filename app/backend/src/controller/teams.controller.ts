import { Request, Response } from 'express';
import TeamsService from '../service/teams.service';

export default class TeamsController {
  constructor(private _teamService: TeamsService) { }

  findAll = async (_req: Request, res: Response): Promise<Response> => {
    const teams = await this._teamService.findAll();

    return res.status(200).json({ teams });
  };
}
