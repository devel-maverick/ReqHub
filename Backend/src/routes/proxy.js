import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  const { method, url, headers, body } = req.body;
  const startTime = Date.now();

  try {
    const response = await axios({
      method,
      url,
      headers,
      data: body,
      validateStatus: () => true,
    });

    res.json({
      status: response.status,
      headers: response.headers,
      body: response.data,
      time: Date.now() - startTime,
      size: JSON.stringify(response.data || {}).length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
