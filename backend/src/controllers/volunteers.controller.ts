import { Request, Response } from "express";
import { VolunteersService } from "../services/volunteers.service";

export class VolunteersController {
  constructor(private volunteersService: VolunteersService) {}

  public index = async (request: Request, response: Response) => {
    const registrations = await this.volunteersService.index(request.user.id);
    return response.json(registrations);
  };

  public get = async (request: Request, response: Response) => {
    const { id } = request.params;

    const registrations = await this.volunteersService.get(id);
    return response.json(registrations);
  };


  public getOpportunities = async (request: Request, response: Response) => {
    const { id } = request.params;

    const registrations = await this.volunteersService.getOpportunities(id);
    return response.json(registrations);
  };

  public getByOpportunity = async (request: Request, response: Response) => {
    const { id } = request.params;

    const registrations = await this.volunteersService.getByOpportunity(id);
    return response.json(registrations);
  };
  
}
