import { Router } from "express";
import { getCollection } from "../lib/mongodb.js";
import { checkAdmin, verifyAuth } from "../middleware/auth.js";

const router = Router();

function cleanDocument(document) {
  const { _id, ...rest } = document;
  return rest;
}

router.post("/", verifyAuth, async (req, res, next) => {
  try {
    const cartItems = await getCollection("cart_items");
    const userCart = await cartItems
      .aggregate([
        { $match: { user_id: req.user.id } },
        { $lookup: { from: "products", localField: "product_id", foreignField: "id", as: "product" } },
        { $unwind: "$product" },
      ])
      .toArray();

    const items = userCart.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
      price_at_purchase: item.product.price,
    }));
    const total = items.reduce((sum, item) => sum + item.quantity * item.price_at_purchase, 0);
    const order = {
      id: `ORD-${Date.now()}`,
      user_id: req.user.id,
      total_amount: total,
      status: "pending",
      shipping_address: req.body.shipping_address || "",
      payment_method: req.body.payment_method || "cod",
      items,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const orders = await getCollection("orders");
    await orders.insertOne(order);
    await cartItems.deleteMany({ user_id: req.user.id });
    res.status(201).json({ order });
  } catch (error) {
    next(error);
  }
});

router.get("/", verifyAuth, async (req, res, next) => {
  try {
    const orders = await getCollection("orders");
    const query = req.user.role === "admin" ? {} : { user_id: req.user.id };
    const items = await orders.find(query).sort({ created_at: -1 }).toArray();
    res.json({ items: items.map(cleanDocument) });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", verifyAuth, async (req, res, next) => {
  try {
    const orders = await getCollection("orders");
    const order = await orders.findOne({ id: req.params.id });
    if (!order) return res.status(404).json({ error: "Order not found" });
    if (req.user.role !== "admin" && order.user_id !== req.user.id) return res.status(403).json({ error: "Forbidden" });
    res.json({ order: cleanDocument(order) });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", verifyAuth, checkAdmin, async (req, res, next) => {
  try {
    const orders = await getCollection("orders");
    const order = await orders.findOneAndUpdate(
      { id: req.params.id },
      { $set: { status: req.body.status || "pending", updated_at: new Date().toISOString() } },
      { returnDocument: "after" }
    );
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ order: cleanDocument(order) });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", verifyAuth, checkAdmin, async (req, res, next) => {
  try {
    const orders = await getCollection("orders");
    const order = await orders.findOneAndUpdate(
      { id: req.params.id },
      { $set: { status: "cancelled", updated_at: new Date().toISOString() } },
      { returnDocument: "after" }
    );
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ order: cleanDocument(order) });
  } catch (error) {
    next(error);
  }
});

export default router;
