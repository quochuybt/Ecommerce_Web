import { useEffect, useMemo, useState } from "react";
import { DollarSign, Package, ShoppingBag, UsersRound } from "lucide-react";
import { analyticsApi } from "../store/api/analyticsApi.js";
import { formatPrice } from "../utils/formatters.js";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    analyticsApi
      .dashboard()
      .then((data) => {
        setDashboard(data);
        setError("");
      })
      .catch((err) => {
        setDashboard({
          revenue: 0,
          orders_count: 0,
          products_count: 0,
          users_count: 0,
          daily_revenue: [],
          top_products: [],
        });
        setError(`Không tải được dashboard từ backend: ${err.message}`);
      });
  }, []);

  const metrics = useMemo(
    () => [
      {
        label: "Doanh thu",
        value: formatPrice(dashboard?.revenue || 0),
        icon: DollarSign,
      },
      {
        label: "Đơn hànggggggggggggg",
        value: String(dashboard?.orders_count || 0),
        icon: ShoppingBag,
      },
      {
        label: "Sản phẩm",
        value: String(dashboard?.products_count || 0),
        icon: Package,
      },
      {
        label: "Người dùng",
        value: String(dashboard?.users_count || 0),
        icon: UsersRound,
      },
    ],
    [dashboard],
  );
  const maxRevenue = Math.max(...(dashboard?.daily_revenue || [1]));

  return (
    <section>
      <div className="mb-7">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Analytics
        </span>
        <h1 className="mt-2 text-3xl font-bold text-ink">Dashboard quản trị</h1>
        {error && (
          <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            {error}
          </p>
        )}
      </div>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article
              className="rounded-xl border border-line bg-white p-5 shadow-sm"
              key={metric.label}
            >
              <Icon className="h-6 w-6 text-primary" />
              <span className="mt-3 block text-sm font-medium text-muted">
                {metric.label}
              </span>
              <strong className="mt-1 block text-2xl text-ink">
                {metric.value}
              </strong>
            </article>
          );
        })}
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-xl border border-line bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-ink">Doanh thu 7 ngày</h2>
          {dashboard?.daily_revenue?.length ? (
            <div className="mt-6 grid h-64 grid-cols-7 items-end gap-3">
              {dashboard.daily_revenue.map((value, index) => (
                <span
                  key={index}
                  className="rounded-t-lg bg-primary"
                  style={{
                    height: `${Math.max(12, (value / maxRevenue) * 100)}%`,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-lg bg-soft p-8 text-center text-sm text-muted">
              Chưa có dữ liệu doanh thu.
            </div>
          )}
        </div>
        <div className="rounded-xl border border-line bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-ink">Sản phẩm top rating</h2>
          <div className="mt-4 divide-y divide-line">
            {(dashboard?.top_products || []).length === 0 ? (
              <div className="py-8 text-center text-sm text-muted">
                Chưa có sản phẩm.
              </div>
            ) : (
              dashboard.top_products.map((product) => (
                <div
                  className="flex items-center justify-between gap-4 py-3 text-sm"
                  key={product.id}
                >
                  <span className="font-medium text-ink">{product.name}</span>
                  <strong className="text-primary">{product.rating}</strong>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
