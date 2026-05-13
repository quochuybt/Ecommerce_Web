import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import CartSummary from "../components/cart/CartSummary.jsx";
import { useAuth } from "../hooks/useAuth.jsx";
import { useCart } from "../hooks/useCart.jsx";
import { ordersApi } from "../store/api/ordersApi.js";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { totals, clearCart, refreshCart } = useCart();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleOrder() {
    if (!user) {
      setStatus("Bạn cần đăng nhập để tạo đơn hàng trong MongoDB.");
      return;
    }
    setLoading(true);
    setStatus("");
    try {
      const data = await ordersApi.create({ shipping_address: "12 Nguyen Hue, Quan 1, TP HCM", payment_method: "cod" });
      clearCart();
      await refreshCart();
      setStatus(`Đặt hàng thành công: ${data.order.id}`);
    } catch (err) {
      setStatus(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-page py-10">
      <section className="mx-auto max-w-app px-6">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Checkout</span>
          <h1 className="mt-2 text-3xl font-bold text-ink">Thanh toán</h1>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <form className="space-y-5 rounded-xl border border-line bg-white p-6 shadow-sm">
            {!user && <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">Chưa đăng nhập. <Link to="/login" className="font-semibold text-primary">Đăng nhập</Link> để checkout qua API thật.</p>}
            <label><span className="mb-1.5 block text-sm font-medium text-ink">Họ và tên</span><input defaultValue={user?.full_name || "Nguyen Van An"} className="h-11 w-full rounded-lg border border-[#c1c6d6] px-3.5 text-sm outline-none focus:border-primary" /></label>
            <label><span className="mb-1.5 block text-sm font-medium text-ink">Email</span><input defaultValue={user?.email || "user@example.com"} type="email" className="h-11 w-full rounded-lg border border-[#c1c6d6] px-3.5 text-sm outline-none focus:border-primary" /></label>
            <label><span className="mb-1.5 block text-sm font-medium text-ink">Số điện thoại</span><input defaultValue="0901234567" className="h-11 w-full rounded-lg border border-[#c1c6d6] px-3.5 text-sm outline-none focus:border-primary" /></label>
            <label><span className="mb-1.5 block text-sm font-medium text-ink">Địa chỉ giao hàng</span><textarea defaultValue="12 Nguyen Hue, Quan 1, TP HCM" className="min-h-28 w-full rounded-lg border border-[#c1c6d6] px-3.5 py-3 text-sm outline-none focus:border-primary" /></label>
            <label><span className="mb-1.5 block text-sm font-medium text-ink">Phương thức thanh toán</span><select defaultValue="cod" className="h-11 w-full rounded-lg border border-[#c1c6d6] px-3.5 text-sm outline-none focus:border-primary"><option value="cod">Thanh toán khi nhận hàng</option><option value="card">Thẻ ngân hàng</option></select></label>
            {status && <p className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-800">{status}</p>}
            <button className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60" disabled={loading || totals.quantity === 0} type="button" onClick={handleOrder}>
              <CheckCircle2 className="h-[18px] w-[18px]" /> {loading ? "Đang đặt hàng..." : "Đặt hàng"}
            </button>
          </form>
          <CartSummary totals={totals} disabled={totals.quantity === 0} />
        </div>
      </section>
    </main>
  );
}
