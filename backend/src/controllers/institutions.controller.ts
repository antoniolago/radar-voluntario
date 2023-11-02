import { Request, Response } from "express";
import { InstitutionsService } from "../services/institutions.service";

export class InstitutionsController {
  constructor(private institutionsService: InstitutionsService) {}

  public index = async (request: Request, response: Response) => {
    const institutions = await this.institutionsService.index();

    return response.json(institutions);
  };

  public me = async (request: Request, response: Response) => {
    const institution = await this.institutionsService.me(request.user.id);

    return response.json(institution);
  };

  public save = async (request: Request, response: Response) => {
    const institution = await this.institutionsService.save(
      request.body,
      request.user.id
    );

    return response.status(201).json(institution);
  };

  public update = async (request: Request, response: Response) => {
    const { id } = request.params;

    const institution = await this.institutionsService.update(id, request.body);

    return response.status(200).json(institution);
  };

  public getAddresses = async (request: Request, response: Response) => {
    const addresses = await this.institutionsService.getAddresses(
      request.params.id
    );

    return response.json(addresses);
  };

  public saveAddress = async (request: Request, response: Response) => {
    const address = await this.institutionsService.createAddress(
      request.params.id,
      request.body
    );

    return response.status(201).json(address);
  };
}
