# ElectroHub - E-Commerce Electronics Platform

ElectroHub là ứng dụng web thương mại điện tử bán thiết bị điện tử. Hệ thống gồm frontend React + Vite và backend Express.js, hỗ trợ người dùng mua hàng, quản lý giỏ hàng, đặt hàng, theo dõi đơn hàng, cập nhật hồ sơ cá nhân và khu vực quản trị cho admin.

## Mục Tiêu Dự Án

- Xây dựng web app thương mại điện tử có thể chạy local và triển khai lên môi trường online.
- Tách rõ frontend, backend, API và database.
- Có chức năng xác thực người dùng, phân quyền admin/user.
- Có các nghiệp vụ cốt lõi của website bán hàng: sản phẩm, giỏ hàng, đơn hàng, thanh toán giả lập, dashboard.
- Có tài liệu mô tả cấu trúc, API, database và cách deploy.

## Chức Năng Chính

### Người Dùng

- Đăng ký tài khoản.
- Đăng nhập, đăng xuất.
- Duy trì phiên đăng nhập bằng access token và refresh token.
- Xem trang chủ với danh sách sản phẩm nổi bật.
- Xem danh sách sản phẩm.
- Tìm kiếm sản phẩm theo từ khóa.
- Lọc sản phẩm theo danh mục, giá và sắp xếp.
- Phân trang danh sách sản phẩm.
- Xem chi tiết sản phẩm.
- Thêm sản phẩm vào giỏ hàng.
- Cập nhật số lượng hoặc xóa sản phẩm trong giỏ hàng.
- Đặt hàng và xem lịch sử đơn hàng.
- Xem và cập nhật thông tin cá nhân.
- Upload avatar cá nhân.

### Quản Trị Viên

- Đăng nhập với tài khoản admin.
- Truy cập dashboard quản trị.
- Xem thống kê doanh thu, tổng đơn hàng, tổng sản phẩm, tổng người dùng.
- Xem danh sách sản phẩm nổi bật/top rating.
- Thêm sản phẩm mới.
- Cập nhật thông tin sản phẩm.
- Xóa sản phẩm.
- Quản lý người dùng và đơn hàng thông qua API backend.

### Backend/API

- REST API cho frontend.
- Xác thực bằng JWT.
- Hash mật khẩu bằng bcryptjs.
- Phân quyền route bằng middleware `verifyAuth` và `checkAdmin`.
- Kết nối MongoDB.
- Xử lý lỗi API thống nhất.
- Hỗ trợ upload ảnh local.
- Hỗ trợ CORS cho môi trường local và deploy.

## Tech Stack

### Frontend

- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Lucide React
- LocalStorage cho token, cart và thông tin người dùng

### Backend

- Node.js
- Express.js
- MongoDB native driver
- JSON Web Token
- bcryptjs
- Zod
- dotenv
- CORS

### Deployment

- Frontend: Vercel/Netlify
- Backend: Render
- Database: MongoDB Atlas

## Cấu Trúc Thư Mục

```text
.
|-- backend/
|   |-- lib/                 # Kết nối MongoDB, xử lý JWT
|   |-- middleware/          # Auth middleware, error handler
|   |-- routes/              # REST API routes
|   |-- scripts/             # Seed data, ping database
|   |-- server.js            # Entry point backend
|   `-- package.json
|
|-- frontend/
|   |-- src/
|   |   |-- components/      # UI components dùng lại
|   |   |-- hooks/           # Custom hooks
|   |   |-- pages/           # Các trang chính
|   |   |-- services/        # API service, storage helper
|   |   |-- store/           # Cấu trúc state/API slice
|   |   `-- utils/           # Hàm tiện ích
|   |-- index.html
|   |-- vite.config.js
|   `-- package.json
|
|-- docs/
|   |-- API_SPEC.md          # Danh sách API
|   |-- ARCHITECTURE.md      # Kiến trúc hệ thống
|   |-- DATABASE.md          # Mô tả database/schema
|   |-- DEPLOYMENT.md        # Hướng dẫn deploy
|   `-- SETUP.md             # Hướng dẫn cài đặt
|
|-- render.yaml              # Cấu hình deploy backend Render
|-- package.json             # Script tổng
`-- README.md
```

## Yêu Cầu Cài Đặt

- Node.js 18 trở lên.
- npm.
- MongoDB local hoặc MongoDB Atlas.
- Git.

## Cấu Hình Môi Trường

Tạo file `.env` trong thư mục `backend/`:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/electrohub
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
CORS_ORIGIN=http://localhost:5173
```

