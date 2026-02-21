import express from "express";
import bcrypt from "bcryptjs";
import axios from "axios";

import prisma from "../lib/prisma.js";
import { requireAuth } from "../middleware/authmiddleware.js";
import { generateToken } from "../lib/utils.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: `Account already exists via ${existingUser.provider}`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        provider: "local",
      },
    });

    generateToken(user.id, res);

    res.json({
      message: "Registered successfully",
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.provider !== "local") {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user.id, res);

    res.json({
      message: "Login successful",
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


router.get("/me", requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      provider: true,
      createdAt: true,
    },
  });

  res.json(user);
});


router.get("/google", (req, res) => {
  const url =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
      response_type: "code",
      scope: "openid email profile",
    });

  res.redirect(url);
});

router.get("/google/callback", async (req, res) => {
  try {
    const { code } = req.query;

    const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
      grant_type: "authorization_code",
    });

    const { access_token } = tokenRes.data;

    const profileRes = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const { email, name } = profileRes.data;

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: { email, name, provider: "google" },
      });
    }

    generateToken(user.id, res);

    res.redirect(`${process.env.FRONTEND_URL}/oauth-success`);
  } catch (err) {
    console.error("Google OAuth Error:", err.response?.data || err.message);
    res.status(500).json({ message: "Google OAuth failed" });
  }
});


router.get("/github", (req, res) => {
  const url =
    "https://github.com/login/oauth/authorize?" +
    new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID,
      redirect_uri: process.env.GITHUB_CALLBACK_URL,
      scope: "read:user user:email",
    });

  res.redirect(url);
});
router.get("/github/callback", async (req, res) => {
  try {
    const { code } = req.query;

    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GITHUB_CALLBACK_URL,
      },
      { headers: { Accept: "application/json" } }
    );

    const access_token = tokenRes.data.access_token;
    if (!access_token) {
      return res.status(400).json({ message: "GitHub token failed" });
    }

    const profileRes = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "User-Agent": "ReqHub",
        Accept: "application/vnd.github+json",
      },
    });

    const githubUser = profileRes.data;
    const email =
      githubUser.email ||
      `${githubUser.login}@users.noreply.github.com`;

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: githubUser.name || githubUser.login,
          provider: "github",
        },
      });
    }

    generateToken(user.id, res);

    res.redirect(process.env.FRONTEND_URL + "/tester");
  } catch (err) {
    console.error("GitHub OAuth Error:", err.response?.data || err.message);
    res.status(500).json({ message: "GitHub OAuth failed" });
  }
});


router.post("/logout", (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie("token", {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    path: "/",
  });

  res.json({ message: "Logged out successfully" });
});


export default router;
