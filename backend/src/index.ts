import "dotenv/config";

import express from "express";

const app = express();

app.get("/", (request, response) => {
  return response.json({ message: "Hello World" });
});

const PORT = process.env.BACKEND_PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}!`);
});
