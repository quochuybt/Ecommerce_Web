export function normalizeProduct(product) {
  return {
    ...product,
    image: product.image || product.image_url,
    oldPrice: product.oldPrice || product.originalPrice || product.price,
    originalPrice: product.originalPrice || product.oldPrice || product.price,
    price: product.discount_price || product.price,
    reviews: product.reviews || product.review_count || 0,
    badge: product.badge || (product.is_featured ? "Nổi bật" : "Mới"),
  };
}

export function normalizeProducts(products) {
  return products.map(normalizeProduct);
}
