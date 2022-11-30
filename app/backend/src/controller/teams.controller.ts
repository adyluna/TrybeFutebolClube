import { Request, Response } from 'express';
import TeamsService from '../service/teams.service';

export default class TeamsController {
  constructor(private _teamService: TeamsService) { }

  findAll = async (_req: Request, res: Response): Promise<Response> => {
    const teams = await this._teamService.findAll();

    return res.status(200).json(teams);
  };

  findById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const numberId = Number(id);
    const { teamName } = await this._teamService.findById(id);

    return res.status(200).json({ id: numberId, teamName });
  };
}
