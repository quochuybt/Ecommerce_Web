# 🔧 Tech Stack - E-Commerce Thiết Bị Điện Tử (React.js Edition)
## Lựa chọn công nghệ của dự án

**Project:** E-Commerce Platform - Điện Thoại, Laptop, Tablet  
**Framework:** React.js (không Next.js)  
**Language:** JavaScript (không TypeScript)  
**Created:** May 13, 2026  
**Status:** ✅ Tech Stack Finalized

---

## 📋 Tóm Tắt Công Nghệ Đã Chọn

### **✅ Đã Quyết Định**

| Lớp | Công Nghệ | Lý Do Chọn |
|-----|-----------|-----------|
| **Frontend Framework** | React 18+ | Component-based, hooks, ecosystem |
| **Build Tool** | Vite | Super fast dev server, ESM |
| **Routing** | React Router v6 | Industry standard, nested routes |
| **Language** | JavaScript (ES6+) | Flexibility, faster development |
| **State Management** | Redux Toolkit | Predictable, DevTools, scalable |
| **Forms** | React Hook Form + Zod | Lightweight, powerful validation |
| **Styling** | Tailwind CSS | Utility-first, fast development |
| **UI Components** | Shadcn/ui | Beautiful, accessible, customizable |
| **HTTP Client** | Fetch API / Axios | Promise-based, interceptors |
| **Backend Framework** | Express.js | Lightweight, flexible, Node.js |
| **Database** | MongoDB | Flexible schema, document-based |
| **Database Client** | MongoDB Driver | Native, official, no ORM overhead |
| **Authentication** | Custom JWT | Full control, lightweight |
| **Testing** | Jest + React Testing Library | Industry standard, great DX |
| **Linting** | ESLint + Prettier | Code quality + auto-formatting |
| **Git Hooks** | Husky + lint-staged | Pre-commit checks |
| **CI/CD** | GitHub Actions | Free, integrated |
| **Deployment** | Vercel (FE) + Railway/Render (BE) | Simple, automatic |

---

### **⚠️ Chưa Quyết Định (TBD)**

| Lớp | Tùy Chọn |
|-----|---------|
| **Data Fetching** | React Query OR SWR OR Axios interceptors |
| **E2E Testing** | Playwright OR Cypress |
| **File Storage** | Cloudinary OR AWS S3 OR Azure Blob |

---

## 🏗️ Architecture Overview

```
Frontend (React + Vite)          Backend (Express.js)         Database
┌──────────────────┐             ┌──────────────────┐         ┌───────┐
│  React.js (SPA)  │ ◄────────► │  Express API     │ ◄────► │MongoDB│
│  - Redux Store   │             │  - Routes        │         └───────┘
│  - React Router  │             │  - Controllers   │
│  - Components    │             │  - Middleware    │
│  - Pages         │             │  - Models        │
└──────────────────┘             └──────────────────┘
     Vite Build                   Node.js Server
  Port: 5173 (dev)             Port: 3001 (dev)
```

---

## 📦 Dependencies Summary

### **Frontend - Production Dependencies**

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  
  "@reduxjs/toolkit": "^1.9.0",
  "react-redux": "^8.1.0",
  
  "react-hook-form": "^7.48.0",
  "zod": "^3.22.0",
  "@hookform/resolvers": "^3.3.0",
  
  "axios": "^1.6.0",
  
  "tailwindcss": "^3.3.0",
  "shadcn-ui": "^0.8.0",
  "lucide-react": "^0.292.0"
}
```

### **Frontend - Development Dependencies**

```json
{
  "vite": "^5.0.0",
  "@vitejs/plugin-react": "^4.0.0",
  
  "eslint": "^8.0.0",
  "eslint-config-react-app": "^7.0.0",
  "prettier": "^3.0.0",
  "husky": "^8.0.0",
  "lint-staged": "^15.0.0",
  
  "jest": "^29.0.0",
  "@testing-library/react": "^14.0.0",
  "@testing-library/jest-dom": "^6.0.0",
  "@testing-library/user-event": "^14.0.0",
  "jest-environment-jsdom": "^29.0.0"
}
```

### **Backend - Production Dependencies**

```json
{
  "express": "^4.18.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.0",
  
  "mongodb": "^6.0.0",
  
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.1.0",
  
  "zod": "^3.22.0",
  
  "multer": "^1.4.5",
  "express-validator": "^7.0.0"
}
```

### **Backend - Development Dependencies**

```json
{
  "nodemon": "^3.0.0",
  "eslint": "^8.0.0",
  "prettier": "^3.0.0"
}
```

---

## 🚀 Quick Start

### **Frontend Setup (React + Vite)**

```bash
# 1. Create React project with Vite
npm create vite@latest ecommerce-frontend -- --template react
cd ecommerce-frontend

