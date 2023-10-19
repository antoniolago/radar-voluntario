import dotenv from "dotenv";
import path from "path";
import https from "https";
import cors from "cors";
import fs from "fs";
import os from "os";
import bodyParser from "body-parser";
import 'express-async-errors'

import express, { NextFunction, Request, Response } from "express";

import { AppSettingsService } from "./services/app-settings.service";
import { AppSettingsController } from "./controllers/app-settings.controller";
import { UserController } from "./controllers/user.controller";
import { AccountsService } from "./services/accounts.service";
import { AccountsController } from "./controllers/accounts.controller";
import AppError from "./errors/app-error";
import { InstitutionsService } from "./services/institutions.service";
import { InstitutionsController } from "./controllers/institutions.controller";
import authMiddleware from "./middlewares/auth.middleware";

dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

const app = express();

app.use(cors());
app.use(bodyParser.json());

const appSettingsService = new AppSettingsService();
const appSettingsController = new AppSettingsController(appSettingsService);


const accountsService = new AccountsService();
const accountsController = new AccountsController(accountsService);
const userController = new UserController(accountsService);

const institutionsService = new InstitutionsService();
const institutionsController = new InstitutionsController(institutionsService);

app.post("/api/institutions", authMiddleware, institutionsController.save);
app.get("/api/institutions", institutionsController.index);
app.get("/api/institutions/me", authMiddleware, institutionsController.me);
app.get("/api/institutions/:id/addresses", authMiddleware, institutionsController.getAddresses);
app.post("/api/institutions/:id/addresses", authMiddleware, institutionsController.saveAddress);

app.get("/api/appSettings", appSettingsController.index);

app.get("/api/user", authMiddleware, userController.index);

app.post("/api/accounts/login", accountsController.login);
app.post("/api/accounts/login-google", accountsController.loginGoogle);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: err?.toString(),
  });
});

const PORT = process.env.BACKEND_PORT || 3333;

if (process.env.NODE_ENV === "development") {
  const home = os.homedir();

  const cert = fs.readFileSync(
    path.resolve(home, ".vite-plugin-mkcert", "cert.pem"),
    "utf-8"
  );
  const key = fs.readFileSync(
    path.resolve(home, ".vite-plugin-mkcert", "dev.pem"),
    "utf-8"
  );

  https.createServer({ key, cert }, app).listen(PORT, () => {
    console.log(`Server is runing on https://localhost:${PORT}`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`Server is runing on http://localhost:${PORT}`);
  });
}