Tạo file `.env` trong thư mục `frontend/` nếu cần đổi API URL:

```env
VITE_API_URL=http://localhost:3001/api
```

## Chạy Dự Án Local

### 1. Cài đặt dependencies

```bash
npm install
npm --prefix frontend install
npm --prefix backend install
```

Trên Windows PowerShell, nếu bị chặn `npm.ps1`, có thể dùng `npm.cmd`:

```bash
npm.cmd --prefix frontend install
npm.cmd --prefix backend install
```

### 2. Chạy backend

```bash
npm run dev:backend
```

Backend chạy tại:

```text
http://localhost:3001/api
```

Kiểm tra health check:

```text
http://localhost:3001/api/health
```

### 3. Chạy frontend

```bash
npm run dev:frontend
```

Frontend chạy tại:

```text
http://localhost:5173
```

### 4. Seed dữ liệu mẫu

```bash
cd backend
npm run seed
```

## Tài Khoản Demo

```text
User:
Email: user@example.com
Password: User12345

Admin:
Email: admin@example.com
Password: Admin12345
```

## API Chính

Base URL:

```text
http://localhost:3001/api
```

### Authentication

```text
POST /auth/register
POST /auth/login
POST /auth/refresh-token
POST /auth/logout
GET  /auth/me
```

### Users

```text
GET    /users
GET    /users/:id
PUT    /users/:id
DELETE /users/:id
GET    /users/:id/orders
```

### Products

```text
GET    /products?search=&category=&minPrice=&maxPrice=&sort=&page=&limit=
GET    /products/:id
POST   /products
PUT    /products/:id
DELETE /products/:id
```

### Orders

```text
POST   /orders
GET    /orders
GET    /orders/:id
PUT    /orders/:id
DELETE /orders/:id
```

### Cart

```text
GET    /cart
POST   /cart/items
PUT    /cart/items/:itemId
DELETE /cart/items/:itemId
```

### Upload & Analytics

```text
POST /upload
GET  /analytics/dashboard
```

## Luồng Hoạt Động Chính

1. Người dùng đăng ký hoặc đăng nhập.
2. Backend kiểm tra tài khoản, hash/compare password và trả về JWT.
3. Frontend lưu token trong localStorage.
4. Khi gọi API cần đăng nhập, frontend gửi header `Authorization: Bearer <token>`.
5. Backend verify token, lấy thông tin user và kiểm tra quyền nếu là route admin.
6. Backend đọc/ghi dữ liệu MongoDB và trả JSON cho frontend.

## Git Workflow

Repo có các nhánh chính và nhánh chức năng:

```text
main
feature/refactor_layout
fix-Auth
add-user-avatar
```

Quy trình làm việc:

- `main`: nhánh chính chứa code đã merge.
- `feature/*`: nhánh phát triển tính năng mới.
- `fix-*` hoặc `hotfix/*`: nhánh sửa lỗi.
- Tạo pull request để review và merge vào `main`.
- Commit theo hướng Conventional Commits:

```text
feat: thêm tính năng mới
fix: sửa lỗi
chore: cấu hình/hệ thống
refactor: cải tiến code không đổi hành vi
test: thêm/sửa test
```

## Build

Build frontend:

```bash
npm run build
```

Chạy backend production:

```bash
npm run start:backend
```

## Tài Liệu Kèm Theo

- `docs/API_SPEC.md`: danh sách endpoint API.
- `docs/ARCHITECTURE.md`: kiến trúc tổng quan.
- `docs/DATABASE.md`: mô tả database/schema.
- `docs/DEPLOYMENT.md`: hướng dẫn deploy.
- `docs/SETUP.md`: hướng dẫn cài đặt chi tiết.
- `docs/SPRINTS/`: báo cáo sprint.

## Ghi Chú Báo Cáo

Dự án hiện tại được triển khai theo mô hình React + Vite SPA kết hợp Express.js backend riêng. Nếu đối chiếu với yêu cầu Next.js trong đề bài, nhóm có thể phát triển tiếp bằng cách migrate frontend sang Next.js hoặc bổ sung một phiên bản Next.js cho các tính năng SSR/SSG/SEO.
