import { SlidersHorizontal } from "lucide-react";

const categories = [
  { label: "Điện thoại", value: "Điện thoại" },
  { label: "Laptop", value: "Laptop" },
  { label: "Tablet", value: "Tablet" },
  { label: "Phụ kiện", value: "Phụ kiện" },
  { label: "Đồng hồ", value: "Đồng hồ" },
];

export default function ProductFilters({ filters, setFilters }) {
  return (
    <aside className="filter-panel">
      <div className="section-heading small-heading">
        <SlidersHorizontal size={20} />
        <h2>Bộ lọc</h2>
      </div>
      <label>
        Tìm kiếm
        <input
          value={filters.search}
          onChange={(event) => setFilters({ ...filters, search: event.target.value })}
          placeholder="iPhone, laptop, tai nghe..."
        />
      </label>
      <label>
        Danh mục
        <select
          value={filters.category}
          onChange={(event) => setFilters({ ...filters, category: event.target.value })}
        >
          <option value="Tất cả">Tất cả</option>
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Sắp xếp
        <select value={filters.sort} onChange={(event) => setFilters({ ...filters, sort: event.target.value })}>
          <option value="featured">Nổi bật</option>
          <option value="price-asc">Giá thấp đến cao</option>
          <option value="price-desc">Giá cao đến thấp</option>
          <option value="rating">Đánh giá cao</option>
        </select>
      </label>
    </aside>
  );
}
