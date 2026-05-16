import { useEffect, useMemo, useState } from "react";
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
  { name: "Điện thoại", value: "Điện thoại", icon: Smartphone },
  { name: "Laptop", value: "Laptop", icon: Laptop },
  { name: "Tablet", value: "Tablet", icon: Tablet },
  { name: "Phụ kiện", value: "Phụ kiện", icon: Cable },
  { name: "Đồng hồ", value: "Đồng hồ", icon: Watch },
  { name: "Âm thanh", value: "Phụ kiện", icon: Headphones },
  { name: "Gaming", value: "Laptop", icon: Gamepad2 },
  { name: "Smart home", value: "Phụ kiện", icon: HousePlug },
];

const featuredCategories = [
  { name: "Điện thoại", value: "Điện thoại" },
  { name: "Laptop", value: "Laptop" },
  { name: "Tablet", value: "Tablet" },
  { name: "Phụ kiện", value: "Phụ kiện" },
  { name: "Đồng hồ", value: "Đồng hồ" },
];

const heroSlides = [
  {
    eyebrow: "E-Commerce Electronics",
    title: "Sắm đồ công nghệ theo cách sáng hơn, nhanh hơn.",
    description:
      "CommerceHub gom laptop, điện thoại và phụ kiện thành một trải nghiệm mua sắm gọn, đẹp và dễ chọn.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=85",
  },
  {
    eyebrow: "Laptop & Gaming Gear",
    title: "Setup học, làm, chơi nhìn đã mắt từ cú click đầu tiên.",
    description:
      "Chọn laptop, phụ kiện và thiết bị gaming phù hợp với nhu cầu của bạn.",
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1600&q=85",
  },
  {
    eyebrow: "Smart Devices",
    title: "Thiết bị thông minh cho nhịp sống gọn gàng hơn.",
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
  const [activeProductShift, setActiveProductShift] = useState(0);
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
      .list("?limit=30&sort=rating")
      .then((data) => {
        setProducts(normalizeProducts(data.items || []));
        setError("");
      })
      .catch((err) => {
        setProducts([]);
        setError(err.message);
      });
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveProductShift((shift) => shift + 1);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const featuredRows = useMemo(
    () =>
      featuredCategories
        .map((category) => ({
          ...category,
          products: products.filter((product) => product.category === category.value),
        }))
        .filter((category) => category.products.length > 0),
    [products],
  );

  const getVisibleProducts = (categoryProducts) => {
    const visibleCount = Math.min(4, categoryProducts.length);
    const start = categoryProducts.length > visibleCount ? activeProductShift % categoryProducts.length : 0;

    return Array.from({ length: visibleCount }, (_, index) => categoryProducts[(start + index) % categoryProducts.length]);
  };

  return (
    <main className="min-h-screen bg-page" id="home-page">
      <section
        className="relative min-h-[560px] overflow-hidden md:min-h-[640px]"
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
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(3,7,18,0.88)_0%,rgba(15,23,42,0.68)_43%,rgba(20,184,166,0.2)_72%,rgba(249,115,22,0.2)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-page to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-app items-center px-6 py-16 md:min-h-[640px]">
          <div key={currentSlide.title} className="max-w-3xl animate-hero-copy space-y-6">
            <span className="inline-flex items-center rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-sm backdrop-blur-sm">
              {currentSlide.eyebrow}
            </span>
            <h1 className="max-w-[760px] text-4xl font-black leading-tight text-white drop-shadow-lg md:text-6xl">
              {currentSlide.title}
            </h1>
            <p className="max-w-xl text-base leading-8 text-white/85 md:text-lg">
              {currentSlide.description}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/products"
                className="flex h-12 items-center rounded-full bg-white px-7 text-sm font-bold text-primary shadow-glow transition-all hover:-translate-y-0.5 hover:bg-white/90"
              >
                Mua ngay
              </Link>
              <Link
                to="/admin/dashboard"
                className="flex h-12 items-center rounded-full border border-white/50 px-7 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/10"
              >
                Xem dashboard
              </Link>
            </div>
            <div className="grid max-w-lg grid-cols-3 gap-3 pt-5">
              {[
                ["24+", "Sản phẩm"],
                ["4.8", "Đánh giá"],
                ["2h", "Giao nhanh"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur-md">
                  <p className="text-xl font-black">{value}</p>
                  <p className="text-xs font-medium text-white/70">{label}</p>
                </div>
              ))}
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

      <section className="-mt-10 pb-14" id="category-section">
        <div className="mx-auto max-w-app px-6">
          <div className="glass-panel rounded-[2rem] p-5 md:p-7">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-black text-ink">Danh mục sản phẩm</h2>
            <Link
              to="/products"
              className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-primary"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-8">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  to={`/products?category=${encodeURIComponent(cat.value)}`}
                  className="group flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-white bg-white/85 p-3 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-card"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-teal-100 transition-colors group-hover:from-primary group-hover:to-mint">
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
        </div>
      </section>

      <section className="py-12" id="featured-products">
        <div className="mx-auto max-w-app px-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-mint">Top rated</p>
              <h2 className="text-2xl font-black text-ink">Sản phẩm nổi bật</h2>
            </div>
            <Link
              to="/products"
              className="text-sm font-bold text-primary hover:underline"
            >
              Xem tất cả →
            </Link>
          </div>
          {error ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
              Không tải được sản phẩm từ backend: {error}
            </div>
          ) : featuredRows.length === 0 ? (
            <div className="rounded-xl border border-line bg-white p-8 text-center text-sm text-muted">
              Chưa có sản phẩm trong database.
            </div>
          ) : (
            <div className="space-y-10">
              {featuredRows.map((category) => {
                const visibleProducts = getVisibleProducts(category.products);
                const shouldAnimateIncoming = category.products.length > visibleProducts.length;

                return (
                  <div key={category.value} className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/55 p-4 shadow-sm backdrop-blur-xl md:p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-mint">Danh mục</p>
                        <h3 className="text-xl font-black text-ink">{category.name}</h3>
                      </div>
                      <Link
                        to={`/products?category=${encodeURIComponent(category.value)}`}
                        className="shrink-0 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-primary"
                      >
                        Xem thêm
                      </Link>
                    </div>
                    <div
                      key={`${category.value}-${activeProductShift}`}
                      className="grid animate-product-row-shift grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                    >
                      {visibleProducts.map((product, index) => {
                        const isIncoming = shouldAnimateIncoming && index === visibleProducts.length - 1;

                        return (
                          <div
                            key={`${category.value}-${product.id}-${activeProductShift}`}
                            className={isIncoming ? "animate-product-enter" : "animate-product-settle"}
                            style={{ animationDelay: `${index * 55}ms` }}
                          >
                            <ProductCard product={product} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-white/70 bg-white/60 py-8 backdrop-blur-xl" id="promo-strip">
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
