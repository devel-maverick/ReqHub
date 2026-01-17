import jwt from "jsonwebtoken";

/*
 Centralized JWT + cookie logic
 Works for local auth + Google + GitHub OAuth
*/

export const generateToken = (userId, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const NODE_ENV = process.env.NODE_ENV || "development";

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  const isProduction = NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: isProduction ? "None" : "Lax",
    secure: isProduction, // false on localhost
    path: "/",
  });

  return token;
};
