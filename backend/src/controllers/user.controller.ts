import { Request, Response } from "express";
import { AccountsService } from "../services/accounts.service";

export class UserController {
  constructor(private accountsService: AccountsService) { }

  public index = (request: Request, response: Response) => {
    return response.json(this.accountsService.getUser(request.user.email));
  }
}
