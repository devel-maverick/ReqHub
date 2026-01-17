import express from "express";
import bcrypt from "bcryptjs";
import axios from "axios";

import prisma from "../lib/prisma.js";
import { requireAuth } from "../middleware/authmiddleware.js";
import { generateToken } from "../lib/utils.js";

const router = express.Router();

/* =========================
   LOCAL REGISTER
========================= */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required" });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
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
});

/* =========================
   LOCAL LOGIN
========================= */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.password) {
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
});

/* =========================
   CURRENT USER
========================= */
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

/* =========================
   GOOGLE OAUTH
========================= */
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
  const { code } = req.query;

  const tokenRes = await axios.post(
    "https://oauth2.googleapis.com/token",
    {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
      grant_type: "authorization_code",
    }
  );

  const { access_token } = tokenRes.data;

  const profileRes = await axios.get(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const { email, name } = profileRes.data;

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name,
        provider: "google",
      },
    });
  }

  generateToken(user.id, res);

  res.redirect(process.env.FRONTEND_URL);
});

/* =========================
   GITHUB OAUTH
========================= */
router.get("/github", (req, res) => {
  const url =
    "https://github.com/login/oauth/authorize?" +
    new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID,
      redirect_uri: process.env.GITHUB_CALLBACK_URL,
      scope: "user:email",
    });

  res.redirect(url);
});

router.get("/github/callback", async (req, res) => {
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

  const { access_token } = tokenRes.data;

  const profileRes = await axios.get("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const emailRes = await axios.get("https://api.github.com/user/emails", {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const primaryEmail = emailRes.data.find(e => e.primary)?.email;
  const email = primaryEmail || `${profileRes.data.login}@github.com`;

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name: profileRes.data.name || profileRes.data.login,
        provider: "github",
      },
    });
  }

  generateToken(user.id, res);

  res.redirect(process.env.FRONTEND_URL);
});

export default router;
