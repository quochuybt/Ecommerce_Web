import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut, Menu, Search, ShoppingBag, UserRound } from "lucide-react";
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
    <Link to="/" className="flex shrink-0 items-center gap-2" id="home-logo">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
          <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight text-ink">CommerceHub</span>
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

  return (
    <div className="min-h-screen bg-page">
      <header className="sticky top-0 z-50 border-b border-[#c1c6d6] bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-app items-center gap-4 px-6">
          <Logo />

          <form onSubmit={handleSearch} className="mx-4 hidden max-w-xl flex-1 md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted" />
              <input
                name="search"
                placeholder="Tìm kiếm sản phẩm..."
                className="h-10 w-full rounded-lg border border-[#c1c6d6] pl-10 pr-4 text-sm text-ink outline-none transition-all placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </form>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <Link to="/cart" className="relative rounded-lg p-2 transition-colors hover:bg-soft" id="navbar-cart">
              <ShoppingBag className="h-[22px] w-[22px] text-ink" />
              {totals.quantity > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                  {totals.quantity}
                </span>
              )}
            </Link>

            <Link
              to={user ? "/profile" : "/login"}
              className="flex h-9 items-center gap-2 rounded-lg border border-[#c1c6d6] px-3 text-sm font-medium text-ink transition-all hover:border-primary hover:bg-soft"
            >
              <UserRound className="h-[18px] w-[18px]" />
              <span className="hidden sm:inline">{user ? user.full_name : "Đăng nhập"}</span>
            </Link>

            {user && (
              <button onClick={logout} className="rounded-lg p-2 text-muted transition-colors hover:bg-soft hover:text-ink" aria-label="Đăng xuất">
                <LogOut className="h-5 w-5" />
              </button>
            )}

            <button className="rounded-lg p-2 transition-colors hover:bg-soft lg:hidden" aria-label="Menu">
              <Menu className="h-[22px] w-[22px] text-ink" />
            </button>
          </div>
        </div>

        <nav className="border-t border-line bg-white">
          <div className="mx-auto flex h-10 max-w-app items-center gap-6 overflow-x-auto px-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `whitespace-nowrap text-sm font-medium transition-colors ${
                    isActive ? "border-b-2 border-primary pb-0.5 text-primary" : "text-[#414754] hover:text-primary"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {user?.role === "admin" && (
              <NavLink to="/admin/dashboard" className="whitespace-nowrap text-sm font-medium text-[#414754] hover:text-primary">
                Quản trị
              </NavLink>
            )}
          </div>
        </nav>
      </header>

      <Outlet />

      <footer className="bg-[#2d3038] text-[#eff0fa]" id="footer">
        <div className="mx-auto grid max-w-app grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          <div className="col-span-2 space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">C</span>
              <span className="font-bold text-white">CommerceHub</span>
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
