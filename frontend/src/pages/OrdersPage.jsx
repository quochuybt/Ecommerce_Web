import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PackageSearch } from "lucide-react";
import { useAuth } from "../hooks/useAuth.jsx";
import { orders as fallbackOrders } from "../data/products.js";
import { ordersApi } from "../store/api/ordersApi.js";
import { formatPrice } from "../utils/formatters.js";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      setOrders(fallbackOrders);
      return;
    }
    ordersApi.list().then((data) => setOrders(data.items || [])).catch(() => setOrders(fallbackOrders));
  }, [user]);

  return (
    <main className="min-h-screen bg-page py-10">
      <section className="mx-auto max-w-app px-6">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Order History</span>
          <h1 className="mt-2 text-3xl font-bold text-ink">Lịch sử đơn hàng</h1>
          {!user && <p className="mt-2 text-sm text-[#414754]">Đăng nhập để xem đơn hàng thật. <Link className="text-primary" to="/login">Đăng nhập</Link></p>}
        </div>
        <div className="overflow-hidden rounded-xl border border-line bg-white shadow-sm">
          {orders.map((order) => (
            <div className="grid gap-3 border-b border-line px-5 py-4 text-sm last:border-b-0 md:grid-cols-[1.2fr_1fr_1fr_1fr_auto] md:items-center" key={order.id}>
              <span className="inline-flex items-center gap-2 font-semibold text-ink"><PackageSearch className="h-[18px] w-[18px] text-primary" /> {order.id}</span>
              <span className="text-[#414754]">{order.date || new Date(order.created_at).toLocaleDateString("vi-VN")}</span>
              <strong className="text-primary">{order.status}</strong>
              <span className="text-[#414754]">{order.items?.length || order.items} sản phẩm</span>
              <strong className="text-accent">{formatPrice(order.total_amount || order.total)}</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