# 2. Install dependencies
npm install

# 3. Install additional packages
npm install react-router-dom
npm install @reduxjs/toolkit react-redux
npm install react-hook-form zod @hookform/resolvers
npm install axios
npm install -D tailwindcss postcss autoprefixer
npm run init:tailwind  # or: npx tailwindcss init -p

# 4. Setup Husky
npm install -D husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"

# 5. Create .lintstagedrc.json
cat > .lintstagedrc.json << 'EOF'
{
  "*.{js,jsx}": ["eslint --fix", "prettier --write"]
}
EOF

# 6. Start development server
npm run dev  # http://localhost:5173
```

### **Backend Setup (Express.js)**

```bash
# 1. Create directory
mkdir ecommerce-backend
cd ecommerce-backend

# 2. Initialize Node project
npm init -y

# 3. Install dependencies
npm install express cors dotenv mongodb bcryptjs jsonwebtoken
npm install -D nodemon eslint prettier

# 4. Create .env
cat > .env << 'EOF'
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=ecommerce
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_EXPIRE=15m
REFRESH_TOKEN_SECRET=your-refresh-secret-key-min-32-chars
REFRESH_TOKEN_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
EOF

# 5. Create basic server structure
mkdir routes controllers middleware models lib

# 6. Start server
npm run dev  # http://localhost:3001
```

---

## 📁 Frontend Folder Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx         # Navbar with auth
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── products/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── ProductFilter.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── PaginationControls.jsx
│   │   ├── cart/
│   │   │   ├── CartItem.jsx
│   │   │   ├── CartSummary.jsx
│   │   │   └── EmptyCart.jsx
│   │   ├── checkout/
│   │   │   ├── CheckoutForm.jsx
│   │   │   ├── ShippingForm.jsx
│   │   │   └── OrderConfirmation.jsx
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   ├── UserManagement.jsx
│   │   │   └── Analytics.jsx
│   │   └── layout/
│   │       ├── MainLayout.jsx
│   │       ├── AdminLayout.jsx
│   │       └── AuthLayout.jsx
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── OrdersPage.jsx
│   │   ├── OrderDetailPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminProductsPage.jsx
│   │   ├── AdminUsersPage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js            # Auth state & methods
│   │   ├── useCart.js            # Cart operations
│   │   ├── useFetch.js           # Data fetching with loading/error
│   │   ├── useDebounce.js        # Debounced search
│   │   ├── useLocalStorage.js    # localStorage persistence
│   │   ├── useAsync.js           # Async operations
│   │   └── useForm.js            # Form state (if custom)
│   │
│   ├── store/
│   │   ├── index.js              # Store configuration
│   │   ├── slices/
│   │   │   ├── authSlice.js      # Auth reducer
│   │   │   ├── productsSlice.js  # Products reducer
│   │   │   ├── cartSlice.js      # Cart reducer
│   │   │   ├── ordersSlice.js    # Orders reducer
│   │   │   ├── filtersSlice.js   # Filter state
│   │   │   └── uiSlice.js        # UI state (modals, etc)
│   │   └── api/
│   │       ├── authApi.js        # Auth API calls
│   │       ├── productsApi.js    # Products API calls
│   │       ├── ordersApi.js      # Orders API calls
│   │       └── userApi.js        # User API calls
│   │
│   ├── services/
│   │   ├── api.js               # Fetch wrapper with auth
│   │   ├── axiosConfig.js       # Axios instance & interceptors
│   │   ├── storage.js           # localStorage helpers
│   │   └── upload.js            # File upload service
│   │
│   ├── utils/
│   │   ├── formatters.js        # formatPrice, formatDate, etc
│   │   ├── validators.js        # validateEmail, validatePassword
│   │   ├── constants.js         # APP_NAME, ROLES, etc
│   │   ├── helpers.js           # Generic helper functions
│   │   └── errors.js            # Error handling utilities
│   │
│   ├── styles/
│   │   ├── index.css            # Global styles
│   │   ├── tailwind.css         # Tailwind directives
│   │   └── animations.css       # Custom animations
│   │
│   ├── App.jsx                  # Main app component
│   ├── App.css
│   └── main.jsx                 # Entry point
│
├── tests/
│   ├── components/
│   │   ├── LoginForm.test.jsx
│   │   ├── ProductCard.test.jsx
│   │   └── CartItem.test.jsx
│   ├── hooks/
│   │   ├── useAuth.test.js
│   │   ├── useCart.test.js
│   │   └── useFetch.test.js
│   ├── utils/
│   │   ├── formatters.test.js
│   │   └── validators.test.js
│   └── setup.js                 # Jest configuration
│
├── public/
│   ├── index.html
│   └── assets/
│
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.js
├── postcss.config.js
├── jest.config.js
├── vite.config.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 📁 Backend Folder Structure

```
backend/
├── routes/
│   ├── auth.js              # POST /register, /login, /refresh, /logout
│   ├── users.js             # GET, PUT, DELETE users
│   ├── products.js          # CRUD products
│   ├── orders.js            # CRUD orders
│   ├── cart.js              # Cart operations
│   ├── upload.js            # Image upload
│   └── analytics.js         # Dashboard metrics
│
├── controllers/
│   ├── authController.js    # Auth business logic
│   ├── userController.js
│   ├── productController.js
│   ├── orderController.js
│   └── cartController.js
│
├── middleware/
│   ├── auth.js              # JWT verification
│   ├── errorHandler.js      # Error handling
│   ├── validation.js        # Input validation
│   ├── cors.js              # CORS config
│   ├── rateLimiter.js       # Rate limiting
│   └── logging.js           # Request logging
│
├── models/
│   ├── User.js              # User queries
│   ├── Product.js           # Product queries
│   ├── Order.js             # Order queries
│   ├── Cart.js              # Cart queries
│   └── Review.js            # Review queries
│
├── lib/
│   ├── mongodb.js           # MongoDB connection
│   ├── jwt.js               # JWT utilities
│   ├── bcrypt.js            # Password hashing
│   ├── validations.js       # Zod schemas
│   └── errors.js            # Custom error classes
│
├── scripts/
│   └── seed.js              # Database seeding
│
├── config/
│   ├── database.js          # DB config
│   └── constants.js         # App constants
│
├── .env.example
├── .env                     # (git ignored)
├── .eslintrc.json
├── .prettierrc
├── server.js                # Main server file
├── package.json
└── README.md
```

---

## 🔐 Authentication Flow (Custom JWT)

```
1. User Registration
   ├─ POST /api/auth/register { email, password, full_name }
   ├─ Hash password: bcryptjs.hash()
   ├─ Save to MongoDB
   └─ Return: { userId, email, role }

