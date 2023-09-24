import dotenv from "dotenv";
import path from "path";
import https from "https";
import cors from "cors";
import fs from "fs";
import os from "os";

import express from "express";
import { google } from "googleapis";

dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

const app = express();

app.use(cors());

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

const oauth2 = google.oauth2("v2");

app.get("/", (request, response) => {
  return response.json({ message: "Hello World" });
});

app.get("/api/appSettings", (request, response) => {
  return response.json({
    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    ENVIRONMENT: 'main',
    APP_URL: process.env.APP_URL
  });
});

app.post("/auth", async (request, response) => {
  const auth = new google.auth.GoogleAuth({
    clientOptions: {
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET_ID,
    },
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: [],
  });

  const authClient = await auth.getClient();

  const accessToken = await authClient.getAccessToken();

  console.log(accessToken);

  return response.send({
    ok: true,
  });
});
