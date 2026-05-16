import { Link } from "react-router-dom";
import { Camera, Save } from "lucide-react";
import { useAuth } from "../hooks/useAuth.jsx";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <main className="min-h-screen bg-page px-6 py-16">
        <section className="mx-auto max-w-app rounded-xl border border-line bg-white p-12 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-ink">Bạn chưa đăng nhập</h1>
          <p className="mt-2 text-sm text-[#414754]">
            Đăng nhập để xem hồ sơ chi tiết.
          </p>
          <Link
            className="mt-5 inline-flex h-11 items-center rounded-lg bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-dark"
            to="/login"
          >
            Đăng nhập
          </Link>
        </section>
      </main>
    );
  }

  const initials = user.full_name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="min-h-screen bg-page py-10">
      <section className="mx-auto max-w-app px-6">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            User Profile
          </span>
          <h1 className="mt-2 text-3xl font-bold text-ink">Hồ sơ người dùng</h1>
        </div>
        <div className="grid gap-8 rounded-2xl border border-line bg-white p-6 shadow-sm md:grid-cols-[250px_1fr]">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-ink text-3xl font-black text-white">
              {initials}
            </div>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#c1c6d6] px-4 text-sm font-semibold text-ink hover:bg-soft">
              <Camera className="h-[18px] w-[18px]" /> Đổi ảnh
            </button>
          </div>
          <form className="grid gap-5">
            <label>
              <span className="mb-1.5 block text-sm font-medium text-ink">
                Họ và tên
              </span>
              <input
                defaultValue={user.full_name}
                className="h-11 w-full rounded-lg border border-[#c1c6d6] px-3.5 text-sm outline-none focus:border-primary"
              />
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-medium text-ink">
                Email
              </span>
              <input
                defaultValue={user.email}
                readOnly
                className="h-11 w-full rounded-lg border border-[#c1c6d6] bg-soft px-3.5 text-sm"
              />
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-medium text-ink">
                Vai trò
              </span>
              <input
                defaultValue={user.role}
                readOnly
                className="h-11 w-full rounded-lg border border-[#c1c6d6] bg-soft px-3.5 text-sm"
              />
            </label>
            <button
              className="inline-flex h-11 w-fit items-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-dark"
              type="button"
            >
              <Save className="h-[18px] w-[18px]" /> Lưu hồ sơ
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
