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
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    });

    res.json(history);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch history",
      error: error.message,
    });
  }
});

export default router;
