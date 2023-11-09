import { Request, Response } from "express";
import { RegistrationsService } from "../services/registrations.service";

export class RegistrationsController {
  constructor(private registrationsService: RegistrationsService) {}

  public index = (request: Request, response: Response) => {
  };

  public save = async (request: Request, response: Response) => {
    const opportunity = await this.registrationsService.save(
      request.body,
      request.user.id
    );

    return response.status(201).json(opportunity);
  };
}
