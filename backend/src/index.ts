import dotenv from "dotenv";
import path from "path";
import https from "https";
import cors from "cors";
import fs from "fs";
import os from "os";
import bodyParser from "body-parser";

import express from "express";

import { AppSettingsService } from "./services/app-settings.service";
import { AppSettingsController } from "./controllers/app-settings.controller";
import { UserController } from "./controllers/user.controller";
import { AccountsService } from "./services/accounts.service";
import { AccountsController } from "./controllers/accounts.controller";

dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

const app = express();

app.use(cors());
app.use(bodyParser.json());

const appSettingsService = new AppSettingsService();
const appSettingsController = new AppSettingsController(appSettingsService);

const userController = new UserController();

const accountsService = new AccountsService();
const accountsController = new AccountsController(accountsService);

app.get("/api/appSettings", appSettingsController.index);

app.get("/api/user", userController.index);

app.post("/api/accounts/login-google", accountsController.loginGoogle);

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
