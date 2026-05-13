# API Spec

Base URL: `http://localhost:3001/api`

## Authentication

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh-token`
- `POST /auth/logout`
- `GET /auth/me`

## Users

- `GET /users`
- `GET /users/:id`
- `PUT /users/:id`
- `DELETE /users/:id`
- `GET /users/:id/orders`

## Products

- `GET /products?search=&category=&minPrice=&maxPrice=&sort=&page=&limit=`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

## Orders

- `POST /orders`
- `GET /orders`
- `GET /orders/:id`
- `PUT /orders/:id`
- `DELETE /orders/:id`

## Cart

- `GET /cart`
- `POST /cart/items`
- `PUT /cart/items/:itemId`
- `DELETE /cart/items/:itemId`

## Upload and Analytics

- `POST /upload`
- `GET /analytics/dashboard`
