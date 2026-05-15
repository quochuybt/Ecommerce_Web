import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setLocalError("");
    try {
      const user = await login({ email: form.email.trim(), password: form.password });
      navigate(user.role === "admin" ? "/admin/dashboard" : "/profile", { replace: true });
    } catch (err) {
      setLocalError(err.message);
    }
  }

  return (
    <main className="flex min-h-screen bg-white" id="login-page">
      <div className="relative hidden overflow-hidden lg:flex lg:w-1/2">
        <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85" alt="CommerceHub" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-16 lg:p-24">
          <div className="max-w-md space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/30 bg-white/20 text-white backdrop-blur-md">C</span>
              <span className="text-lg font-semibold tracking-tight text-white">CommerceHub</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white">Khám phá thế giới, mua sắm thả ga.</h1>
              <p className="max-w-[420px] text-base leading-relaxed text-white/80">Đăng nhập để quản lý giỏ hàng, đơn hàng và dashboard admin từ MongoDB.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-page px-6 py-10">
        <div className="w-full max-w-[400px]">
          <div className="mb-8">
            <h2 className="text-[28px] font-bold leading-tight tracking-[-0.02em] text-ink">Đăng nhập</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#414754]">Nhập tài khoản của bạn để tiếp tục mua sắm hoặc quản trị.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" id="login-form">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className="h-11 w-full rounded-lg border border-[#c1c6d6] bg-white px-3.5 text-sm text-ink outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Mật khẩu</span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                  className="h-11 w-full rounded-lg border border-[#c1c6d6] bg-white px-3.5 pr-11 text-sm text-ink outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </label>

            {(localError || error) && <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{localError || error}</p>}

            <button type="submit" disabled={loading} className="h-11 w-full rounded-lg bg-primary text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-[#414754]">
            Chưa có tài khoản? <Link to="/register" className="font-semibold text-primary hover:underline">Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
