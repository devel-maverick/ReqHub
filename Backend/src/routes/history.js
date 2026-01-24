import express from "express";
import prisma from "../lib/prisma.js";
import { requireAuth } from "../middleware/authmiddleware.js";

const router = express.Router();

/*
 GET /api/history
 Returns last 20 API executions for logged-in user
*/
router.get("/", requireAuth, async (req, res) => {
  try {
    const history = await prisma.apiRequest.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        method: true,
        url: true,
        status: true,
        timeMs: true,
        sizeBytes: true,
        isStarred: true,
        createdAt: true,
      },
    });

    res.json(history);
  } catch {
    res.status(500).json({ message: "Failed to fetch history" });
  }
});

// POST /api/history/ws
// Log a WebSocket "request" into history so it appears alongside HTTP calls
router.post("/ws", requireAuth, async (req, res) => {
  const { url } = req.body || {};

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  try {
    const created = await prisma.apiRequest.create({
      data: {
        userId: req.user.id,

        method: "WS",
        url,

        params: null,
        headers: {},

        authType: null,
        authData: null,

        bodyType: null,
        body: null,
        rawText: null,
        binaryRef: null,

        status: 0,
        resHeaders: {},
        resBody: null,
        resText: null,
        cookies: null,

        timeMs: 0,
        sizeBytes: 0,
      },
      select: {
        id: true,
        method: true,
        url: true,
        status: true,
        timeMs: true,
        sizeBytes: true,
        isStarred: true,
        createdAt: true,
      },
    });

    res.json(created);
  } catch {
    res.status(500).json({ message: "Failed to log WebSocket request" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  const requestId = Number(req.params.id);

  if (isNaN(requestId)) {
    return res.status(400).json({ message: "Invalid request id" });
  }

  try {
    const result = await prisma.apiRequest.deleteMany({
      where: {
        id: requestId,
        userId: req.user.id,
      },
    });

    if (result.count === 0) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Failed to delete history item" });
  }
});

export default router;
