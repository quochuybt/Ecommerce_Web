import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectToDatabase, getDatabase } from "../lib/mongodb.js";

const seedUsers = [
  {
    id: "user-1",
    email: "user@example.com",
    password: "User12345",
    full_name: "Nguyen Van An",
    role: "user",
    avatar_url: "",
    is_active: true,
    created_at: "2026-05-01T08:00:00.000Z",
  },
  {
    id: "admin-1",
    email: "admin@example.com",
    password: "Admin12345",
    full_name: "Admin User",
    role: "admin",
    avatar_url: "",
    is_active: true,
    created_at: "2026-05-01T08:00:00.000Z",
  },
];

const seedCategories = [
  { id: "cat-phone", name: "Dien thoai", slug: "dien-thoai" },
  { id: "cat-laptop", name: "Laptop", slug: "laptop" },
  { id: "cat-tablet", name: "Tablet", slug: "tablet" },
  { id: "cat-accessory", name: "Phu kien", slug: "phu-kien" },
  { id: "cat-watch", name: "Dong ho", slug: "dong-ho" },
];

const seedProducts = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro 256GB",
    slug: "iphone-15-pro",
    category: "Dien thoai",
    price: 28990000,
    discount_price: 27990000,
    stock: 36,
    rating: 4.9,
    review_count: 428,
    image_url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80",
    description: "Khung titan, chip A17 Pro, camera chuyen nghiep va man hinh ProMotion.",
    is_featured: true,
  },
  {
    id: "macbook-air-m3",
    name: "MacBook Air M3 13 inch",
    slug: "macbook-air-m3",
    category: "Laptop",
    price: 27490000,
    discount_price: 26490000,
    stock: 18,
    rating: 4.8,
    review_count: 312,
    image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
    description: "Laptop mong nhe cho hoc tap, van phong va sang tao noi dung.",
    is_featured: true,
  },
  {
    id: "galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    slug: "galaxy-s24-ultra",
    category: "Dien thoai",
    price: 25990000,
    discount_price: 24990000,
    stock: 24,
    rating: 4.7,
    review_count: 286,
    image_url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80",
    description: "Man hinh lon, S Pen, camera zoom xa va Galaxy AI.",
    is_featured: true,
  },
  {
    id: "ipad-air",
    name: "iPad Air 11 inch M2",
    slug: "ipad-air",
    category: "Tablet",
    price: 16990000,
    discount_price: 15990000,
    stock: 42,
    rating: 4.8,
    review_count: 154,
    image_url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80",
    description: "Tablet can bang giua hieu nang, tinh di dong va ghi chu bang but.",
    is_featured: true,
  },
];

const seedOrders = [
  {
    id: "ORD-24051",
    user_id: "user-1",
    total_amount: 30480000,
    status: "shipped",
    shipping_address: "12 Nguyen Hue, Quan 1, TP HCM",
    payment_method: "cod",
    items: [{ product_id: "iphone-15-pro", quantity: 1, price_at_purchase: 28990000 }],
    created_at: "2026-05-12T08:00:00.000Z",
  },
];

async function seed() {
  const client = await connectToDatabase();
  const db = await getDatabase();

  await Promise.all([
    db.collection("users").deleteMany({}),
    db.collection("categories").deleteMany({}),
    db.collection("products").deleteMany({}),
    db.collection("cart_items").deleteMany({}),
    db.collection("orders").deleteMany({}),
  ]);

  const hashedUsers = await Promise.all(
    seedUsers.map(async (user) => {
      const { password, ...userWithoutPassword } = user;
      return {
        ...userWithoutPassword,
        password_hash: await bcrypt.hash(password, 10),
        updated_at: user.created_at,
      };
    })
  );

  const now = new Date().toISOString();
  await db.collection("users").insertMany(hashedUsers);
  await db.collection("categories").insertMany(seedCategories);
  await db.collection("products").insertMany(seedProducts.map((product) => ({ ...product, updated_at: now })));
  await db.collection("orders").insertMany(seedOrders);

  await Promise.all([
    db.collection("users").createIndex({ email: 1 }, { unique: true }),
    db.collection("products").createIndex({ id: 1 }, { unique: true }),
    db.collection("products").createIndex({ slug: 1 }, { unique: true }),
    db.collection("products").createIndex({ category: 1 }),
    db.collection("products").createIndex({ name: "text", description: "text" }),
    db.collection("cart_items").createIndex({ user_id: 1, product_id: 1 }, { unique: true }),
    db.collection("orders").createIndex({ user_id: 1 }),
    db.collection("orders").createIndex({ status: 1 }),
    db.collection("orders").createIndex({ created_at: -1 }),
  ]);

  console.log("MongoDB seeded successfully");
  console.table({
    users: hashedUsers.length,
    categories: seedCategories.length,
    products: seedProducts.length,
    orders: seedOrders.length,
  });

  await client.close();
}

seed().catch((error) => {
  console.error("MongoDB seed failed");
  console.error(error.message);
  process.exit(1);
});
