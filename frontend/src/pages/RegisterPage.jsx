import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cpu } from "lucide-react";
import { useAuth } from "../hooks/useAuth.jsx";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [localError, setLocalError] = useState("");
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setLocalError("");
    try {
      await register(form);
      navigate("/profile", { replace: true });
    } catch (err) {
      setLocalError(err.message);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-page px-6 py-10">
      <section className="w-full max-w-[440px] rounded-2xl border border-line bg-white p-8 shadow-soft">
        <div className="mb-8">
          <Link to="/" className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-mint to-accent text-white shadow-glow">
              <Cpu className="h-5 w-5" />
            </span>
            <span className="leading-none">
              <span className="block font-black text-ink">CommerceHub</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mint">Tech market</span>
            </span>
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Create Account</span>
          <h1 className="mt-2 text-3xl font-bold text-ink">Đăng ký</h1>
          <p className="mt-2 text-sm text-[#414754]">Tạo tài khoản người dùng trong MongoDB.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Họ và tên</span>
            <input value={form.full_name} onChange={(event) => setForm({ ...form, full_name: event.target.value })} className="h-11 w-full rounded-lg border border-[#c1c6d6] px-3.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Email</span>
            <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="h-11 w-full rounded-lg border border-[#c1c6d6] px-3.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Mật khẩu</span>
            <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="h-11 w-full rounded-lg border border-[#c1c6d6] px-3.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </label>
          {(localError || error) && <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{localError || error}</p>}
          <button disabled={loading} className="h-11 w-full rounded-lg bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60">
            {loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
          </button>
        </form>
        <p className="mt-7 text-center text-sm text-[#414754]">Đã có tài khoản? <Link to="/login" className="font-semibold text-primary hover:underline">Đăng nhập</Link></p>
      </section>
    </main>
  );
}
