import jwt from "jsonwebtoken";
export const requireAuth = (req, res, next) => {
  try {
    let token = req.cookies?.token;
    // 2. Fallback to Authorization header (Postman / curl)
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach user to request
    req.user = { id: decoded.userId };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
