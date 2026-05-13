import { Router } from "express";
import { getCollection } from "../lib/mongodb.js";
import { checkAdmin, verifyAuth } from "../middleware/auth.js";

const router = Router();

function cleanDocument(document) {
  if (!document) return document;
  const { _id, ...rest } = document;
  return rest;
}

router.get("/", async (req, res, next) => {
  try {
    const { search = "", category, minPrice, maxPrice, sort = "featured", page = 1, limit = 12 } = req.query;
    const pageNumber = Math.max(1, Number(page));
    const limitNumber = Math.max(1, Number(limit));
    const query = {};

    if (category) query.category = category;
    if (search) query.$text = { $search: String(search) };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sortMap = {
      "price-asc": { price: 1 },
      "price-desc": { price: -1 },
      rating: { rating: -1 },
      featured: { is_featured: -1, rating: -1 },
    };

    const products = await getCollection("products");
    const total = await products.countDocuments(query);
    const items = await products
      .find(query)
      .sort(sortMap[sort] || sortMap.featured)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .toArray();

    res.json({ items: items.map(cleanDocument), total, page: pageNumber, limit: limitNumber });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const products = await getCollection("products");
    const product = await products.findOne({ $or: [{ id: req.params.id }, { slug: req.params.id }] });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ product: cleanDocument(product) });
  } catch (error) {
    next(error);
  }
});

router.post("/", verifyAuth, checkAdmin, async (req, res, next) => {
  try {
    const product = {
      id: req.body.id || `product-${Date.now()}`,
      slug: req.body.slug || String(req.body.name || "product").toLowerCase().replaceAll(" ", "-"),
      name: req.body.name,
      category: req.body.category,
      price: Number(req.body.price || 0),
      discount_price: Number(req.body.discount_price || req.body.price || 0),
      stock: Number(req.body.stock || 0),
      rating: Number(req.body.rating || 0),
      review_count: 0,
      image_url: req.body.image_url || "",
      description: req.body.description || "",
      is_featured: Boolean(req.body.is_featured),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const products = await getCollection("products");
    await products.insertOne(product);
    res.status(201).json({ product });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", verifyAuth, checkAdmin, async (req, res, next) => {
  try {
    const products = await getCollection("products");
    const result = await products.findOneAndUpdate(
      { id: req.params.id },
      { $set: { ...req.body, updated_at: new Date().toISOString() } },
      { returnDocument: "after" }
    );
    if (!result) return res.status(404).json({ error: "Product not found" });
    res.json({ product: cleanDocument(result) });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", verifyAuth, checkAdmin, async (req, res, next) => {
  try {
    const products = await getCollection("products");
    const result = await products.deleteOne({ id: req.params.id });
    if (!result.deletedCount) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
});

export default router;
