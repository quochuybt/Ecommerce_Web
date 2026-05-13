# Agents - E-Commerce Thiết Bị Điện Tử
## React.js Web Application Development Project (12 weeks / 6 sprints)

---

## 1. Project Overview

**Tên dự án:** E-Commerce Platform - Thiết Bị Điện Tử  
**Mục tiêu:** Xây dựng web app thương mại điện tử bán thiết bị điện tử (điện thoại, laptop, tablet, phụ kiện...)  
**Thời gian:** 12 tuần (6 sprint × 2 tuần)  
**Tech Stack:** React 18+, Vite, React Router v6, Redux Toolkit, JavaScript, MongoDB, Tailwind CSS, Shadcn/ui

---

## 2. Agent Roles & Responsibilities

### 2.1. Frontend Developer Agent
**Vai trò:** Phát triển giao diện React + Vite

**Responsibilities:**
- Xây dựng component tree: UI components, container components, custom hooks
- State management: Redux Toolkit (global state)
- Form handling: React Hook Form + Zod validation
- Client-side routing: React Router v6
- Performance optimization: useMemo, useCallback, lazy loading, code splitting
- Responsive design + Tailwind CSS + Shadcn/ui

**Deliverables:**
- Component library (auth, product, cart, checkout, layout)
- Custom hooks (useAuth, useDebounce, useFetch, useCart, useLocalStorage)
- Pages/Routes structure:
  - `/` - Home page
  - `/products` - Products list with search/filter/pagination
  - `/products/:id` - Product detail
  - `/cart` - Shopping cart
  - `/checkout` - Checkout process
  - `/orders` - Order history
  - `/profile` - User profile
  - `/login` - Login page
  - `/register` - Register page
  - `/admin/dashboard` - Admin dashboard
  - `/admin/products` - Admin product management

**Success Criteria:**
- ✅ Mỗi component có unit test (Jest + React Testing Library)
- ✅ Lighthouse score > 80
- ✅ Mobile responsive (iOS/Android)
- ✅ Zero console errors/warnings
- ✅ Code splitting cho pages (lazy loading)

---

### 2.2. Backend/API Developer Agent
**Vai trò:** Phát triển backend API (Node.js + Express)

**Responsibilities:**
- Design API endpoints RESTful
- Authentication & authorization logic (Custom JWT)
- MongoDB schema design & queries
- Data validation & error handling
- Rate limiting & security headers
- CORS configuration

**API Endpoints (tối thiểu 22+ endpoints cho 3 CRUD modules):**
```
━━━ AUTHENTICATION (5 endpoints)
- POST   /api/auth/register       (public)
- POST   /api/auth/login          (public)
- POST   /api/auth/refresh-token  (public)
- POST   /api/auth/logout         (protected)
- GET    /api/auth/me             (protected)

━━━ USERS CRUD MODULE (5 endpoints) - Module 1
- GET    /api/users               (admin only - list all users)
- GET    /api/users/:id           (protected - get user profile)
- PUT    /api/users/:id           (protected - update own profile)
- DELETE /api/users/:id           (admin only - delete user)
- GET    /api/users/:id/orders    (protected - get user's order history)

━━━ PRODUCTS CRUD MODULE (5 endpoints) - Module 2
- GET    /api/products            (public - search, filter, pagination)
- GET    /api/products/:id        (public - product detail)
- POST   /api/products            (admin only - create)
- PUT    /api/products/:id        (admin only - update)
- DELETE /api/products/:id        (admin only - delete)

━━━ ORDERS CRUD MODULE (5 endpoints) - Module 3
- POST   /api/orders              (protected - create from cart)
- GET    /api/orders              (protected - user's orders)
- GET    /api/orders/:id          (protected - order detail)
- PUT    /api/orders/:id          (admin only - update status)
- DELETE /api/orders/:id          (admin only - cancel order)

━━━ CART MANAGEMENT (4 endpoints)
- GET    /api/cart                (protected)
- POST   /api/cart/items          (protected - add item)
- PUT    /api/cart/items/:itemId  (protected - update quantity)
- DELETE /api/cart/items/:itemId  (protected - remove item)

━━━ FILE UPLOAD (1 endpoint)
- POST   /api/upload              (protected - avatar, product images)

━━━ ANALYTICS & DASHBOARD (1 endpoint)
- GET    /api/analytics/dashboard (admin only - revenue, orders count, metrics)
```

