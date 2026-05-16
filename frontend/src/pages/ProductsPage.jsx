import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Grid2X2, List, Search } from "lucide-react";
import ProductCard from "../components/products/ProductCard.jsx";
import { productsApi } from "../store/api/productsApi.js";
import { normalizeProducts } from "../utils/productMapper.js";

const categories = [
  { label: "Tất cả", value: "Tất cả" },
  { label: "Điện thoại", value: "Điện thoại" },
  { label: "Laptop", value: "Laptop" },
  { label: "Tablet", value: "Tablet" },
  { label: "Phụ kiện", value: "Phụ kiện" },
  { label: "Đồng hồ", value: "Đồng hồ" },
];
const sortOptions = [
  { value: "featured", label: "Nổi bật" },
  { value: "price-asc", label: "Giá: Thấp → Cao" },
  { value: "price-desc", label: "Giá: Cao → Thấp" },
  { value: "rating", label: "Đánh giá cao nhất" },
];

const MAX_PRICE_FILTER = 200000000;

function formatSliderPrice(value) {
  return Number(value || 0)
    .toLocaleString("vi-VN")
    .replace(/\./g, " ");
}

export default function ProductsPage() {
  const [params] = useSearchParams();
  const searchParam = params.get("search") || "";
  const categoryParam = params.get("category") || "Tất cả";
  const [filters, setFilters] = useState({
    search: searchParam,
    category: categoryParam,
    sort: "featured",
    minPrice: "",
    maxPrice: "",
  });
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [viewMode, setViewMode] = useState("grid");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFilters((current) => ({
      ...current,
      search: searchParam,
      category: categoryParam,
    }));
  }, [searchParam, categoryParam]);

  useEffect(() => {
    const query = new URLSearchParams();
    if (filters.search) query.set("search", filters.search);
    if (filters.category !== "Tất cả") query.set("category", filters.category);
    if (filters.sort) query.set("sort", filters.sort);
    if (Number(filters.minPrice) > 0) query.set("minPrice", filters.minPrice);
    if (filters.maxPrice && Number(filters.maxPrice) < MAX_PRICE_FILTER)
      query.set("maxPrice", filters.maxPrice);
    query.set("limit", "24");

    setLoading(true);
    productsApi
      .list(`?${query.toString()}`)
      .then((data) => {
        setProducts(normalizeProducts(data.items || []));
        setTotal(data.total || 0);
        setError("");
      })
      .catch((err) => {
        setProducts([]);
        setTotal(0);
        setError(`Không tải được sản phẩm từ backend: ${err.message}`);
      })
      .finally(() => setLoading(false));
  }, [filters]);

  const selectedMaxPrice = Number(filters.maxPrice || MAX_PRICE_FILTER);
  const priceProgress = Math.min(
    100,
    Math.max(0, (selectedMaxPrice / MAX_PRICE_FILTER) * 100),
  );
  const productRows = useMemo(() => {
    const minPrice = Number(filters.minPrice || 0);
    const maxPrice = Number(filters.maxPrice || MAX_PRICE_FILTER);

    return products.filter((product) => {
      const price = Number(product.price || 0);
      return price >= minPrice && price <= maxPrice;
    });
  }, [filters.maxPrice, filters.minPrice, products]);

  return (
    <main className="min-h-screen bg-page py-10" id="product-list-page">
      <div className="mx-auto max-w-app px-6">
        <nav
          className="mb-6 flex items-center gap-2 text-sm text-muted"
          id="breadcrumb"
        >
          <Link to="/" className="transition-colors hover:text-primary">
            Trang chủ
          </Link>
          <span>›</span>
          <span className="font-medium text-ink">Sản phẩm</span>
        </nav>

        <div className="mb-8 overflow-hidden rounded-[2rem] bg-[#101828] p-6 text-white shadow-glow md:p-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-mint">
                Catalog
              </p>
              <h1 className="text-3xl font-black tracking-tight md:text-4xl">
                Sản phẩm
              </h1>
              <p className="mt-2 text-sm text-white/70">
                {loading
                  ? "Đang tải dữ liệu..."
                  : `Khám phá ${productRows.length} sản phẩm phù hợp`}
              </p>
            </div>

          </div>
          {error && (
            <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              {error}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full shrink-0 space-y-6 lg:w-[260px]">
            <div className="glass-panel rounded-3xl p-5">
              <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-ink">
                Tìm kiếm
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  value={filters.search}
                  onChange={(event) =>
                    setFilters({ ...filters, search: event.target.value })
                  }
                  className="h-11 w-full rounded-full border border-line bg-white/85 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  placeholder="iPhone, laptop..."
                />
              </div>
            </div>
            <div className="glass-panel rounded-3xl p-5">
              <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-ink">
                Danh mục
              </h3>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat.value}>
                    <button
                      onClick={() =>
                        setFilters({ ...filters, category: cat.value })
                      }
                      className={`w-full rounded-full px-3 py-2 text-left text-sm font-bold transition-all ${filters.category === cat.value ? "bg-gradient-to-r from-primary to-mint text-white shadow-sm" : "text-[#414754] hover:bg-white"}`}
                    >
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-panel rounded-3xl p-5">
              <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-ink">
                Khoảng giá
              </h3>
              <div className="rounded-2xl bg-white/80 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-muted">0 đ</span>
                  <span className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">
                    {formatSliderPrice(filters.maxPrice || MAX_PRICE_FILTER)} đ
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={MAX_PRICE_FILTER}
                  step="500000"
                  value={selectedMaxPrice}
                  onChange={(event) =>
                    setFilters({
                      ...filters,
                      minPrice: "",
                      maxPrice:
                        Number(event.target.value) === MAX_PRICE_FILTER
                          ? ""
                          : event.target.value,
                    })
                  }
                  className="h-2 w-full cursor-pointer appearance-none rounded-full accent-primary"
                  style={{
                    background: `linear-gradient(90deg, #2563eb 0%, #14b8a6 ${priceProgress}%, #d8dee9 ${priceProgress}%, #d8dee9 100%)`,
                  }}
                  aria-label="Chọn giá tối đa"
                />
              </div>
              <p className="mt-2 text-xs font-medium text-muted">
                Hiển thị sản phẩm có giá từ 0 đến mức đang chọn.
              </p>
            </div>
          </aside>

          <section className="min-w-0 flex-1">
            <div className="mb-6 flex items-center justify-between rounded-3xl border border-white/80 bg-white/75 px-4 py-3 shadow-sm backdrop-blur-xl">
              <span className="text-sm text-[#414754]">
                Hiển thị{" "}
                <span className="font-semibold text-ink">
                  {productRows.length}
                </span>{" "}
                sản phẩm
              </span>
              <div className="flex items-center gap-3">
                <select
                  value={filters.sort}
                  onChange={(event) =>
                    setFilters({ ...filters, sort: event.target.value })
                  }
                  className="h-10 rounded-full border border-line bg-white px-3 pr-8 text-sm font-semibold text-ink outline-none focus:border-primary"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="hidden overflow-hidden rounded-full border border-line bg-white sm:flex">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2.5 ${viewMode === "grid" ? "bg-primary text-white" : "text-muted hover:bg-soft"}`}
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2.5 ${viewMode === "list" ? "bg-primary text-white" : "text-muted hover:bg-soft"}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {productRows.length === 0 ? (
              <div className="rounded-3xl border border-white bg-white/80 p-16 text-center shadow-sm backdrop-blur">
                <h2 className="mb-1 text-lg font-bold text-ink">
                  Không tìm thấy sản phẩm
                </h2>
                <p className="text-sm text-[#414754]">
                  {loading
                    ? "Đang tải..."
                    : "Database chưa có sản phẩm hoặc bộ lọc không khớp."}
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 gap-5 md:grid-cols-3"
                    : "space-y-4"
                }
              >
                {productRows.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
