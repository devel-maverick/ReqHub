import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./src/routes/auth.js";
import requestRoutes from "./src/routes/request.js";
import historyRoutes from "./src/routes/history.js";
import starRoutes from "./src/routes/star.js";
import { setupWebSocket } from "./src/lib/wsserver.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve static files from Frontend/dist
const staticPath = path.join(__dirname, "../Frontend/dist");
console.log("📁 Serving static files from:", staticPath);
app.use(express.static(staticPath));

// Handle client-side routing - send index.html for all non-API routes
app.use((req, res) => {
  const indexPath = path.join(__dirname, "../Frontend/dist/index.html");
  console.log("📄 Serving index.html for:", req.url);
  res.sendFile(indexPath);
});

setupWebSocket(server);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
