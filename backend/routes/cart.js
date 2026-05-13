import { Router } from "express";
import { getCollection } from "../lib/mongodb.js";
import { verifyAuth } from "../middleware/auth.js";

const router = Router();

function cleanDocument(document) {
  const { _id, ...rest } = document;
  return rest;
}

async function getUserCart(userId) {
  const cartItems = await getCollection("cart_items");
  return cartItems
    .aggregate([
      { $match: { user_id: userId } },
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      { $project: { _id: 0, "product._id": 0 } },
    ])
    .toArray();
}

router.get("/", verifyAuth, async (req, res, next) => {
  try {
    res.json({ items: await getUserCart(req.user.id) });
  } catch (error) {
    next(error);
  }
});

router.post("/items", verifyAuth, async (req, res, next) => {
  try {
    const { product_id, quantity = 1 } = req.body;
    const products = await getCollection("products");
    const product = await products.findOne({ id: product_id });
    if (!product) return res.status(404).json({ error: "Product not found" });

    const cartItems = await getCollection("cart_items");
    await cartItems.updateOne(
      { user_id: req.user.id, product_id },
      {
        $setOnInsert: { id: `cart-${Date.now()}`, user_id: req.user.id, product_id, created_at: new Date().toISOString() },
        $inc: { quantity: Number(quantity) },
        $set: { updated_at: new Date().toISOString() },
      },
      { upsert: true }
    );

    res.status(201).json({ items: await getUserCart(req.user.id) });
  } catch (error) {
    next(error);
  }
});

router.put("/items/:itemId", verifyAuth, async (req, res, next) => {
  try {
    const cartItems = await getCollection("cart_items");
    const item = await cartItems.findOneAndUpdate(
      { id: req.params.itemId, user_id: req.user.id },
      { $set: { quantity: Math.max(1, Number(req.body.quantity || 1)), updated_at: new Date().toISOString() } },
      { returnDocument: "after" }
    );
    if (!item) return res.status(404).json({ error: "Cart item not found" });
    res.json({ item: cleanDocument(item) });
  } catch (error) {
    next(error);
  }
});

router.delete("/items/:itemId", verifyAuth, async (req, res, next) => {
  try {
    const cartItems = await getCollection("cart_items");
    const result = await cartItems.deleteOne({ id: req.params.itemId, user_id: req.user.id });
    if (!result.deletedCount) return res.status(404).json({ error: "Cart item not found" });
    res.json({ message: "Cart item removed" });
  } catch (error) {
    next(error);
  }
});

export default router;
