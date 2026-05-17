import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Cpu, LogOut, Menu, Search, ShoppingBag, Sparkles, UserRound } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useCart } from "../../hooks/useCart.jsx";

const navItems = [
  { label: "Trang chủ", path: "/" },
  { label: "Sản phẩm", path: "/products" },
  { label: "Đơn hàng", path: "/orders" },
  { label: "Hồ sơ", path: "/profile" },
];

function Logo() {
  return (
    <Link to="/" className="group flex shrink-0 items-center gap-3" id="home-logo">
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-mint to-accent text-white shadow-glow transition-transform group-hover:rotate-3 group-hover:scale-105">
        <Cpu className="h-5 w-5" />
      </span>
      <span className="leading-none">
        <span className="block text-lg font-black tracking-tight text-ink">CommerceHub</span>
        <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-mint sm:block">Tech market</span>
      </span>
    </Link>
  );
}

export default function MainLayout() {
  const navigate = useNavigate();
  const { totals } = useCart();
  const { user, logout } = useAuth();

  function handleSearch(event) {
    event.preventDefault();
    const search = new FormData(event.currentTarget).get("search");
    navigate(`/products${search ? `?search=${encodeURIComponent(search)}` : ""}`);
  }

  function handleLogout() {
    const confirmed = window.confirm("Bạn có chắc muốn đăng xuất không?");
    if (!confirmed) return;
    logout();
  }

  return (
    <div className="min-h-screen bg-page">
      <header className="sticky top-0 z-50 border-b border-white/60 bg-white/75 shadow-sm backdrop-blur-2xl">
        <div className="mx-auto flex min-h-[72px] max-w-app items-center gap-4 px-6 py-3">
          <Logo />

          <form onSubmit={handleSearch} className="mx-4 hidden max-w-xl flex-1 md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted" />
              <input
                name="search"
                placeholder="Tìm kiếm sản phẩm..."
                className="h-11 w-full rounded-full border border-line bg-white/80 pl-10 pr-4 text-sm text-ink shadow-sm outline-none transition-all placeholder:text-muted focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
              />
            </div>
          </form>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <Link to="/products" className="hidden h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-primary lg:flex">
              <Sparkles className="h-4 w-4 text-orange-200" />
              Khám phá
            </Link>

            <Link
              to={user ? "/cart" : "/login"}
              state={user ? undefined : { from: "/cart" }}
              className="relative rounded-full border border-line bg-white/85 p-2.5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-card"
              id="navbar-cart"
            >
              <ShoppingBag className="h-[22px] w-[22px] text-ink" />
              {totals.quantity > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white ring-2 ring-white">
                  {totals.quantity}
                </span>
              )}
            </Link>

            <Link
              to={user ? "/profile" : "/login"}
              className="flex h-10 items-center gap-2 rounded-full border border-line bg-white/85 pl-2 pr-3 text-sm font-semibold text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-card"
            >
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.full_name}
                  className="h-6 w-6 rounded-full object-cover border border-[#c1c6d6]"
                />
              ) : (
                <UserRound className="h-[18px] w-[18px]" />
              )}
              <span className="hidden sm:inline">{user ? user.full_name : "Đăng nhập"}</span>
            </Link>

            {user && (
              <button onClick={handleLogout} className="rounded-full p-2.5 text-muted transition-colors hover:bg-soft hover:text-ink" aria-label="Đăng xuất">
                <LogOut className="h-5 w-5" />
              </button>
            )}

            <button className="rounded-full p-2 transition-colors hover:bg-soft lg:hidden" aria-label="Menu">
              <Menu className="h-[22px] w-[22px] text-ink" />
            </button>
          </div>
        </div>

        <nav className="border-t border-white/70 bg-white/55 backdrop-blur-xl">
          <div className="mx-auto flex h-10 max-w-app items-center gap-6 overflow-x-auto px-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-full px-3 py-1 text-sm font-semibold transition-all ${
                    isActive ? "bg-primary text-white shadow-sm" : "text-[#414754] hover:bg-white hover:text-primary"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {user?.role === "admin" && (
              <NavLink to="/admin/dashboard" className="whitespace-nowrap rounded-full px-3 py-1 text-sm font-semibold text-[#414754] hover:bg-white hover:text-primary">
                Quản trị
              </NavLink>
            )}
          </div>
        </nav>
      </header>

      <Outlet />

      <footer className="bg-[#101828] text-[#eff0fa]" id="footer">
        <div className="mx-auto grid max-w-app grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          <div className="col-span-2 space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-mint to-accent text-white shadow-glow">
                <Cpu className="h-5 w-5" />
              </span>
              <span className="leading-none">
                <span className="block font-black text-white">CommerceHub</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mint">Tech market</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#eff0fa]/60">Nền tảng mua sắm thiết bị điện tử tích hợp Express API và MongoDB.</p>
          </div>
          {[
            ["Mua sắm", "Sản phẩm", "Giỏ hàng", "Đơn hàng"],
            ["Tài khoản", "Đăng nhập", "Hồ sơ", "Quản trị"],
            ["Hỗ trợ", "Bảo hành", "Vận chuyển", "Liên hệ"],
          ].map(([title, ...links]) => (
            <div key={title}>
              <h3 className="mb-3 text-sm font-semibold text-white">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <span className="text-sm text-[#eff0fa]/60 transition-colors hover:text-white">{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-app flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-[#eff0fa]/40 sm:flex-row">
            <span>© 2026 CommerceHub. Built with React, Tailwind and MongoDB.</span>
            <span>Privacy Policy · Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
