import { getCollection } from "../lib/mongodb.js";
import { verifyAccessToken } from "../lib/jwt.js";

export async function verifyAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = verifyAccessToken(token);
    const users = await getCollection("users");
    const user = await users.findOne({ id: decoded.id });
    if (!user) return res.status(401).json({ error: "User not found" });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

export function checkAdmin(req, res, next) {
  if (req.user?.role !== "admin") return res.status(403).json({ error: "Forbidden" });
  next();
}
