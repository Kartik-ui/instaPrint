import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
// import { admin, auth } from "./firebase.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("sendMessage", (msg) => {
    io.emit("receiveMessage", msg);
  });
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// import routes
import uploadRouter from "./routes/upload.routes.js";

// routes
app.use("/api/v1/print", uploadRouter);

app.use(errorMiddleware);

export { app, io, server };
