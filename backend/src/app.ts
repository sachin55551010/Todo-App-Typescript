import express, { type Request, type Response } from "express";
import { taskRoute } from "./routes/task.route.js";
import cors from "cors";
import dotenv from "dotenv";
import { json } from "node:stream/consumers";

dotenv.config();
export const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL as string,
    credentials: true,
  }),
);

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  return res.send("Server working fine");
});

app.use("/api/v1", taskRoute);
