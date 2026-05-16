import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PackageSearch } from "lucide-react";
import { useAuth } from "../hooks/useAuth.jsx";
import { ordersApi } from "../store/api/ordersApi.js";
import { formatPrice } from "../utils/formatters.js";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setError("");
      return;
    }

    ordersApi
      .list()
      .then((data) => {
        setOrders(data.items || []);
        setError("");
      })
      .catch((err) => {
        setOrders([]);
        setError(err.message);
      });
  }, [user]);

  if (!user) {
    return (
      <main className="min-h-screen bg-page px-6 py-16">
        <section className="mx-auto max-w-app rounded-xl border border-line bg-white p-12 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-ink">Bạn chưa đăng nhập</h1>
          <p className="mt-2 text-sm text-[#414754]">
            Đăng nhập để xem lịch sử đơn hàng.
          </p>
          <Link
            className="mt-5 inline-flex h-11 items-center rounded-lg bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-dark"
            to="/login"
            state={{ from: "/orders" }}
          >
            Đăng nhập
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-page py-10">
      <section className="mx-auto max-w-app px-6">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Order History
          </span>
          <h1 className="mt-2 text-3xl font-bold text-ink">Lịch sử đơn hàng</h1>
          {error && (
            <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              Không tải được đơn hàng từ backend: {error}
            </p>
          )}
        </div>
        <div className="overflow-hidden rounded-xl border border-line bg-white shadow-sm">
          {orders.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-muted">
              Chưa có đơn hàng.
            </div>
          ) : (
            orders.map((order) => (
              <div
                className="grid gap-3 border-b border-line px-5 py-4 text-sm last:border-b-0 md:grid-cols-[1.2fr_1fr_1fr_1fr_auto] md:items-center"
                key={order.id}
              >
                <span className="inline-flex items-center gap-2 font-semibold text-ink">
                  <PackageSearch className="h-[18px] w-[18px] text-primary" />{" "}
                  {order.id}
                </span>
                <span className="text-[#414754]">
                  {order.created_at
                    ? new Date(order.created_at).toLocaleDateString("vi-VN")
                    : ""}
                </span>
                <strong className="text-primary">{order.status}</strong>
                <span className="text-[#414754]">
                  {order.items?.length || 0} sản phẩm
                </span>
                <strong className="text-accent">
                  {formatPrice(order.total_amount || 0)}
                </strong>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
