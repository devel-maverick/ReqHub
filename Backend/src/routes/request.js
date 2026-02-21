import express from "express";
import axios from "axios";
import prisma from "../lib/prisma.js";
import { requireAuth } from "../middleware/authmiddleware.js";

const router = express.Router();
const cookieJar = new Map();

function getJarKey(userId, targetUrl) {
  try {
    const urlObj = new URL(targetUrl);
    return `${userId}::${urlObj.host}`;
  } catch {
    return `${userId}::unknown`;
  }
}

function applyCookiesToRequest(userId, targetUrl, headers) {
  const key = getJarKey(userId, targetUrl);
  const jar = cookieJar.get(key);
  if (!jar || Object.keys(jar).length === 0) return headers;

  const cookieHeader = Object.entries(jar)
    .map(([name, value]) => `${name}=${value}`)
    .join("; ");

  return {
    ...headers,
    Cookie: cookieHeader,
  };
}

function storeResponseCookies(userId, targetUrl, setCookieHeader) {
  if (!setCookieHeader) return;

  const key = getJarKey(userId, targetUrl);
  const current = cookieJar.get(key) || {};

  const cookieStrings = Array.isArray(setCookieHeader)
    ? setCookieHeader
    : [setCookieHeader];

  for (const raw of cookieStrings) {
    if (!raw) continue;
    const firstPart = String(raw).split(";")[0];
    const [name, value] = firstPart.split("=");
    if (!name) continue;
    current[name.trim()] = (value || "").trim();
  }

  cookieJar.set(key, current);
}

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
    let axiosConfig = {
      method,
      url,
      params,
      headers,
      family: 4,
      validateStatus: () => true,
    };

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
    // Attach cookies from our simple jar (if any)
    axiosConfig.headers = applyCookiesToRequest(req.user.id, url, axiosConfig.headers || {});

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

    // Update cookie jar from response
    storeResponseCookies(req.user.id, url, response.headers["set-cookie"]);


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
    let errorMessage = error.message;
    if (error.name === 'AggregateError') {
      errorMessage = error.errors.map(e => e.message).join(", ");
    } else if (!errorMessage) {
      errorMessage = String(error);
    }
    res.status(500).json({
      message: "Request execution failed",
      error: errorMessage,
    });
  }
});

export default router;
