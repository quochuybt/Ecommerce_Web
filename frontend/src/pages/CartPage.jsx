import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import CartSummary from "../components/cart/CartSummary.jsx";
import { useCart } from "../hooks/useCart.jsx";
import { formatPrice } from "../utils/formatters.js";

export default function CartPage() {
  const { items, totals, syncError, updateQuantity, removeFromCart } = useCart();

  return (
    <main className="min-h-screen bg-page py-10">
      <section className="mx-auto max-w-app px-6">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Shopping Cart</span>
          <h1 className="mt-2 text-3xl font-bold text-ink">Giỏ hàng</h1>
          {syncError && <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">{syncError}</p>}
        </div>

        {items.length === 0 ? (
          <div className="rounded-xl border border-line bg-white p-12 text-center shadow-sm">
            <h2 className="text-xl font-bold text-ink">Giỏ hàng đang trống</h2>
            <p className="mt-2 text-sm text-[#414754]">Chọn vài sản phẩm công nghệ để bắt đầu checkout.</p>
            <Link className="mt-5 inline-flex h-11 items-center rounded-lg bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-dark" to="/products">Xem sản phẩm</Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-3">
              {items.map((item) => (
                <article className="grid gap-4 rounded-xl border border-line bg-white p-3 shadow-sm sm:grid-cols-[96px_1fr_auto_auto] sm:items-center" key={item.id}>
                  <img src={item.image} alt={item.name} className="h-24 w-24 rounded-lg object-cover" />
                  <div>
                    <h2 className="font-semibold text-ink">{item.name}</h2>
                    <span className="text-sm font-bold text-accent">{formatPrice(item.price)}</span>
                  </div>
                  <div className="grid w-fit grid-cols-[36px_36px_36px] overflow-hidden rounded-lg border border-[#c1c6d6] text-center">
                    <button className="grid h-9 place-items-center bg-soft" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Giảm số lượng"><Minus className="h-4 w-4" /></button>
                    <strong className="grid h-9 place-items-center">{item.quantity}</strong>
                    <button className="grid h-9 place-items-center bg-soft" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Tăng số lượng"><Plus className="h-4 w-4" /></button>
                  </div>
                  <button className="grid h-10 w-10 place-items-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50" onClick={() => removeFromCart(item.id)} aria-label="Xóa khỏi giỏ">
                    <Trash2 className="h-[18px] w-[18px]" />
                  </button>
                </article>
              ))}
            </div>
            <CartSummary totals={totals} />
          </div>
        )}
      </section>
    </main>
  );
}
