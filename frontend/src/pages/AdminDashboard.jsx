import { useEffect, useMemo, useState } from "react";
import { Activity, ArrowUpRight, DollarSign, Package, ShoppingBag, Sparkles, Star, UsersRound } from "lucide-react";
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
        accent: "from-primary to-mint",
        note: "Tổng doanh thu",
      },
      {
        label: "Đơn hàng",
        value: String(dashboard?.orders_count || 0),
        icon: ShoppingBag,
        accent: "from-accent to-amber-400",
        note: "Đã ghi nhận",
      },
      {
        label: "Sản phẩm",
        value: String(dashboard?.products_count || 0),
        icon: Package,
        accent: "from-berry to-primary",
        note: "Đang kinh doanh",
      },
      {
        label: "Người dùng",
        value: String(dashboard?.users_count || 0),
        icon: UsersRound,
        accent: "from-mint to-emerald-400",
        note: "Tài khoản",
      },
    ],
    [dashboard],
  );
  const maxRevenue = Math.max(...(dashboard?.daily_revenue || [1]));
  const dailyRevenue = dashboard?.daily_revenue || [];
  const totalOrders = dashboard?.orders_count || 0;
  const revenuePerOrder = totalOrders ? (dashboard?.revenue || 0) / totalOrders : 0;

  return (
    <section className="space-y-7">
      <div className="overflow-hidden rounded-[2rem] bg-[#101828] p-6 text-white shadow-glow md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-mint">
              <Sparkles className="h-3.5 w-3.5" />
              Analytics
            </span>
            <h1 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Dashboard quản trị
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
              Theo dõi doanh thu, đơn hàng, sản phẩm và người dùng trong một màn hình gọn để quản trị cửa hàng nhanh hơn.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
              <p className="text-white/55">AOV</p>
              <p className="mt-1 font-black">{formatPrice(revenuePerOrder)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
              <p className="text-white/55">Top items</p>
              <p className="mt-1 font-black">{dashboard?.top_products?.length || 0}</p>
            </div>
            <div className="col-span-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 sm:col-span-1">
              <p className="text-white/55">Health</p>
              <p className="mt-1 flex items-center gap-1 font-black text-mint">
                <Activity className="h-4 w-4" />
                Live
              </p>
            </div>
          </div>
        </div>
        {error && (
          <p className="mt-5 rounded-2xl border border-amber-300/40 bg-amber-100/90 px-4 py-3 text-sm font-semibold text-amber-900">
            {error}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article
              className="glass-panel mesh-border rounded-[1.5rem] p-5 transition-all hover:-translate-y-1 hover:shadow-card"
              key={metric.label}
            >
              <div className="flex items-start justify-between gap-4">
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${metric.accent} text-white shadow-sm`}>
                  <Icon className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-mint shadow-sm">
                  <ArrowUpRight className="inline h-3.5 w-3.5" /> {metric.note}
                </span>
              </div>
              <span className="mt-5 block text-sm font-bold text-muted">{metric.label}</span>
              <strong className="mt-1 block text-2xl font-black text-ink md:text-3xl">{metric.value}</strong>
            </article>
          );
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.45fr_0.75fr]">
        <div className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/80 p-5 shadow-sm backdrop-blur-xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-mint">Revenue</p>
              <h2 className="mt-1 text-xl font-black text-ink">Doanh thu 7 ngày</h2>
            </div>
            <span className="w-fit rounded-full bg-soft px-3 py-1 text-xs font-bold text-primary">
              {dailyRevenue.length} ngày gần nhất
            </span>
          </div>
          {dailyRevenue.length ? (
            <div className="mt-7 grid h-72 grid-cols-7 items-end gap-3 rounded-3xl bg-gradient-to-b from-soft/70 to-white p-4">
              {dailyRevenue.map((value, index) => {
                const height = `${Math.max(10, (value / maxRevenue) * 100)}%`;

                return (
                  <div key={index} className="flex h-full flex-col items-center justify-end gap-2">
                    <span className="text-[10px] font-bold text-muted">{formatPrice(value).replace("₫", "đ")}</span>
                    <span
                      className="w-full rounded-t-2xl bg-gradient-to-t from-primary to-mint shadow-glow transition-all duration-500 hover:from-accent hover:to-mint"
                      style={{ height }}
                      title={formatPrice(value)}
                    />
                    <span className="text-xs font-bold text-muted">D{index + 1}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-6 rounded-3xl bg-soft p-10 text-center text-sm font-medium text-muted">
              Chưa có dữ liệu doanh thu.
            </div>
          )}
        </div>

        <div className="rounded-[1.75rem] border border-white/80 bg-white/80 p-5 shadow-sm backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-mint">Ranking</p>
              <h2 className="mt-1 text-xl font-black text-ink">Top rating</h2>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <Star className="h-5 w-5 fill-amber-500" />
            </span>
          </div>
          <div className="mt-5 grid gap-3">
            {(dashboard?.top_products || []).length === 0 ? (
              <div className="rounded-2xl bg-soft py-8 text-center text-sm text-muted">
                Chưa có sản phẩm.
              </div>
            ) : (
              dashboard.top_products.map((product, index) => (
                <div
                  className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-white/80 px-4 py-3 text-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-sm"
                  key={product.id}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-black text-white">
                      {index + 1}
                    </span>
                    <span className="line-clamp-2 font-bold text-ink">{product.name}</span>
                  </div>
                  <strong className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-amber-600">
                    <Star className="h-3.5 w-3.5 fill-amber-500" />
                    {product.rating}
                  </strong>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
