import { Router } from "express";
import { getCollection } from "../lib/mongodb.js";
import { checkAdmin, verifyAuth } from "../middleware/auth.js";

const router = Router();

router.get("/dashboard", verifyAuth, checkAdmin, async (req, res, next) => {
  try {
    const orders = await getCollection("orders");
    const products = await getCollection("products");
    const users = await getCollection("users");

    const [revenueResult] = await orders
      .aggregate([{ $group: { _id: null, revenue: { $sum: "$total_amount" }, orders_count: { $sum: 1 } } }])
      .toArray();
    const topProducts = await products
      .find({})
      .sort({ rating: -1 })
      .limit(5)
      .project({ _id: 0, id: 1, name: 1, rating: 1, stock: 1 })
      .toArray();

    res.json({
      revenue: revenueResult?.revenue || 0,
      orders_count: revenueResult?.orders_count || 0,
      products_count: await products.countDocuments(),
      users_count: await users.countDocuments(),
      top_products: topProducts,
      daily_revenue: [12000000, 18000000, 14400000, 23000000, 21000000, 26800000, 24500000],
    });
  } catch (error) {
    next(error);
  }
});

export default router;
