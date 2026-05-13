import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, Heart, PackageCheck, ShieldCheck, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../hooks/useCart.jsx";
import { productsApi } from "../store/api/productsApi.js";
import { formatPrice } from "../utils/formatters.js";
import { normalizeProduct } from "../utils/productMapper.js";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    productsApi
      .detail(id)
      .then((data) => {
        setProduct(normalizeProduct(data.product));
        setError("");
      })
      .catch((err) => {
        setProduct(null);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <main className="min-h-screen bg-page px-6 py-16"><div className="mx-auto max-w-app text-2xl font-bold">Đang tải sản phẩm...</div></main>;
  if (!product) return <main className="min-h-screen bg-page px-6 py-16"><div className="mx-auto max-w-app"><h1 className="text-2xl font-bold">Không tìm thấy sản phẩm</h1>{error && <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">{error}</p>}</div></main>;

  const originalPrice = product.oldPrice || product.originalPrice || product.price;

  return (
    <main className="min-h-screen bg-page py-10">
      <div className="mx-auto max-w-app px-6">
        <Link to="/products" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"><ChevronLeft className="h-4 w-4" /> Quay lại sản phẩm</Link>
        <section className="grid gap-8 rounded-2xl border border-line bg-white p-5 shadow-soft lg:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-xl bg-soft"><img src={product.image} alt={product.name} className="h-full min-h-[360px] w-full object-cover" /></div>
          <div className="space-y-5 p-2">
            <span className="inline-flex rounded-full bg-[#d8e2ff] px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">{product.badge}</span>
            <h1 className="text-3xl font-bold leading-tight text-ink md:text-4xl">{product.name}</h1>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex">{[1, 2, 3, 4, 5].map((star) => <Star key={star} className={`h-4 w-4 ${star <= Math.floor(product.rating || 0) ? "fill-amber-500 text-amber-500" : "fill-gray-200 text-gray-200"}`} />)}</div>
              <strong>{product.rating}</strong>
              <span className="text-muted">({product.reviews} đánh giá)</span>
            </div>
            <p className="text-base leading-7 text-[#414754]">{product.description}</p>
            <div className="flex items-baseline gap-3">
              <strong className="text-3xl text-accent">{formatPrice(product.price)}</strong>
              {originalPrice > product.price && <span className="text-sm text-muted line-through">{formatPrice(originalPrice)}</span>}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button onClick={() => addToCart(product)} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"><ShoppingCart className="h-[18px] w-[18px]" /> Thêm vào giỏ</button>
              <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#c1c6d6] px-6 text-sm font-semibold text-ink transition-colors hover:bg-soft"><Heart className="h-[18px] w-[18px]" /> Yêu thích</button>
            </div>
            <div className="grid gap-3 border-t border-line pt-5 text-sm font-medium text-[#414754]">
              <span className="flex items-center gap-2"><PackageCheck className="h-[18px] w-[18px] text-primary" /> Còn {product.stock} sản phẩm tại kho</span>
              <span className="flex items-center gap-2"><ShieldCheck className="h-[18px] w-[18px] text-primary" /> Bảo hành chính hãng 12 tháng</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
