import { Request, Response } from "express";
import { AccountsService } from "../services/accounts.service";

export class AccountsController {

  constructor(private accountsService: AccountsService) { }

  public login = async (request: Request, response: Response) => {
    const { email } = request.body;

    const auth = await this.accountsService.login(email)

    return response.json(auth);
  }

  public loginGoogle = async (request: Request, response: Response) => {
    const { credential } = request.body;

    const auth = await this.accountsService.loginWithGoogle(credential)

    return response.json(auth);
  }
  public getAccount = async (request: Request, response: Response) => {
    const user = await this.accountsService.getUser(request.user.email);
    return response.json(user);
  }

}