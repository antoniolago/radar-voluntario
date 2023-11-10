import { Request, Response } from "express";
import { RegistrationsService } from "../services/registrations.service";

export class RegistrationsController {
  constructor(private registrationsService: RegistrationsService) {}

  public index = async (request: Request, response: Response) => {
    const { id } = request.params;

    const registrations = await this.registrationsService.index(request.user.id, id);

    return response.json(registrations);

  };

  public getOpportunities = async (request: Request, response: Response) => {

    const opportunities = await this.registrationsService.getOpportunities(request.user.id);

    return response.json(opportunities);

  };
  
  public save = async (request: Request, response: Response) => {
    const opportunity = await this.registrationsService.save(
      request.body,
      request.user.id
    );

    return response.status(201).json(opportunity);
  };

  public delete = async (request: Request, response: Response) => {
    const { id } = request.params;

    const deletedRegistration = await this.registrationsService.delete(id, request.user.id);

    return response.status(200).json(deletedRegistration);
  };
}
