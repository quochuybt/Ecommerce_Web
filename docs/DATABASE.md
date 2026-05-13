# Database

Planned MongoDB collections:

- `users`
- `categories`
- `products`
- `cart_items`
- `orders`
- `reviews`
- `sales_metrics`

Indexes to add during the MongoDB sprint:

- `users.email` unique
- `products.slug` unique
- `products.category_id`
- text index on `products.name` and `products.description`
- `cart_items.user_id + product_id` unique
- `orders.user_id`, `orders.status`, `orders.created_at`
