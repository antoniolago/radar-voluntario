import dotenv from "dotenv";
import path from "path";
import https from "https";
import cors from "cors";
import fs from "fs";
import os from "os";
import bodyParser from "body-parser";
import { OAuth2Client } from "google-auth-library";

import express from "express";

dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

const app = express();

app.use(cors());
app.use(bodyParser.json());

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

app.get("/", (request, response) => {
  return response.json({ message: "Hello World" });
});

app.get("/api/appSettings", (request, response) => {
  return response.json({
    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    ENVIRONMENT: "main",
    APP_URL: process.env.APP_URL,
  });
});

app.get("/api/user", async (request, response) => {
  return response.json({ ok: true });
});

app.post("/api/accounts/login-google", async (request, response) => {
  const { credential } = request.body;

  const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  return response.json({ firstName: payload?.given_name });
});
