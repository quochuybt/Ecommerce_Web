import { Router } from "express";
import { getCollection } from "../lib/mongodb.js";
import { checkAdmin, verifyAuth } from "../middleware/auth.js";

const router = Router();

function publicUser(user) {
  const { password_hash, password, _id, ...safeUser } = user;
  return safeUser;
}

router.get("/", verifyAuth, checkAdmin, async (req, res, next) => {
  try {
    const users = await getCollection("users");
    const items = await users.find({}).sort({ created_at: -1 }).toArray();
    res.json({ items: items.map(publicUser), total: items.length });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", verifyAuth, async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
    const users = await getCollection("users");
    const user = await users.findOne({ id: req.params.id });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", verifyAuth, async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
    const users = await getCollection("users");

    const updateFields = {
      full_name: req.body.full_name,
      avatar_url: req.body.avatar_url,
      phone_number: req.body.phone_number,
      location: req.body.location,
      updated_at: new Date().toISOString(),
    };

    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] === undefined) delete updateFields[key];
    });

    const result = await users.updateOne({ id: req.params.id }, { $set: updateFields });
    if (!result.matchedCount) return res.status(404).json({ error: "User not found" });

    const user = await users.findOne({ id: req.params.id });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", verifyAuth, checkAdmin, async (req, res, next) => {
  try {
    const users = await getCollection("users");
    const result = await users.deleteOne({ id: req.params.id });
    if (!result.deletedCount) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/orders", verifyAuth, async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
    const orders = await getCollection("orders");
    const items = await orders.find({ user_id: req.params.id }).sort({ created_at: -1 }).toArray();
    res.json({ items: items.map(({ _id, ...order }) => order) });
  } catch (error) {
    next(error);
  }
});

export default router;
