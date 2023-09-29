import { Request, Response } from "express";
import { InstitutionsService } from "../services/institutions.service";

export class InstitutionsController {
  constructor(private institutionsService: InstitutionsService) {}

  public index = async (request: Request, response: Response) => {
    const institutions = await this.institutionsService.index();

    return response.json(institutions);
  }

  public me = async (request: Request, response: Response) => {
    const institution = await this.institutionsService.me(request.user.id);

    return response.json(institution);
  }

  public save = async (request: Request, response: Response) => {
    const institution = await this.institutionsService.save(
      request.body,
      request.user.id
    );

    return response.status(201).json(institution);
  };
}
