import express from "express";
import prisma from "../lib/prisma.js";
import { requireAuth } from "../middleware/authmiddleware.js";

const router = express.Router();

/*
 PATCH /api/request/star/:id
 Toggle star for a request
*/
router.patch("/star/:id", requireAuth, async (req, res) => {
  const requestId = Number(req.params.id);

  if (isNaN(requestId)) {
    return res.status(400).json({ message: "Invalid request id" });
  }

  try {
    // check ownership
    const request = await prisma.apiRequest.findFirst({
      where: {
        id: requestId,
        userId: req.user.id,
      },
      select: { isStarred: true },
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const updated = await prisma.apiRequest.update({
      where: { id: requestId },
      data: { isStarred: !request.isStarred },
      select: {
        id: true,
        isStarred: true,
      },
    });

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Failed to toggle star" });
  }
});

export default router;
