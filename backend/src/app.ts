import express from "express";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

config();
const app = express();

app.use(cors({ origin: "https://chatify-ai.onrender.com", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/v1/", appRouter);

export default app;
