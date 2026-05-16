import { Link, Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { BarChart3, Boxes, Cpu, LogOut, Store } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.jsx";

export default function AdminLayout() {
  const location = useLocation();
  const { user, logout } = useAuth();

  function handleLogout() {
    const confirmed = window.confirm("Bạn có chắc muốn đăng xuất không?");
    if (!confirmed) return;
    logout();
  }

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  if (user.role !== "admin") {
    return (
      <main className="grid min-h-screen place-items-center bg-page px-6">
        <section className="max-w-lg rounded-xl border border-line bg-white p-10 text-center shadow-soft">
          <h1 className="text-2xl font-bold text-ink">Không có quyền admin</h1>
          <p className="mt-2 text-sm text-[#414754]">Tài khoản hiện tại không có quyền truy cập khu quản trị.</p>
          <Link className="mt-5 inline-flex h-11 items-center rounded-lg bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-dark" to="/login">Đăng nhập admin</Link>
        </section>
      </main>
    );
  }

  return (
    <div className="grid min-h-screen bg-page md:grid-cols-[260px_1fr]">
      <aside className="bg-[#2d3038] p-6 text-white">
        <Link className="group flex items-center gap-3" to="/">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-mint to-accent text-white shadow-glow transition-transform group-hover:rotate-3 group-hover:scale-105">
            <Cpu className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <span className="block font-black">CommerceHub</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mint">Tech market</span>
          </span>
        </Link>
        <nav className="mt-8 grid gap-2">
          {[
            { to: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
            { to: "/admin/products", label: "Sản phẩm", icon: Boxes },
            { to: "/", label: "Cửa hàng", icon: Store },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition-colors ${
                  isActive ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" /> {item.label}
              </NavLink>
            );
          })}
          <button onClick={handleLogout} className="mt-4 flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white">
            <LogOut className="h-[18px] w-[18px]" /> Đăng xuất
          </button>
        </nav>
      </aside>
      <main className="min-w-0 p-6 md:p-9">
        <Outlet />
      </main>
    </div>
  );
}
