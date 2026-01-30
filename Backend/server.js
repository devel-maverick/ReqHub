import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import http from "http";

import authRoutes from "./src/routes/auth.js";
import requestRoutes from "./src/routes/request.js";
import historyRoutes from "./src/routes/history.js";
import starRoutes from "./src/routes/star.js";
import { setupWebSocket } from "./src/lib/wsserver.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/star", starRoutes);

setupWebSocket(server);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