**Backend Setup (Node.js + Express):**
```javascript
// server.js - Simple Express setup
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./lib/mongodb.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server running on port ${PORT}`);
});
```

**Middleware & Route Protection:**
```javascript
// middleware/auth.js
export function verifyAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export function checkAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
}
```

**Success Criteria:**
- ✅ Tất cả endpoint đều có error handling & validation
- ✅ Authentication middleware hoạt động
- ✅ API documentation (Postman/Swagger)
- ✅ Rate limiting (prevent abuse)
- ✅ CORS properly configured

---

### 2.3. Testing Agent
**Vai trò:** Đảm bảo chất lượng code thông qua testing

**Responsibilities:**
- Unit tests: Utils, hooks, components (10-15 tests)
- Integration tests: Login flow, checkout flow, search (3-5 tests)
- E2E tests: Playwright/Cypress (1-2 scenarios)
- Coverage report & CI integration

**Test Cases:**
```
Unit Tests:
- useAuth hook (login, logout, token refresh)
- useDebounce hook
- useFetch hook (loading, error, success states)
- formatPrice utility
- validateEmail utility
- cartSlice reducer (add, remove, update)

Integration Tests:
- Login flow (register → login → set auth token → redirect)
- Product search & filter flow
- Add product to cart → checkout flow
- Admin create product flow
- Order history view

E2E Tests:
- Complete user journey (browse → search → add to cart → checkout)
- Admin product management flow
```

**Success Criteria:**
- ✅ Minimum 60% code coverage
- ✅ CI runs tests automatically on PR
- ✅ All critical flows covered
- ✅ Test report in sprint summary

---

### 2.4. DevOps/Infrastructure Agent
**Vai trò:** CI/CD pipeline, deployment, environment management

**Responsibilities:**
- Setup GitHub Actions for CI/CD
- Environment configuration (.env management)
- Build & deployment pipelines (React build, API deployment)
- Database management & backups
- Monitoring & logging

**Frontend Deployment (Vercel/Netlify):**
```yaml
# .github/workflows/deploy-frontend.yml
name: Deploy Frontend

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run lint
        run: npm run lint
      
      - name: Run tests
        run: npm run test:ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

**Backend Deployment (Railway/Render/Heroku):**
```yaml
# .github/workflows/deploy-backend.yml
name: Deploy Backend

on:
  push:
    branches: [main]
    paths:
      - 'server/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: cd server && npm ci
      
      - name: Run tests
        run: cd server && npm run test
      
      - name: Deploy to Railway
        run: railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

**Environment Variables:**
```env
# Frontend (.env.local)
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=E-Commerce Thiết Bị Điện Tử

# Backend (.env)
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=ecommerce
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_EXPIRE=15m
REFRESH_TOKEN_SECRET=your-refresh-secret-key-min-32-chars
REFRESH_TOKEN_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

**Success Criteria:**
- ✅ Fully automated CI/CD pipeline
- ✅ Zero-downtime deployments
- ✅ Rollback capability
- ✅ Health checks pass
- ✅ Staging environment mirrors production

---

### 2.5. Database/Data Agent
**Vai trò:** Schema design, migrations, data seeding

**Responsibilities:**
- Database design (MongoDB Collections)
- Query optimization & indexing
- Data seeding (initial products, categories, admin user)
- Data backup strategy
- Migration management

**MongoDB Collections:**

