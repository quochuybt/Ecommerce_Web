import { useEffect, useState } from "react";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { productsApi } from "../store/api/productsApi.js";
import { normalizeProducts } from "../utils/productMapper.js";
import { formatPrice } from "../utils/formatters.js";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productsApi.list("?limit=50").then((data) => setProducts(normalizeProducts(data.items || []))).catch(() => setProducts([]));
  }, []);

  return (
    <section>
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">CRUD Module</span>
          <h1 className="mt-2 text-3xl font-bold text-ink">Quản lý sản phẩm</h1>
        </div>
        <button className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-dark">
          <Plus className="h-[18px] w-[18px]" /> Thêm sản phẩm
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-line bg-white shadow-sm">
        <div className="hidden grid-cols-[96px_1fr_130px_150px_100px_100px] gap-4 border-b border-line bg-soft px-5 py-3 text-xs font-bold uppercase tracking-wide text-muted md:grid">
          <span>Ảnh</span><span>Sản phẩm</span><span>Danh mục</span><span>Giá</span><span>Kho</span><span className="text-right">Hành động</span>
        </div>
        {products.map((product) => (
          <div className="grid gap-3 border-b border-line px-5 py-4 last:border-b-0 md:grid-cols-[96px_1fr_130px_150px_100px_100px] md:items-center" key={product.id}>
            <img src={product.image} alt={product.name} className="h-16 w-24 rounded-lg object-cover" />
            <span className="font-semibold text-ink">{product.name}</span>
            <span className="text-sm text-[#414754]">{product.category}</span>
            <strong className="text-accent">{formatPrice(product.price)}</strong>
            <span className="text-sm text-[#414754]">{product.stock}</span>
            <div className="flex justify-end gap-2">
              <button className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-[#d8e2ff] hover:text-primary" aria-label="Sửa"><Edit3 className="h-[17px] w-[17px]" /></button>
              <button className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-red-50 hover:text-red-600" aria-label="Xóa"><Trash2 className="h-[17px] w-[17px]" /></button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
