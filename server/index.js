import Express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";

import userRoutes from "./Routes/userRoutes.js";
import chatRoutes from "./Routes/chatRoutes.js";
import messageRoutes from "./Routes/messageRoute.js";

import socketServer from "./Socket/socketServer.js";

const app = Express();
dotenv.config();
app.use(Express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to our chat app API's");
});

app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const uri = process.env.ATLAS_URI;

socketServer(server);

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDb connection established..");
  })
  .catch((error) => {
    console.log("MongoDb connection failed", error);
  });