```javascript
// Collections Schema with MongoDB Driver

// 1. Users Collection
db.users.insertMany([{
  _id: ObjectId(),
  email: "user@example.com",
  password_hash: "hashed_password",
  full_name: "User Name",
  avatar_url: "https://...",
  role: "user", // "user" | "admin"
  is_active: true,
  created_at: new Date(),
  updated_at: new Date()
}]);

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ created_at: -1 });

// 2. Categories Collection
db.categories.insertMany([
  {
    _id: ObjectId(),
    name: "Điện Thoại",
    slug: "dien-thoai",
    description: "Smartphone, iPhone, Samsung...",
    image_url: "https://...",
    created_at: new Date()
  },
  {
    _id: ObjectId(),
    name: "Laptop",
    slug: "laptop",
    description: "MacBook, Dell, HP...",
    image_url: "https://...",
    created_at: new Date()
  },
  // ... more categories
]);

db.categories.createIndex({ slug: 1 }, { unique: true });

// 3. Products Collection
db.products.insertMany([{
  _id: ObjectId(),
  name: "iPhone 15 Pro",
  slug: "iphone-15-pro",
  description: "Latest iPhone with A17 Pro chip",
  price: 999.99,
  discount_price: 899.99,
  stock: 50,
  category_id: ObjectId("..."), // Reference to category
  image_url: "https://...",
  gallery_urls: ["https://...", "https://..."],
  rating: 4.8,
  review_count: 256,
  is_featured: true,
  created_at: new Date(),
  updated_at: new Date()
}]);

db.products.createIndex({ slug: 1 }, { unique: true });
db.products.createIndex({ category_id: 1 });
db.products.createIndex({ name: "text", description: "text" }); // Text search

// 4. Cart Items Collection
db.cart_items.insertMany([{
  _id: ObjectId(),
  user_id: ObjectId("..."),
  product_id: ObjectId("..."),
  quantity: 1,
  created_at: new Date(),
  updated_at: new Date()
}]);

db.cart_items.createIndex({ user_id: 1, product_id: 1 }, { unique: true });

// 5. Orders Collection
db.orders.insertMany([{
  _id: ObjectId(),
  user_id: ObjectId("..."),
  total_amount: 899.99,
  status: "pending", // pending | confirmed | shipped | delivered | cancelled
  shipping_address: "123 Main St, City, Country",
  billing_address: "123 Main St, City, Country",
  payment_method: "credit_card",
  items: [
    {
      product_id: ObjectId("..."),
      quantity: 1,
      price_at_purchase: 899.99
    }
  ],
  notes: "Express shipping",
  created_at: new Date(),
  updated_at: new Date()
}]);

db.orders.createIndex({ user_id: 1 });
db.orders.createIndex({ status: 1 });
db.orders.createIndex({ created_at: -1 });

// 6. Reviews Collection
db.reviews.insertMany([{
  _id: ObjectId(),
  product_id: ObjectId("..."),
  user_id: ObjectId("..."),
  rating: 5,
  comment: "Excellent product!",
  created_at: new Date(),
  updated_at: new Date()
}]);

db.reviews.createIndex({ product_id: 1 });
db.reviews.createIndex({ user_id: 1, product_id: 1 }, { unique: true });

// 7. Sales Metrics Collection (for dashboard)
db.sales_metrics.insertMany([{
  _id: ObjectId(),
  date: new Date(),
  total_revenue: 50000,
  total_orders: 120,
  total_items_sold: 350,
  created_at: new Date()
}]);

db.sales_metrics.createIndex({ date: 1 }, { unique: true });
```

**MongoDB Connection Helper:**
```javascript
// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export async function getDatabase() {
  const client = await connectToDatabase();
  return client.db(process.env.MONGODB_DB_NAME);
}

export async function getCollection(collectionName) {
  const db = await getDatabase();
  return db.collection(collectionName);
}
```

**Seeding Script:**
```javascript
// scripts/seed.js
import { connectToDatabase, getDatabase } from "../lib/mongodb.js";

async function seed() {
  const db = await getDatabase();

  // Clear collections
  await db.collection("users").deleteMany({});
  await db.collection("categories").deleteMany({});
  await db.collection("products").deleteMany({});

  // Insert categories
  const categories = [
    { name: "Điện Thoại", slug: "dien-thoai", image_url: "..." },
    { name: "Laptop", slug: "laptop", image_url: "..." },
    { name: "Tablet", slug: "tablet", image_url: "..." },
    { name: "Phụ Kiện", slug: "phu-kien", image_url: "..." },
    { name: "Đồng Hồ", slug: "dong-ho", image_url: "..." },
  ];
  const catResult = await db.collection("categories").insertMany(categories);

  // Insert products (100 products)
  const products = generateProducts(catResult.insertedIds); // helper function
  await db.collection("products").insertMany(products);

  // Insert admin user
  const admin = {
    email: "admin@example.com",
    password_hash: await hashPassword("admin123"),
    full_name: "Admin User",
    role: "admin",
    is_active: true,
    created_at: new Date()
  };
  await db.collection("users").insertOne(admin);

  console.log("✅ Database seeded successfully!");
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
```

**Success Criteria:**
- ✅ All collections properly indexed
- ✅ Seed data included (100+ products, 5 categories, admin user)
- ✅ Query optimization tested
- ✅ Backup strategy documented
- ✅ ERD diagram provided

---

### 2.6. QA/Product Agent
**Vai trò:** Test acceptance criteria, user experience validation

**Responsibilities:**
- Verify MVP requirements
- Manual testing & UAT
- User flow validation
- Bug reporting & prioritization
- Performance & accessibility testing

**MVP Checklist:**
- ✅ Auth: Register, Login, Logout, Profile update, Refresh token
- ✅ Products: CRUD (admin), display, search, filter, pagination
- ✅ Cart: Add, remove, update quantity, persist on reload
- ✅ Orders: Create, view history, track status
- ✅ Upload: Product images, avatar
- ✅ Dashboard: Revenue chart, order count, daily metrics (admin)
- ✅ SEO: Meta tags, Open Graph (at least on product pages)
- ✅ Mobile: Responsive on phones/tablets
- ✅ Accessibility: WCAG 2.1 AA compliance
- ✅ Performance: Lighthouse > 80

