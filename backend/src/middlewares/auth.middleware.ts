import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../errors/app-error";

interface ITokenPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, process.env.BACKEND_JWT_SECRET as string);

    const { id } = decoded as ITokenPayload;

    request.user = {
      id: id,
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT token", 401);
  }
}