2. User Login
   ├─ POST /api/auth/login { email, password }
   ├─ Verify password: bcryptjs.compare()
   ├─ Generate tokens:
   │  ├─ accessToken (15 min): for API calls
   │  └─ refreshToken (7 days): for refresh
   ├─ Set httpOnly cookies
   └─ Return: { accessToken, user }

3. Protected API Calls
   ├─ Client sends: Authorization: "Bearer <accessToken>"
   ├─ Middleware verifies token: jwt.verify()
   ├─ If valid: proceed
   └─ If expired: refresh token OR redirect to login

4. Token Refresh
   ├─ POST /api/auth/refresh-token
   ├─ Use refreshToken from cookie
   ├─ Generate new accessToken
   └─ Return: { accessToken }

5. Logout
   ├─ POST /api/auth/logout
   ├─ Clear cookies on client
   ├─ Optional: blacklist token (if needed)
   └─ Redirect to login
```

---

## 💾 Data Flow (Redux)

```
Redux Store Structure:
├── auth/
│  ├── user: { userId, email, role }
│  ├── isAuthenticated: boolean
│  ├── loading: boolean
│  └── error: string
├── products/
│  ├── items: []
│  ├── totalCount: number
│  ├── filters: { search, category, priceRange, sort }
│  ├── currentPage: number
│  ├── loading: boolean
│  └── error: string
├── cart/
│  ├── items: []
│  ├── totalPrice: number
│  ├── totalQuantity: number
│  └── cartCount: number
├── orders/
│  ├── userOrders: []
│  ├── currentOrder: null
│  ├── loading: boolean
│  └── error: string
└── ui/
   ├── sidebarOpen: boolean
   ├── modals: { editProduct, deleteConfirm }
   └── notifications: []

