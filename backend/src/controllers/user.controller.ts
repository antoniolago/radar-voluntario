import { Request, Response } from "express";
import { AccountsService } from "../services/accounts.service";

export class UserController {
  constructor(private accountsService: AccountsService) { }

  public index = async (request: Request, response: Response) => {
    const user = await this.accountsService.getUser(request.user.email);
    
    return response.json(json);
  }
}
