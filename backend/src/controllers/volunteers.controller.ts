import { Request, Response } from "express";
import { VolunteersService } from "../services/volunteers.service";

export class VolunteersController {
  constructor(private volunteersService: VolunteersService) {}

  public index = async (request: Request, response: Response) => {

    const registrations = await this.volunteersService.index(request.user.id);

    return response.json(registrations);

  };

}
