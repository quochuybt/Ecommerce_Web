import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Grid2X2, List, Search } from "lucide-react";
import ProductCard from "../components/products/ProductCard.jsx";
import { productsApi } from "../store/api/productsApi.js";
import { normalizeProducts } from "../utils/productMapper.js";

const categories = ["Tất cả", "Dien thoai", "Laptop", "Tablet", "Phu kien", "Dong ho"];
const sortOptions = [
  { value: "featured", label: "Nổi bật" },
  { value: "price-asc", label: "Giá: Thấp → Cao" },
  { value: "price-desc", label: "Giá: Cao → Thấp" },
  { value: "rating", label: "Đánh giá cao nhất" },
];

export default function ProductsPage() {
  const [params] = useSearchParams();
  const [filters, setFilters] = useState({
    search: params.get("search") || "",
    category: params.get("category") || "Tất cả",
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
    const query = new URLSearchParams();
    if (filters.search) query.set("search", filters.search);
    if (filters.category !== "Tất cả") query.set("category", filters.category);
    if (filters.sort) query.set("sort", filters.sort);
    if (filters.minPrice) query.set("minPrice", filters.minPrice);
    if (filters.maxPrice) query.set("maxPrice", filters.maxPrice);
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

  const productRows = useMemo(() => products, [products]);

  return (
    <main className="min-h-screen bg-page py-10" id="product-list-page">
      <div className="mx-auto max-w-app px-6">
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted" id="breadcrumb">
          <Link to="/" className="transition-colors hover:text-primary">Trang chủ</Link>
          <span>›</span>
          <span className="font-medium text-ink">Sản phẩm</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-ink">Sản phẩm</h1>
          <p className="mt-1 text-sm text-[#414754]">{loading ? "Đang tải dữ liệu..." : `Khám phá ${total} sản phẩm từ MongoDB`}</p>
          {error && <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">{error}</p>}
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full shrink-0 space-y-6 lg:w-[260px]">
            <div className="rounded-xl border border-line bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink">Tìm kiếm</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input value={filters.search} onChange={(event) => setFilters({ ...filters, search: event.target.value })} className="h-10 w-full rounded-lg border border-[#c1c6d6] pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" placeholder="iPhone, laptop..." />
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink">Danh mục</h3>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button onClick={() => setFilters({ ...filters, category: cat })} className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-all ${filters.category === cat ? "bg-primary text-white shadow-sm" : "text-[#414754] hover:bg-soft"}`}>{cat}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-line bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink">Khoảng giá</h3>
              <div className="flex gap-2">
                <input type="number" value={filters.minPrice} onChange={(event) => setFilters({ ...filters, minPrice: event.target.value })} placeholder="Từ" className="h-9 min-w-0 flex-1 rounded-lg border border-[#c1c6d6] px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
                <input type="number" value={filters.maxPrice} onChange={(event) => setFilters({ ...filters, maxPrice: event.target.value })} placeholder="Đến" className="h-9 min-w-0 flex-1 rounded-lg border border-[#c1c6d6] px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
              </div>
            </div>
          </aside>

          <section className="min-w-0 flex-1">
            <div className="mb-6 flex items-center justify-between rounded-xl border border-line bg-white px-4 py-3 shadow-sm">
              <span className="text-sm text-[#414754]">Hiển thị <span className="font-semibold text-ink">{productRows.length}</span> sản phẩm</span>
              <div className="flex items-center gap-3">
                <select value={filters.sort} onChange={(event) => setFilters({ ...filters, sort: event.target.value })} className="h-9 rounded-lg border border-[#c1c6d6] bg-white px-3 pr-8 text-sm text-ink outline-none focus:border-primary">
                  {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                <div className="hidden overflow-hidden rounded-lg border border-[#c1c6d6] sm:flex">
                  <button onClick={() => setViewMode("grid")} className={`p-2 ${viewMode === "grid" ? "bg-primary text-white" : "text-muted hover:bg-soft"}`}><Grid2X2 className="h-4 w-4" /></button>
                  <button onClick={() => setViewMode("list")} className={`p-2 ${viewMode === "list" ? "bg-primary text-white" : "text-muted hover:bg-soft"}`}><List className="h-4 w-4" /></button>
                </div>
              </div>
            </div>

            {productRows.length === 0 ? (
              <div className="rounded-xl border border-line bg-white p-16 text-center shadow-sm">
                <h2 className="mb-1 text-lg font-bold text-ink">Không tìm thấy sản phẩm</h2>
                <p className="text-sm text-[#414754]">{loading ? "Đang tải..." : "Database chưa có sản phẩm hoặc bộ lọc không khớp."}</p>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-2 gap-4 md:grid-cols-3" : "space-y-4"}>
                {productRows.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