---

### 2.7. Documentation Agent
**Vai trò:** Maintain project documentation

**Responsibilities:**
- README.md (setup, features, tech stack, demo link)
- API documentation (Postman/Swagger)
- Architecture diagrams
- Sprint reports & retrospectives
- Setup guide & troubleshooting

**Documentation Structure:**
```
.
├── README.md (main project overview)
├── docs/
│  ├── ARCHITECTURE.md (system design, folder structure)
│  ├── API_SPEC.md (endpoint documentation with examples)
│  ├── DATABASE.md (MongoDB schema, indexes, ERD)
│  ├── SETUP.md (environment setup, prerequisites, installation)
│  ├── DEPLOYMENT.md (deployment guide, CI/CD pipeline)
│  ├── CONTRIBUTING.md (git workflow, code style, conventions)
│  └── SPRINTS/
│     ├── SPRINT_1_REPORT.md
│     ├── SPRINT_2_REPORT.md
│     └── ...
├── .env.example (example environment file)
└── postman_collection.json (API documentation export)
```

---

## 3. Sprint Breakdown (6 × 2 weeks)

### Sprint 1: Foundation & Design System
**Duration:** Week 1-2  
**Focus:** Setup, base UI, routing, design system

**Frontend Agent:**
- [ ] Setup React project with Vite (`npm create vite@latest`)
- [ ] Install dependencies (React Router, Redux, React Hook Form, Tailwind, Shadcn/ui)
- [ ] Setup folder structure (components, pages, hooks, store, services, utils)
- [ ] Design system: colors, typography, spacing, components (Button, Input, Card, Modal)
- [ ] Layout: Header, Sidebar, Footer components
- [ ] Setup React Router with main routes
- [ ] Mock API responses (sample product data)
- [ ] Setup ESLint, Prettier, Husky (pre-commit hooks)

**Backend Agent:**
- [ ] Setup Node.js + Express server
- [ ] Install dependencies (mongodb, bcryptjs, jsonwebtoken, cors, dotenv)
- [ ] Setup MongoDB connection (local)
- [ ] Create collection schemas & indexes
- [ ] Setup middleware (CORS, error handling)
- [ ] Create seed script for initial data

