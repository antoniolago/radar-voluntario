import { Request, Response } from "express";

export class UserController {

  public index = (request: Request, response: Response) => {
    return response.json({ ok: true });
  }
}
