import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, Headphones, ShieldCheck, Truck } from "lucide-react";
import ProductCard from "../components/products/ProductCard.jsx";
import { products as fallbackProducts } from "../data/products.js";
import { productsApi } from "../store/api/productsApi.js";
import { normalizeProducts } from "../utils/productMapper.js";

const categories = [
  { name: "Điện thoại", slug: "Dien thoai", icon: "M7 2h10l4 20 4-20H7z" },
  { name: "Laptop", slug: "Laptop", icon: "M3 5h18v11H3z M2 19h20" },
  { name: "Tablet", slug: "Tablet", icon: "M6 2h12v20H6z" },
  { name: "Phụ kiện", slug: "Phu kien", icon: "M12 3v18M3 12h18" },
  { name: "Đồng hồ", slug: "Dong ho", icon: "M12 8v4l3 2M8 2h8M8 22h8" },
  { name: "Âm thanh", slug: "Phu kien", icon: "M4 13a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-2v-8h4" },
  { name: "Gaming", slug: "Laptop", icon: "M6 12h12M9 9v6M15 9h.01M17 15h.01" },
  { name: "Smart home", slug: "Phu kien", icon: "M3 11l9-8 9 8v9H3z" },
];

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productsApi
      .list("?limit=4&sort=rating")
      .then((data) => setProducts(normalizeProducts(data.items || [])))
      .catch(() => setProducts(fallbackProducts.slice(0, 4)));
  }, []);

  return (
    <main className="min-h-screen bg-page" id="home-page">
      <section className="relative h-[420px] overflow-hidden md:h-[520px]" id="hero-banner">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=85"
          alt="CommerceHub electronics"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto flex h-full max-w-app items-center px-6">
          <div className="max-w-xl space-y-5">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              E-Commerce Electronics
            </span>
            <h1 className="text-3xl font-bold leading-tight text-white drop-shadow-lg md:text-5xl">Khám phá thế giới công nghệ, mua sắm thả ga.</h1>
            <p className="max-w-md text-base text-white/85 md:text-lg">CommerceHub tích hợp React, Tailwind, Express API và MongoDB Atlas cho trải nghiệm mua sắm đầy đủ.</p>
            <div className="flex gap-3 pt-2">
              <Link to="/products" className="flex h-11 items-center rounded-lg bg-white px-6 text-sm font-semibold text-primary shadow-md transition-all hover:bg-white/90">
                Mua ngay
              </Link>
              <Link to="/admin/dashboard" className="flex h-11 items-center rounded-lg border border-white/50 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10">
                Xem dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12" id="category-section">
        <div className="mx-auto max-w-app px-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-ink">Danh mục sản phẩm</h2>
            <Link to="/products" className="text-sm font-medium text-primary hover:underline">Xem tất cả →</Link>
          </div>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-8">
            {categories.map((cat) => (
              <Link key={cat.name} to={`/products?category=${encodeURIComponent(cat.slug)}`} className="group flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-line bg-white p-3 transition-all hover:border-primary hover:shadow-md">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d8e2ff] transition-colors group-hover:bg-primary">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary transition-colors group-hover:text-white">
                    <path d={cat.icon} />
                  </svg>
                </span>
                <span className="text-center text-xs font-medium leading-tight text-[#414754]">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-soft py-12" id="featured-products">
        <div className="mx-auto max-w-app px-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-ink">Sản phẩm nổi bật</h2>
            <Link to="/products" className="text-sm font-medium text-primary hover:underline">Xem tất cả →</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-8" id="promo-strip">
        <div className="mx-auto grid max-w-app grid-cols-2 gap-6 px-6 md:grid-cols-4">
          {[
            { icon: Truck, title: "Giao nhanh", sub: "2 giờ tại nội thành" },
            { icon: ShieldCheck, title: "Bảo hành", sub: "Chính hãng 12 tháng" },
            { icon: BadgeCheck, title: "Đổi trả", sub: "7 ngày linh hoạt" },
            { icon: Headphones, title: "Hỗ trợ", sub: "Tư vấn 24/7" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d8e2ff] text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="text-xs text-muted">{item.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
