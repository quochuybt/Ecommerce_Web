import { Link, useLocation, useNavigate } from "react-router-dom";
import { CreditCard, ShoppingCart, Star } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useCart } from "../../hooks/useCart.jsx";
import { formatPrice } from "../../utils/formatters.js";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const image = product.image || product.image_url;
  const originalPrice = product.oldPrice || product.originalPrice || product.price;
  const discount = originalPrice > product.price ? Math.round((1 - product.price / originalPrice) * 100) : 0;

  function goToLogin() {
    navigate("/login", { state: { from: `${location.pathname}${location.search}` } });
  }

  async function handleAddToCart() {
    if (!user) {
      goToLogin();
      return;
    }

    await addToCart(product);
  }

  async function handleBuyNow() {
    if (!user) {
      goToLogin();
      return;
    }

    await addToCart(product);
    navigate("/checkout");
  }

  return (
    <article className="group mesh-border overflow-hidden rounded-[1.35rem] bg-white/90 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50">
          {image ? (
            <img src={image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          ) : (
            <div className="text-center text-muted">
              <ShoppingCart className="mx-auto mb-1 h-10 w-10" />
              <p className="text-xs">Ảnh sản phẩm</p>
            </div>
          )}

          {product.badge && (
            <span className="absolute left-2.5 top-2.5 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute right-2.5 top-2.5 rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
              -{discount}%
            </span>
          )}
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-ink transition-colors hover:text-primary">{product.name}</h3>
        </Link>
        <span className="inline-block rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-primary">{product.category}</span>
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
        <div className="grid gap-2 sm:grid-cols-2">
          <button
            onClick={handleAddToCart}
            className="mt-1 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-mint text-sm font-bold text-white shadow-sm transition-all active:scale-[0.98] hover:shadow-glow"
          >
            <ShoppingCart className="h-4 w-4" />
            Thêm
          </button>
          <button
            onClick={handleBuyNow}
            className="mt-1 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-bold text-white shadow-sm transition-all active:scale-[0.98] hover:bg-accent hover:shadow-card"
          >
            <CreditCard className="h-4 w-4" />
            Mua ngay
          </button>
        </div>
      </div>
    </article>
  );
}
