import dotenv from "dotenv";
dotenv.config();

import { app, server } from "./app.js";

const PORT = process.env.PORT || 8000;

app.on("error", (error) => {
  throw error;
});

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Instaprint Backend is up and running");
});
