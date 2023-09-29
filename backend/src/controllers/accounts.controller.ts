import { Request, Response } from "express";
import { AccountsService } from "../services/accounts.service";

export class AccountsController {

  constructor(private accountsService: AccountsService) { }

  public loginGoogle = async (request: Request, response: Response) => {
    const { credential } = request.body;

    const auth = await this.accountsService.loginWithGoogle(credential)

    return response.json(auth);
  }

}