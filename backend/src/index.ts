import dotenv from "dotenv";
import path from "path";
import https from "https";
import cors from "cors";
import fs from "fs";
import os from "os";
import bodyParser from "body-parser";
import "express-async-errors";

import express, { NextFunction, Request, Response } from "express";

import { AppSettingsService } from "./services/app-settings.service";
import { AppSettingsController } from "./controllers/app-settings.controller";
import { AccountsService } from "./services/accounts.service";
import { AccountsController } from "./controllers/accounts.controller";
import AppError from "./errors/app-error";
import { InstitutionsService } from "./services/institutions.service";
import { InstitutionsController } from "./controllers/institutions.controller";
import authMiddleware from "./middlewares/auth.middleware";
import { OpportunitiesService } from "./services/opportunities.service";
import { OpportunitiesController } from "./controllers/opportunities.controller";
import { RegistrationsService } from "./services/registrations.service";
import { RegistrationsController } from "./controllers/registrations.controller";
import { VolunteersController } from "./controllers/volunteers.controller";
import { VolunteersService } from "./services/volunteers.service";

dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

const app = express();

app.use(cors());
app.use(bodyParser.json());

const institutionsService = new InstitutionsService();
const institutionsController = new InstitutionsController(institutionsService);

app.get("/api/institutions/:id", institutionsController.get);
app.post("/api/institutions", authMiddleware, institutionsController.save);
app.put("/api/institutions/:id", authMiddleware, institutionsController.update);
app.get("/api/institutions", institutionsController.index);
app.get("/api/institutions/me", authMiddleware, institutionsController.me);
app.get(
  "/api/institutions/:id/addresses",
  authMiddleware,
  institutionsController.getAddresses
);
app.post(
  "/api/institutions/:id/addresses",
  authMiddleware,
  institutionsController.saveAddress
);

const opportunitiesService = new OpportunitiesService();
const opportunitiesController = new OpportunitiesController(
  opportunitiesService
);

app.get("/api/opportunity/:id?", opportunitiesController.get);
app.get("/api/opportunities/:id?", opportunitiesController.index);
app.post("/api/opportunities", authMiddleware, opportunitiesController.save);
app.put(
  "/api/opportunities/:id",
  authMiddleware,
  opportunitiesController.update
);
app.delete(
  "/api/opportunities/:id",
  authMiddleware,
  opportunitiesController.delete
);
app.get("/api/opportunity/published/:id?", opportunitiesController.getPublished);


const registrationsService = new RegistrationsService();
const registrationsController = new RegistrationsController(registrationsService);

app.post("/api/registrations", authMiddleware, registrationsController.save);
app.get("/api/registrations/:id", authMiddleware, registrationsController.index);
app.get("/api/registrations", authMiddleware, registrationsController.getOpportunities);
app.delete("/api/registrations/:id?", authMiddleware, registrationsController.delete);


const volunteersService = new VolunteersService();
const volunteersController = new VolunteersController(volunteersService);
app.get("/api/volunteers", authMiddleware, volunteersController.index);


const appSettingsService = new AppSettingsService();
const appSettingsController = new AppSettingsController(appSettingsService);

app.get("/api/appSettings", appSettingsController.index);

const accountsService = new AccountsService();
const accountsController = new AccountsController(accountsService);

app.get("/api/accounts", authMiddleware, accountsController.getAccount);
app.put("/api/accounts", authMiddleware, accountsController.updateAccount);
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
