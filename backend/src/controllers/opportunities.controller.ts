import { Request, Response } from "express";
import { OpportunitiesService } from "../services/opportunities.service";

export class OpportunitiesController {
  constructor(private opportunitiesService: OpportunitiesService) {}

  public index = async (request: Request, response: Response) => {
    const { id } = request.params;

    const opportunities = await this.opportunitiesService.index(id);

    return response.json(opportunities);
  };

  public get = async (request: Request, response: Response) => {
    const { id } = request.params;

    const opportunity = await this.opportunitiesService.get(id);

    return response.json(opportunity);
  };

  public getPublished = async (request: Request, response: Response) => {
    const { id } = request.params;

    const opportunity = await this.opportunitiesService.getPublished(id);

    return response.json(opportunity);
  };

  public getPublishedList = async (request: Request, response: Response) => {
    const { id } = request.params;

    const opportunity = await this.opportunitiesService.getPublishedList(id);

    return response.json(opportunity);
  };

  

  public save = async (request: Request, response: Response) => {
    const opportunity = await this.opportunitiesService.save(
      request.body,
      request.user.id
    );

    return response.status(201).json(opportunity);
  };

  public update = async (request: Request, response: Response) => {
    const { id } = request.params;

    const opportunity = await this.opportunitiesService.update(
      id,
      request.body,
      request.user.id
    );

    return response.status(200).json(opportunity);
  };

  public delete = async (request: Request, response: Response) => {
    const { id } = request.params;

    await this.opportunitiesService.delete(id, request.user.id);

    return response.status(204).send();
  };
}