Component → Action → Reducer → State Update → Re-render
```

---

## 🔌 API Client Setup

### **Using Axios with Interceptors:**

```javascript
// services/axiosConfig.js
import axios from "axios";
import { store } from "../store";
import { logout } from "../store/slices/authSlice";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add token
API.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle token expiration
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh token
        const { data } = await axios.post(
          `${API.defaults.baseURL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        
        // Update token in store
        store.dispatch(setAccessToken(data.accessToken));
        
        // Retry original request
        return API(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default API;
```

---

## 🧪 Testing Examples

### **Unit Test - Custom Hook**

```javascript
// hooks/useAuth.test.js
import { renderHook, act } from "@testing-library/react";
import { useAuth } from "./useAuth";

describe("useAuth", () => {
  it("should login successfully", async () => {
    const { result } = renderHook(() => useAuth());
    
    await act(async () => {
      await result.current.login("user@example.com", "password123");
    });
    
    expect(result.current.user).toBeDefined();
    expect(result.current.isAuthenticated).toBe(true);
  });

  it("should logout user", async () => {
    const { result } = renderHook(() => useAuth());
    
    await act(async () => {
      result.current.logout();
    });
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});
```

### **Component Test - Login Form**

```javascript
// components/auth/LoginForm.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { LoginForm } from "./LoginForm";
import { store } from "../../store";

describe("LoginForm", () => {
  it("displays validation error for invalid email", async () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
    
    const submitButton = screen.getByText("Đăng nhập");
    fireEvent.click(submitButton);
    
    const error = await screen.findByText("Email không hợp lệ");
    expect(error).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    render(
      <Provider store={store}>
        <LoginForm onSuccess={() => {}} />
      </Provider>
    );
    
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Mật khẩu");
    const submitButton = screen.getByText("Đăng nhập");
    
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);
    
    // Assert API call was made or onSuccess was called
  });
});
```

---

## 📝 Environment Variables

### **Frontend (.env.local)**

```env
# API Configuration
VITE_API_URL=http://localhost:3001/api

# App Configuration
VITE_APP_NAME=E-Commerce Thiết Bị Điện Tử
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=true
```

### **Backend (.env)**

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=ecommerce

# Authentication
JWT_SECRET=your-super-secret-key-minimum-32-characters-long
JWT_EXPIRE=15m
REFRESH_TOKEN_SECRET=your-refresh-secret-minimum-32-chars
REFRESH_TOKEN_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:5173

# File Upload (TBD)
# CLOUDINARY_CLOUD_NAME=...
# CLOUDINARY_API_KEY=...
```

---

## 🚀 NPM Scripts

### **Frontend**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --fix",
    "format": "prettier --write src",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### **Backend**

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js",
    "lint": "eslint . --fix",
    "format": "prettier --write .",
    "seed": "node scripts/seed.js"
  }
}
```

---

## ✅ Development Checklist

- [ ] Both frontend & backend running locally
- [ ] MongoDB connected and seeded with test data
- [ ] Environment variables configured (.env files)
- [ ] API calls working (test with Postman)
- [ ] Redux DevTools working
- [ ] React Router working (navigate between pages)
- [ ] Authentication flow working (register, login, logout)
- [ ] ESLint & Prettier configured
- [ ] Husky pre-commit hooks working
- [ ] Tests running (Jest)

---

## 📚 Useful Commands

```bash
# Start development environment (run in 2 terminals)
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run dev

# MongoDB local (if not running as service)
mongod

# Code quality
npm run lint      # Check for issues
npm run format    # Auto-fix formatting

# Testing
npm test          # Run tests
npm run test:watch # Watch mode
npm run test:coverage # Coverage report

# Building
npm run build     # Production build
npm run preview   # Preview build locally
```

---

## 🔗 Useful Resources

- **React:** https://react.dev
- **Vite:** https://vitejs.dev
- **React Router:** https://reactrouter.com
- **Redux Toolkit:** https://redux-toolkit.js.org
- **Express.js:** https://expressjs.com
- **MongoDB:** https://docs.mongodb.com
- **Tailwind CSS:** https://tailwindcss.com

---

**Last Updated:** May 13, 2026  
**Status:** ✅ Ready for Development  
**Version:** 1.0 (React.js Edition)
