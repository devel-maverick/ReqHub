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

export default router;
