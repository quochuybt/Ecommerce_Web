import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../../hooks/useCart.jsx";
import { formatPrice } from "../../utils/formatters.js";

export default function ProductCard({ product }) {
  const [wishlist, setWishlist] = useState(false);
  const { addToCart } = useCart();
  const image = product.image || product.image_url;
  const originalPrice = product.oldPrice || product.originalPrice || product.price;
  const discount = originalPrice > product.price ? Math.round((1 - product.price / originalPrice) * 100) : 0;

  return (
    <article className="group overflow-hidden rounded-xl border border-line bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative flex h-52 items-center justify-center bg-soft">
          {image ? (
            <img src={image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <div className="text-center text-muted">
              <ShoppingCart className="mx-auto mb-1 h-10 w-10" />
              <p className="text-xs">Ảnh sản phẩm</p>
            </div>
          )}

          {product.badge && (
            <span className="absolute left-2.5 top-2.5 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute right-2.5 top-2.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-white">
              -{discount}%
            </span>
          )}
          <button
            onClick={(event) => {
              event.preventDefault();
              setWishlist(!wishlist);
            }}
            className="absolute bottom-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white opacity-0 shadow-md transition-all duration-200 hover:scale-110 group-hover:opacity-100"
            aria-label="Yêu thích"
          >
            <Heart className={`h-4 w-4 ${wishlist ? "fill-accent text-accent" : "text-muted"}`} />
          </button>
        </div>
      </Link>

      <div className="space-y-2.5 p-4">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-ink transition-colors hover:text-primary">{product.name}</h3>
        </Link>
        <span className="inline-block rounded-full bg-[#d8e2ff] px-2 py-0.5 text-[11px] font-medium text-primary">{product.category}</span>
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className={`h-[13px] w-[13px] ${star <= Math.floor(product.rating || 0) ? "fill-amber-500 text-amber-500" : "fill-gray-200 text-gray-200"}`} />
            ))}
          </div>
          <span className="text-[11px] font-medium text-[#414754]">{product.rating}</span>
          <span className="text-[11px] text-muted">({product.reviews || product.review_count || 0})</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-accent">{formatPrice(product.price)}</span>
          {originalPrice > product.price && <span className="text-xs text-muted line-through">{formatPrice(originalPrice)}</span>}
        </div>
        <button
          onClick={() => addToCart(product)}
          className="mt-1 h-9 w-full rounded-lg bg-primary text-sm font-semibold text-white transition-colors active:scale-[0.98] hover:bg-primary-dark"
        >
          Thêm vào giỏ
        </button>
      </div>
    </article>
  );
}
