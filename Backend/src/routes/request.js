import express from "express";
import axios from "axios";
import prisma from "../lib/prisma.js";
import { requireAuth } from "../middleware/authmiddleware.js";

const router = express.Router();

/*
 POST /api/request
 This acts like Postman "Send" button
 One request = one execution = one DB row
*/
router.post("/", requireAuth, async (req, res) => {
  const {
    method,
    url,
    params = {},
    headers = {},
    authType = null,
    authData = null,
    bodyType = "none",
    body = null,
    rawText = null,
  } = req.body;

  if (!method || !url) {
    return res.status(400).json({ message: "Method and URL are required" });
  }

  try {
    /* ======================
       PREPARE REQUEST
    ====================== */

    const axiosConfig = {
      method,
      url,
      params,
      headers,
      validateStatus: () => true, // do not throw on 4xx/5xx
    };

    // Body handling
    if (["POST", "PUT", "PATCH"].includes(method)) {
      if (bodyType === "raw") {
        axiosConfig.data = rawText;
      } else if (bodyType === "form-data") {
        axiosConfig.data = body;
      } else if (bodyType === "json") {
        axiosConfig.data = body;
      }
    }

    // Authorization handling
    if (authType === "bearer" && authData?.token) {
      axiosConfig.headers.Authorization = `Bearer ${authData.token}`;
    }

    if (authType === "basic" && authData?.username) {
      axiosConfig.auth = {
        username: authData.username,
        password: authData.password || "",
      };
    }

    /* ======================
       SEND REQUEST
    ====================== */

    const startTime = Date.now();
    const response = await axios(axiosConfig);
    const timeMs = Date.now() - startTime;

    const resBody =
      typeof response.data === "object" ? response.data : null;
    const resText =
      typeof response.data === "string" ? response.data : null;

    const sizeBytes = Buffer.byteLength(
      JSON.stringify(response.data || ""),
      "utf8"
    );

    /* ======================
       SAVE TO DATABASE
    ====================== */

    const savedRequest = await prisma.apiRequest.create({
      data: {
        userId: req.user.id,

        method,
        url,
        params,
        headers,

        authType,
        authData,

        bodyType,
        body,
        rawText,

        status: response.status,
        resHeaders: response.headers,
        resBody,
        resText,
        cookies: response.headers["set-cookie"] || null,

        timeMs,
        sizeBytes,
      },
    });

    /* ======================
       RETURN RESPONSE
    ====================== */

    res.json({
      id: savedRequest.id,
      status: response.status,
      headers: response.headers,
      body: resBody,
      text: resText,
      cookies: response.headers["set-cookie"] || null,
      timeMs,
      sizeBytes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Request execution failed",
      error: error.message,
    });
  }
});

export default router;
