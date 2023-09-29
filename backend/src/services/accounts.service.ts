import { OAuth2Client } from "google-auth-library";
import jsonwebtoken from "jsonwebtoken";

import { prisma } from "../database/prisma";
import AppError from "../errors/app-error";

export class AccountsService {

  /**
   * Método sem necessidade de senha apenas para testes
   */
  public async login(email: string) {
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const token = jsonwebtoken.sign(
      { id: user.id, email: user.email },
      process.env.BACKEND_JWT_SECRET as string,
      { expiresIn: "14 days" }
    );

    return { user, token };
  }

  public async loginWithGoogle(credential: string) {
    const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email) {
      throw new Error("Invalid credential");
    }

    let user = await prisma.user.findUnique({
      where: { email: payload?.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: payload?.name as string,
          email: payload?.email,
        },
      });
    }

    const token = jsonwebtoken.sign(
      { id: user.id, email: user.email },
      process.env.BACKEND_JWT_SECRET as string,
      { expiresIn: "14 days" }
    );

    return { user, token };
  }
}
