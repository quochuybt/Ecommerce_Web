import { Router } from "express";
import bcrypt from "bcryptjs";
import { getCollection } from "../lib/mongodb.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../lib/jwt.js";
import { verifyAuth } from "../middleware/auth.js";

const router = Router();

function publicUser(user) {
  const { password_hash, password, _id, ...safeUser } = user;
  return safeUser;
}

router.post("/register", async (req, res, next) => {
  try {
    const { email, password, full_name } = req.body;
    if (!email || !password || !full_name) {
      return res.status(400).json({ error: "email, password and full_name are required" });
    }

    const users = await getCollection("users");
    if (await users.findOne({ email })) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const user = {
      id: `user-${Date.now()}`,
      email,
      password_hash: await bcrypt.hash(password, 10),
      full_name,
      role: "user",
      avatar_url: "",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await users.insertOne(user);
    res.status(201).json({ user: publicUser(user), accessToken: signAccessToken(user), refreshToken: signRefreshToken(user) });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const users = await getCollection("users");
    const user = await users.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.json({ user: publicUser(user), accessToken: signAccessToken(user), refreshToken: signRefreshToken(user) });
  } catch (error) {
    next(error);
  }
});

router.post("/refresh-token", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: "refreshToken is required" });
    const decoded = verifyRefreshToken(refreshToken);
    const users = await getCollection("users");
    const user = await users.findOne({ id: decoded.id });
    if (!user) return res.status(401).json({ error: "User not found" });
    res.json({ accessToken: signAccessToken(user) });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", verifyAuth, (req, res) => {
  res.json({ message: "Logged out successfully" });
});

router.get("/me", verifyAuth, (req, res) => {
  res.json({ user: publicUser(req.user) });
});

export default router;
