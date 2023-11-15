import { Request, Response } from "express";
import { AppSettingsService } from "../services/app-settings.service";

export class AppSettingsController {
  constructor(private appSettingsService: AppSettingsService) {}

  public index = (request: Request, response: Response) => {
    const settings = this.appSettingsService.getSettings();

    return response.json(settings);
  };
}