**DevOps Agent:**
- [ ] GitHub repo setup with branch strategy (main, develop, feature/*, hotfix/*)
- [ ] `.env.example` template for both frontend & backend
- [ ] Basic GitHub Actions workflow (lint, test)
- [ ] Document setup instructions

**Documentation Agent:**
- [ ] README.md (basic structure: project description, tech stack, quick start)
- [ ] SETUP.md (local development guide, prerequisites, installation steps)
- [ ] ARCHITECTURE.md (high-level system design, folder structure)

---

### Sprint 2: Authentication & User Management
**Duration:** Week 3-4  
**Focus:** Auth, protected routes, user profiles

**Frontend Agent:**
- [ ] Login page with form validation
- [ ] Register page with password strength validation
- [ ] useAuth custom hook (login, logout, token management)
- [ ] Protected routes middleware (redirect to login if not authenticated)
- [ ] User profile page (view & edit)
- [ ] Avatar upload with preview & size validation
- [ ] Auth error handling & toast notifications
- [ ] Persist auth state to localStorage

**Form Validation Examples (Zod + React Hook Form):**
```javascript
// Register form
const registerSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string()
    .min(8, "Mật khẩu tối thiểu 8 ký tự")
    .regex(/[A-Z]/, "Phải chứa chữ hoa")
    .regex(/[0-9]/, "Phải chứa số"),
  full_name: z.string().min(2, "Tên phải tối thiểu 2 ký tự"),
  confirmPassword: z.string()
});

// Login form
const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

// Profile edit form
const profileSchema = z.object({
  full_name: z.string().min(2),
  avatar: z.instanceof(File).optional().refine(
    f => !f || f.size < 5000000, 
    "Ảnh phải < 5MB"
  ),
  bio: z.string().max(500, "Bio tối đa 500 ký tự").optional(),
});

// Checkout form
const checkoutSchema = z.object({
  shipping_address: z.string().min(10, "Địa chỉ không hợp lệ"),
  phone: z.string().regex(/^(\+84|0)[0-9]{9,10}$/, "Số điện thoại không hợp lệ"),
  payment_method: z.enum(["credit_card", "bank_transfer", "cod"]),
});
```

**Form States Management:**
```javascript
const { 
  register, 
  handleSubmit, 
  formState: { errors, isSubmitting, isValid },
  watch 
} = useForm({
  resolver: zodResolver(loginSchema),
  mode: "onChange" // Real-time validation
});

// States:
// - isSubmitting: Loading state (disable button)
// - errors: Show field-level error messages
// - isValid: Enable/disable submit button
// - mode: "onChange" | "onBlur" | "onSubmit"
```

**Backend Agent:**
- [ ] POST /api/auth/register (validation, hash password with bcrypt)
- [ ] POST /api/auth/login (JWT token generation, refresh token)
- [ ] POST /api/auth/refresh-token (refresh flow with token rotation)
- [ ] GET /api/auth/me (protected route, return user info)
- [ ] PUT /api/users/:id (update profile - protected)
- [ ] Middleware: verifyAuth (JWT validation), checkAdmin (role check)
- [ ] Token payload: { userId, email, role, iat, exp }

**Testing Agent:**
- [ ] Unit tests: useAuth hook (login, logout, token refresh)
- [ ] Unit tests: validateEmail, validatePassword utilities
- [ ] Integration test: Register → Login → Redirect flow
- [ ] Integration test: Profile update flow

**QA Agent:**
- [ ] Manual test: Register flow (email validation, password strength)
- [ ] Manual test: Login flow (error messages, remember me)
- [ ] Manual test: Token refresh (simulate expired token)
- [ ] Manual test: Profile update & avatar upload

**Sprint Report:**
- [ ] Auth feature 100% complete
- [ ] All tests passing
- [ ] Code review: min 2 PRs merged
- [ ] Issues resolved: X bugs fixed

---

### Sprint 3: Product Management & Upload
**Duration:** Week 5-6  
**Focus:** CRUD for Products, Categories, File Upload

**Frontend Agent:**
- [ ] Products list page (call API, display products)
- [ ] Product detail page (lazy load, single product view)
- [ ] Admin: Create/Edit product form with validation
- [ ] Image upload component (preview, validation, error handling)
- [ ] Admin: Category management (CRUD)
- [ ] Product card component (reusable, with image, price, rating)
- [ ] Loading states, error boundaries, empty states

**Backend Agent:**
- [ ] GET /api/products (paginated, search, filter support)
- [ ] GET /api/products/:id (single product with reviews)
- [ ] POST /api/products (admin only, image upload integration)
- [ ] PUT /api/products/:id (admin only)
- [ ] DELETE /api/products/:id (admin only)
- [ ] POST /api/upload (image upload - Cloudinary/AWS S3 TBD)
- [ ] Admin middleware check for write operations
- [ ] Image optimization & thumbnail generation

**Testing Agent:**
- [ ] Unit tests: productSlice reducer (add, edit, delete)
- [ ] Unit tests: uploadFile utility, validateProductForm
- [ ] Integration test: Admin create product flow
- [ ] Integration test: Get product with reviews

**Documentation Agent:**
- [ ] API_SPEC.md (products & upload endpoints with examples)
- [ ] DATABASE.md (products schema, indexes, sample queries)

---

### Sprint 4: Search, Filter, Pagination & Shopping Cart
**Duration:** Week 7-8  
**Focus:** Product discovery, cart functionality

**Frontend Agent:**
- [ ] Search bar component (debounced input - useDebounce hook)
- [ ] Filter sidebar (price range, category, rating, sort)
- [ ] Pagination component (previous, next, jump to page)
- [ ] Shopping cart page (add, remove, update quantity, clear cart)
- [ ] Cart context/Redux state (cartSlice with add, remove, update actions)
- [ ] useCart custom hook for cart operations
- [ ] Persist cart to localStorage
- [ ] Cart notification/toast on add/remove

**Backend Agent:**
- [ ] GET /api/products?search=&category=&minPrice=&maxPrice=&sort=&page=&limit=
- [ ] POST /api/cart/items (add to cart - protected)
- [ ] PUT /api/cart/items/:itemId (update quantity - protected)
- [ ] DELETE /api/cart/items/:itemId (remove from cart - protected)
- [ ] GET /api/cart (retrieve user's cart - protected)
- [ ] Query optimization (indexes for filter fields)
- [ ] Cache strategy for product listings

**Testing Agent:**
- [ ] Unit tests: useDebounce hook
- [ ] Unit tests: cartSlice (add, remove, update, clear)
- [ ] Unit tests: filterProducts utility function
- [ ] Integration test: Search → Filter → Pagination flow
- [ ] Integration test: Add to cart → Update quantity → Remove flow

**QA Agent:**
- [ ] Manual test: Search with various keywords (partial match, case-insensitive)
- [ ] Manual test: Filter combinations (multiple filters at once)
- [ ] Manual test: Pagination (next, previous, jump to specific page)
- [ ] Manual test: Cart persistence (reload page, check cart remains)
- [ ] Manual test: Cart calculations (subtotal, quantity updates)

---

### Sprint 5: Orders, Dashboard, Analytics & Optimization
**Duration:** Week 9-10  
**Focus:** Checkout, admin dashboard, SEO, performance

**Frontend Agent:**
- [ ] Checkout page (shipping address, billing, payment method)
- [ ] Order confirmation page (show order details, confirmation number)
- [ ] Order history page (user - list orders with status)
- [ ] Order detail page (view specific order items, tracking)
- [ ] Admin dashboard (charts: revenue, order count, top products)
- [ ] Chart components (using Recharts or Chart.js)
- [ ] Add Meta tags for SEO (title, description, Open Graph)
- [ ] Image optimization (lazy loading images, responsive images)
- [ ] Code splitting (lazy load pages with React.lazy())
- [ ] Performance optimization: memo, useMemo, useCallback

**SEO Meta Tags Example:**
```javascript
// pages/ProductDetail.jsx
import { useEffect } from "react";

function ProductDetail({ product }) {
  useEffect(() => {
    document.title = `${product.name} - Thiết Bị Điện Tử`;
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content", 
      product.description.slice(0, 160)
    );
    
    // Open Graph tags
    document.querySelector('meta[property="og:title"]')?.setAttribute(
      "content", 
      product.name
    );
    document.querySelector('meta[property="og:image"]')?.setAttribute(
      "content", 
      product.image_url
    );
    document.querySelector('meta[property="og:url"]')?.setAttribute(
      "content", 
      window.location.href
    );
  }, [product]);

  return <div>{/* product content */}</div>;
}
```

**Backend Agent:**
- [ ] POST /api/orders (create order from cart, clear cart - protected)
- [ ] GET /api/orders (user's orders with pagination - protected)
- [ ] GET /api/orders/:id (order detail - protected)
- [ ] PUT /api/orders/:id (update order status - admin only)
- [ ] GET /api/analytics/dashboard (revenue, order count, metrics - admin)
- [ ] Analytics aggregation (daily/monthly revenue, top products)

**Testing Agent:**
- [ ] Unit tests: calculateTotal, formatCurrency utilities
- [ ] Unit tests: ordersSlice reducer
- [ ] Integration test: Cart → Checkout → Order creation flow
- [ ] Integration test: Admin view analytics flow

**QA Agent:**
- [ ] Lighthouse audit (target > 80)
- [ ] Mobile responsiveness test (various screen sizes)
- [ ] SEO check (metadata, Open Graph tags present)
- [ ] Accessibility check (WCAG 2.1 AA - keyboard navigation, screen readers)
- [ ] Performance profiling (React DevTools, Chrome DevTools)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)

---

### Sprint 6: Testing, Polish, CI/CD & Documentation
**Duration:** Week 11-12  
**Focus:** Quality assurance, deployment, final documentation

**Frontend Agent:**
- [ ] Bug fixes from QA findings
- [ ] UI/UX polish (animations, hover states, loading skeletons)
- [ ] Empty states, error boundaries, loading fallbacks
- [ ] Responsive design refinement (mobile-first approach)
- [ ] Accessibility improvements (ARIA labels, keyboard support)

**Testing Agent:**
- [ ] Increase test coverage to 60%+
- [ ] E2E test scenarios (complete user journeys)
- [ ] Cross-browser testing
- [ ] Performance testing (Lighthouse, Core Web Vitals)
- [ ] Security testing (OWASP Top 10 checks)
- [ ] Regression testing (all features)

**Backend Agent:**
- [ ] API security audit
- [ ] Rate limiting implementation
- [ ] Error message standardization
- [ ] API response optimization

**DevOps Agent:**
- [ ] Setup CI/CD pipeline:
  - ✅ Lint check (ESLint)
  - ✅ Test execution (Jest)
  - ✅ Build check (Vite build)
  - ✅ Deploy to staging
  - ✅ Deploy to production
- [ ] Setup monitoring & alerting
- [ ] Database backup automation
- [ ] Health checks & uptime monitoring

**QA Agent:**
- [ ] Final UAT (all MVP features)
- [ ] Performance sign-off
- [ ] Security assessment
- [ ] Final bug fixes

**Documentation Agent:**
- [ ] Complete README.md:
  - Project description & features
  - Tech stack
  - Setup instructions (local & production)
  - Available scripts (npm run build, npm run dev, etc)
  - Deployment guide
  - Demo link & credentials
- [ ] API documentation (Postman export or Swagger)
- [ ] Database schema & ERD diagram
- [ ] Architecture diagram (frontend → backend → database)
- [ ] CONTRIBUTING.md (git workflow, code style guide)
- [ ] DEPLOYMENT.md (environment variables, deployment steps)
- [ ] Sprint 6 report & project retrospective

**Final Deliverables:**
- ✅ Live demo URL
- ✅ GitHub repo with clean commit history
- ✅ Comprehensive documentation
- ✅ 60%+ test coverage
- ✅ Lighthouse score > 80
- ✅ Demo credentials (admin + user account)
- ✅ Postman API collection

---

## 4. Definition of Done (DoD)

A story/task is considered **Done** when:

1. **Code:**
   - [ ] Code written & reviewed (min 1 approval)
   - [ ] Follows project conventions (naming, folder structure)
   - [ ] No console errors/warnings
   - [ ] ESLint passes without warnings

2. **Testing:**
   - [ ] Unit tests pass (new code covered)
   - [ ] Linked features have integration tests
   - [ ] Manual testing completed & documented

3. **Documentation:**
   - [ ] JSDoc comments for functions
   - [ ] README updated if needed
   - [ ] API endpoints documented

4. **QA:**
   - [ ] Passed manual testing checklist
   - [ ] Accessibility & responsive design verified
   - [ ] Performance acceptable (Lighthouse > 75)

5. **Deployment:**
   - [ ] Builds without errors
   - [ ] Works on staging environment
   - [ ] PR merged to develop/main

---

## 5. Tools & Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 18+ | UI library with hooks |
| **Build Tool** | Vite | Fast build & dev server |
| **Routing** | React Router v6 | Client-side routing |
| **Language** | JavaScript (ES6+) | No TypeScript |
| **State Management** | Redux Toolkit | Global state management |
| **Forms** | React Hook Form + Zod | Form handling & validation |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **UI Components** | Shadcn/ui | Pre-built, accessible components |
| **HTTP Client** | Fetch API / Axios | API requests |
| **Backend Framework** | Express.js | Node.js HTTP server |
| **Database** | MongoDB | NoSQL database |
| **Database Client** | MongoDB Driver | Native MongoDB connection |
| **Authentication** | Custom JWT | JWT tokens + bcryptjs |
| **Testing** | Jest + React Testing Library | Unit/integration tests |
| **E2E Testing** | Playwright OR Cypress | End-to-end testing (TBD) |
| **Code Quality** | ESLint + Prettier | Linting & formatting |
| **Git Hooks** | Husky + lint-staged | Pre-commit checks |
| **CI/CD** | GitHub Actions | Automated testing & deployment |
| **Deployment** | Vercel (frontend) + Railway/Render (backend) | Hosting |
| **File Storage** | Cloudinary OR AWS S3 OR Azure | Image/file uploads (TBD) |
| **Charts** | Recharts OR Chart.js | Dashboard visualizations |
| **API Documentation** | Postman | Endpoint documentation |

---

## 6. Project Structure

```
ecommerce-electronics/
├── frontend/                       # React Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/            # Header, Footer, Navbar
│   │   │   ├── auth/              # LoginForm, RegisterForm
│   │   │   ├── products/          # ProductCard, ProductGrid, ProductFilter
│   │   │   ├── cart/              # CartItem, CartSummary
│   │   │   ├── checkout/          # CheckoutForm
│   │   │   ├── admin/             # AdminDashboard, ProductForm
│   │   │   └── layout/            # MainLayout, AdminLayout
│   │   ├── pages/                 # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── OrdersPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── hooks/                 # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useCart.js
│   │   │   ├── useFetch.js
│   │   │   ├── useDebounce.js
│   │   │   ├── useLocalStorage.js
│   │   │   └── useAsync.js
│   │   ├── store/                 # Redux store
│   │   │   ├── index.js           # Store config
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── productsSlice.js
│   │   │   │   ├── cartSlice.js
│   │   │   │   └── ordersSlice.js
│   │   │   └── api/               # API calls
│   │   │       ├── authApi.js
│   │   │       ├── productsApi.js
│   │   │       ├── ordersApi.js
│   │   │       └── userApi.js
│   │   ├── services/              # API client & external services
│   │   │   ├── api.js            # Fetch wrapper with auth
│   │   │   └── storage.js        # localStorage helpers
│   │   ├── utils/                # Utility functions
│   │   │   ├── formatters.js     # formatPrice, formatDate
│   │   │   ├── validators.js     # validateEmail, validatePassword
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── styles/               # Global styles
│   │   │   ├── index.css
│   │   │   └── tailwind.css
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # Entry point
│   ├── tests/                    # Test files (mirror src structure)
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   ├── public/                   # Static assets
│   ├── .env.example
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── eslintrc.json
│   ├── prettier.rc.json
│   ├── jest.config.js
│   ├── package.json
│   └── README.md
│
├── backend/                       # Express.js API server
│   ├── routes/
│   │   ├── auth.js              # Auth endpoints
│   │   ├── products.js          # Products CRUD
│   │   ├── orders.js            # Orders CRUD
│   │   ├── users.js             # Users endpoints
│   │   ├── cart.js              # Cart endpoints
│   │   ├── upload.js            # File upload
│   │   └── analytics.js         # Dashboard analytics
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   ├── errorHandler.js      # Error handling
│   │   ├── validation.js        # Input validation
│   │   └── cors.js              # CORS configuration
│   ├── controllers/             # Business logic
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   └── userController.js
│   ├── models/                  # MongoDB operations
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Cart.js
│   ├── lib/
│   │   ├── mongodb.js          # MongoDB connection
│   │   ├── jwt.js              # JWT utilities
│   │   └── validations.js      # Zod schemas
│   ├── scripts/
│   │   └── seed.js             # Database seeding
│   ├── .env.example
│   ├── server.js               # Main server file
│   ├── package.json
│   └── README.md
│
├── docs/                        # Documentation
│   ├── ARCHITECTURE.md
│   ├── API_SPEC.md
│   ├── DATABASE.md
│   ├── SETUP.md
│   ├── DEPLOYMENT.md
│   ├── CONTRIBUTING.md
│   └── SPRINTS/
│       ├── SPRINT_1_REPORT.md
│       ├── SPRINT_2_REPORT.md
│       └── ...
│
├── .github/workflows/          # CI/CD pipelines
│   ├── lint.yml
│   ├── test.yml
│   ├── deploy-frontend.yml
│   └── deploy-backend.yml
│
├── .gitignore
├── .env.example
├── README.md                   # Project root README
└── package.json               # Root package.json (monorepo)
```

---

## 7. Setup Instructions

### **Frontend Setup (React + Vite)**

```bash
# Create project
npm create vite@latest ecommerce-frontend -- --template react
cd ecommerce-frontend

