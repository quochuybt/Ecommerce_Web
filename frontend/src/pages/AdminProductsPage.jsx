import { useEffect, useMemo, useState } from "react";
import { Check, Edit3, Loader2, Plus, Search, Trash2, X } from "lucide-react";
import { productsApi } from "../store/api/productsApi.js";
import { normalizeProduct, normalizeProducts } from "../utils/productMapper.js";
import { formatPrice } from "../utils/formatters.js";

const emptyForm = {
  name: "",
  category: "Điện thoại",
  price: "",
  discount_price: "",
  stock: "",
  rating: "",
  image_url: "",
  description: "",
  is_featured: true,
};

const categories = ["Điện thoại", "Laptop", "Tablet", "Phụ kiện", "Đồng hồ"];

function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toForm(product) {
  return {
    name: product.name || "",
    category: product.category || "Điện thoại",
    price: product.originalPrice || product.price || "",
    discount_price: product.price || product.discount_price || "",
    stock: product.stock || "",
    rating: product.rating || "",
    image_url: product.image_url || product.image || "",
    description: product.description || "",
    is_featured: Boolean(product.is_featured),
  };
}

function toPayload(form) {
  return {
    name: form.name.trim(),
    slug: slugify(form.name),
    category: form.category,
    price: Number(form.price || 0),
    discount_price: Number(form.discount_price || form.price || 0),
    stock: Number(form.stock || 0),
    rating: Number(form.rating || 0),
    image_url: form.image_url.trim(),
    description: form.description.trim(),
    is_featured: Boolean(form.is_featured),
  };
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [modalMode, setModalMode] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const isModalOpen = Boolean(modalMode);

  function loadProducts() {
    setLoading(true);
    productsApi
      .list("?limit=50")
      .then((data) => {
        setProducts(normalizeProducts(data.items || []));
        setError("");
      })
      .catch((err) => {
        setProducts([]);
        setError(`Không tải được sản phẩm: ${err.message}`);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return products;

    return products.filter((product) =>
      [product.name, product.category].some((value) =>
        String(value || "").toLowerCase().includes(keyword),
      ),
    );
  }, [products, search]);

  function openCreateModal() {
    setModalMode("create");
    setEditingProduct(null);
    setForm(emptyForm);
    setError("");
  }

  function openEditModal(product) {
    setModalMode("edit");
    setEditingProduct(product);
    setForm(toForm(product));
    setError("");
  }

  function closeModal() {
    setModalMode(null);
    setEditingProduct(null);
    setForm(emptyForm);
    setSaving(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.name.trim()) {
      setError("Tên sản phẩm không được để trống.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = toPayload(form);
      if (modalMode === "edit" && editingProduct) {
        const data = await productsApi.update(editingProduct.id, payload);
        setProducts((current) =>
          current.map((product) =>
            product.id === editingProduct.id ? normalizeProduct(data.product) : product,
          ),
        );
      } else {
        const data = await productsApi.create(payload);
        setProducts((current) => [normalizeProduct(data.product), ...current]);
      }
      closeModal();
    } catch (err) {
      setError(`Không lưu được sản phẩm: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(product) {
    const confirmed = window.confirm(`Xóa sản phẩm "${product.name}"?`);
    if (!confirmed) return;

    setError("");
    try {
      await productsApi.remove(product.id);
      setProducts((current) => current.filter((item) => item.id !== product.id));
    } catch (err) {
      setError(`Không xóa được sản phẩm: ${err.message}`);
    }
  }

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] bg-[#101828] p-6 text-white shadow-glow md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-mint">CRUD Module</span>
            <h1 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Quản lý sản phẩm</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
              Thêm, chỉnh sửa và xóa sản phẩm đang hiển thị trên cửa hàng.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex h-11 w-fit items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-primary shadow-glow transition-all hover:-translate-y-0.5 hover:bg-white/90"
          >
            <Plus className="h-[18px] w-[18px]" /> Thêm sản phẩm
          </button>
        </div>
      </div>

      {error && (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
          {error}
        </p>
      )}

      <div className="rounded-[1.75rem] border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur-xl">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-black text-ink">Danh sách sản phẩm</h2>
            <p className="text-sm text-muted">{filteredProducts.length} sản phẩm</p>
          </div>
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tên hoặc danh mục..."
              className="h-11 w-full rounded-full border border-line bg-white pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <div className="hidden grid-cols-[96px_1fr_130px_150px_100px_110px] gap-4 border-b border-line bg-soft px-5 py-3 text-xs font-bold uppercase tracking-wide text-muted md:grid">
            <span>Ảnh</span>
            <span>Sản phẩm</span>
            <span>Danh mục</span>
            <span>Giá</span>
            <span>Kho</span>
            <span className="text-right">Hành động</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 px-5 py-12 text-sm font-semibold text-muted">
              <Loader2 className="h-5 w-5 animate-spin" /> Đang tải sản phẩm...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="px-5 py-12 text-center text-sm font-semibold text-muted">
              Không có sản phẩm phù hợp.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div className="grid gap-3 border-b border-line px-5 py-4 last:border-b-0 md:grid-cols-[96px_1fr_130px_150px_100px_110px] md:items-center" key={product.id}>
                <img src={product.image} alt={product.name} className="h-16 w-24 rounded-xl bg-soft object-cover" />
                <div>
                  <span className="line-clamp-2 font-bold text-ink">{product.name}</span>
                  <span className="mt-1 block text-xs font-medium text-muted">ID: {product.id}</span>
                </div>
                <span className="w-fit rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-primary">{product.category}</span>
                <div>
                  <strong className="block text-accent">{formatPrice(product.price)}</strong>
                  {product.originalPrice > product.price && (
                    <span className="text-xs text-muted line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
                <span className="text-sm font-semibold text-[#414754]">{product.stock}</span>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => openEditModal(product)}
                    className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-[#d8e2ff] hover:text-primary"
                    aria-label="Sửa"
                  >
                    <Edit3 className="h-[17px] w-[17px]" />
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-red-50 hover:text-red-600"
                    aria-label="Xóa"
                  >
                    <Trash2 className="h-[17px] w-[17px]" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-ink/55 px-4 py-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[1.75rem] bg-white p-6 shadow-card">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-mint">
                  {modalMode === "edit" ? "Edit product" : "New product"}
                </p>
                <h2 className="mt-1 text-2xl font-black text-ink">
                  {modalMode === "edit" ? "Sửa sản phẩm" : "Thêm sản phẩm"}
                </h2>
              </div>
              <button type="button" onClick={closeModal} className="grid h-10 w-10 place-items-center rounded-full bg-soft text-muted hover:text-ink">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="md:col-span-2">
                <span className="mb-1.5 block text-sm font-bold text-ink">Tên sản phẩm</span>
                <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="h-11 w-full rounded-xl border border-line px-3.5 text-sm outline-none focus:border-primary" />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-bold text-ink">Danh mục</span>
                <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="h-11 w-full rounded-xl border border-line px-3.5 text-sm outline-none focus:border-primary">
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-bold text-ink">Tồn kho</span>
                <input type="number" min="0" value={form.stock} onChange={(event) => setForm({ ...form, stock: event.target.value })} className="h-11 w-full rounded-xl border border-line px-3.5 text-sm outline-none focus:border-primary" />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-bold text-ink">Giá gốc</span>
                <input type="number" min="0" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} className="h-11 w-full rounded-xl border border-line px-3.5 text-sm outline-none focus:border-primary" />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-bold text-ink">Giá bán</span>
                <input type="number" min="0" value={form.discount_price} onChange={(event) => setForm({ ...form, discount_price: event.target.value })} className="h-11 w-full rounded-xl border border-line px-3.5 text-sm outline-none focus:border-primary" />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-bold text-ink">Rating</span>
                <input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(event) => setForm({ ...form, rating: event.target.value })} className="h-11 w-full rounded-xl border border-line px-3.5 text-sm outline-none focus:border-primary" />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-bold text-ink">Ảnh URL</span>
                <input value={form.image_url} onChange={(event) => setForm({ ...form, image_url: event.target.value })} className="h-11 w-full rounded-xl border border-line px-3.5 text-sm outline-none focus:border-primary" />
              </label>
              <label className="md:col-span-2">
                <span className="mb-1.5 block text-sm font-bold text-ink">Mô tả</span>
                <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} rows={4} className="w-full rounded-xl border border-line px-3.5 py-3 text-sm outline-none focus:border-primary" />
              </label>
              <label className="flex items-center gap-3 rounded-2xl bg-soft px-4 py-3 md:col-span-2">
                <input type="checkbox" checked={form.is_featured} onChange={(event) => setForm({ ...form, is_featured: event.target.checked })} className="h-4 w-4 accent-primary" />
                <span className="text-sm font-bold text-ink">Đánh dấu nổi bật</span>
              </label>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={closeModal} className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line px-5 text-sm font-bold text-ink hover:bg-soft">
                Hủy
              </button>
              <button disabled={saving} className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                {saving ? "Đang lưu..." : "Lưu sản phẩm"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
