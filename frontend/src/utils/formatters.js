export function formatPrice(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getCartTotals(items) {
  return items.reduce(
    (totals, item) => ({
      quantity: totals.quantity + item.quantity,
      subtotal: totals.subtotal + item.price * item.quantity,
    }),
    { quantity: 0, subtotal: 0 }
  );
}