# Install dependencies
npm install
npm install react-router-dom redux @reduxjs/toolkit react-redux
npm install react-hook-form zod @hookform/resolvers
npm install axios
npm install tailwindcss postcss autoprefixer
npm install -D @types/react @types/react-dom
npm install -D eslint eslint-config-react prettier husky lint-staged

# Setup Tailwind
npx tailwindcss init -p

# Setup Husky
npx husky install

# Start dev server
npm run dev
```

### **Backend Setup (Express.js)**

```bash
# Create project
mkdir ecommerce-backend
cd ecommerce-backend
npm init -y

# Install dependencies
npm install express mongodb bcryptjs jsonwebtoken cors dotenv
npm install -D nodemon eslint prettier

# Start server
npm run dev
```

---

## 8. Success Metrics

| Metric | Target | Tool |
|--------|--------|------|
| Code Coverage | ≥ 60% | Jest |
| Lighthouse Score | ≥ 80 | Lighthouse |
| Bundle Size | < 500KB | Vite bundle analysis |
| Build Time | < 10s | Vite |
| Test Execution | < 30s | Jest |
| API Response Time | < 500ms | Network tab |
| Page Load Time | < 3s | Lighthouse |
| Uptime | ≥ 99.5% | Monitoring |

---

## 9. Risk Management

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Scope creep | High | High | Strict PR reviews, sprint planning |
| API integration issues | Medium | High | API testing early, Postman collection |
| Performance bottleneck | Medium | Medium | Profiling tools, optimization sprint |
| Database migration issues | Low | High | Test locally, backup strategy |
| Deployment failure | Low | High | Staging environment, rollback plan |

---

## 10. Communication Plan

**Daily:** Standup (15 min) - blockers, progress, next tasks  
**Weekly:** Sprint planning/review (1.5 hours each)  
**Bi-weekly:** Sprint retrospective (1 hour)  
**Async:** GitHub PR discussions, Slack updates

---

## 11. Approval & Sign-off

**Project Manager:** ___________________  Date: ______  
**Tech Lead:** ___________________  Date: ______  
**QA Lead:** ___________________  Date: ______  

---

**Generated for:** E-Commerce Electronics Platform (React.js + Vite)  
**Created:** May 13, 2026  
**Document Version:** 2.0 (React.js Edition)
