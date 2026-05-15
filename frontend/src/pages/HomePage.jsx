import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BadgeCheck,
  Cable,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Headphones,
  HousePlug,
  Laptop,
  ShieldCheck,
  Smartphone,
  Tablet,
  Truck,
  Watch,
} from "lucide-react";
import ProductCard from "../components/products/ProductCard.jsx";
import { productsApi } from "../store/api/productsApi.js";
import { normalizeProducts } from "../utils/productMapper.js";

const categories = [
  { name: "Điện thoại", slug: "Dien thoai", icon: Smartphone },
  { name: "Laptop", slug: "Laptop", icon: Laptop },
  { name: "Tablet", slug: "Tablet", icon: Tablet },
  { name: "Phụ kiện", slug: "Phu kien", icon: Cable },
  { name: "Đồng hồ", slug: "Dong ho", icon: Watch },
  { name: "Âm thanh", slug: "Phu kien", icon: Headphones },
  { name: "Gaming", slug: "Laptop", icon: Gamepad2 },
  { name: "Smart home", slug: "Phu kien", icon: HousePlug },
];

const heroSlides = [
  {
    eyebrow: "E-Commerce Electronics",
    title: "Khám phá thế giới công nghệ, mua sắm thả ga.",
    description:
      "CommerceHub tích hợp React, Tailwind, Express API và MongoDB Atlas.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=85",
  },
  {
    eyebrow: "Laptop & Gaming Gear",
    title: "Hiệu năng mạnh mẽ cho học tập, làm việc và giải trí.",
    description:
      "Chọn laptop, phụ kiện và thiết bị gaming phù hợp với nhu cầu của bạn.",
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1600&q=85",
  },
  {
    eyebrow: "Smart Devices",
    title: "Nâng cấp không gian sống với thiết bị thông minh.",
    description:
      "Tìm điện thoại, đồng hồ, tai nghe và sản phẩm smart home mới nhất.",
    image:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1600&q=85",
  },
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = heroSlides[activeSlide];

  const showPreviousSlide = () => {
    setActiveSlide((slide) =>
      slide === 0 ? heroSlides.length - 1 : slide - 1,
    );
  };

  const showNextSlide = () => {
    setActiveSlide((slide) => (slide + 1) % heroSlides.length);
  };

  useEffect(() => {
    const interval = window.setInterval(showNextSlide, 3000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    productsApi
      .list("?limit=4&sort=rating")
      .then((data) => {
        setProducts(normalizeProducts(data.items || []));
        setError("");
      })
      .catch((err) => {
        setProducts([]);
        setError(err.message);
      });
  }, []);

  return (
    <main className="min-h-screen bg-page" id="home-page">
      <section
        className="relative h-[420px] overflow-hidden md:h-[520px]"
        id="hero-banner"
      >
        {heroSlides.map((slide, index) => (
          <img
            key={slide.title}
            src={slide.image}
            alt={slide.title}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out ${
              activeSlide === index ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto flex h-full max-w-app items-center px-6">
          <div key={currentSlide.title} className="max-w-xl animate-hero-copy space-y-5">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              {currentSlide.eyebrow}
            </span>
            <h1 className="text-3xl font-bold leading-tight text-white drop-shadow-lg md:text-5xl">
              {currentSlide.title}
            </h1>
            <p className="max-w-md text-base text-white/85 md:text-lg">
              {currentSlide.description}
            </p>
            <div className="flex gap-3 pt-2">
              <Link
                to="/products"
                className="flex h-11 items-center rounded-lg bg-white px-6 text-sm font-semibold text-primary shadow-md hover:bg-white/90"
              >
                Mua ngay
              </Link>
              <Link
                to="/admin/dashboard"
                className="flex h-11 items-center rounded-lg border border-white/50 px-6 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10"
              >
                Xem dashboard
              </Link>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={showPreviousSlide}
          aria-label="Slide trước"
          className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={showNextSlide}
          aria-label="Slide sau"
          className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`Chuyển đến slide ${index + 1}`}
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 rounded-full transition-all ${activeSlide === index ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"}`}
            />
          ))}
        </div>
      </section>

      <section className="py-12" id="category-section">
        <div className="mx-auto max-w-app px-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-ink">Danh mục sản phẩm</h2>
            <Link
              to="/products"
              className="text-sm font-medium text-primary hover:underline"
            >
              Xem tất cả →
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-8">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  to={`/products?category=${encodeURIComponent(cat.slug)}`}
                  className="group flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-line bg-white p-3 transition-all hover:border-primary hover:shadow-md"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d8e2ff] transition-colors group-hover:bg-primary">
                    <Icon className="h-6 w-6 text-primary transition-colors group-hover:text-white" />
                  </span>
                  <span className="text-center text-xs font-medium leading-tight text-[#414754]">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-soft py-12" id="featured-products">
        <div className="mx-auto max-w-app px-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-ink">Sản phẩm nổi bật</h2>
            <Link
              to="/products"
              className="text-sm font-medium text-primary hover:underline"
            >
              Xem tất cả →
            </Link>
          </div>
          {error ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
              Không tải được sản phẩm từ backend: {error}
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-xl border border-line bg-white p-8 text-center text-sm text-muted">
              Chưa có sản phẩm trong database.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-line bg-white py-8" id="promo-strip">
        <div className="mx-auto grid max-w-app grid-cols-2 gap-6 px-6 md:grid-cols-4">
          {[
            { icon: Truck, title: "Giao nhanh", sub: "2 giờ tại nội thành" },
            {
              icon: ShieldCheck,
              title: "Bảo hành",
              sub: "Chính hãng 12 tháng",
            },
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
