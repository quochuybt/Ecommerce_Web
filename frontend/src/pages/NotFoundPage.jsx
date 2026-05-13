import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-page px-6">
      <section className="max-w-lg rounded-xl border border-line bg-white p-10 text-center shadow-soft">
        <h1 className="text-5xl font-black text-primary">404</h1>
        <p className="mt-3 text-sm text-[#414754]">Trang bạn tìm không tồn tại.</p>
        <Link className="mt-5 inline-flex h-11 items-center rounded-lg bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-dark" to="/">
          Về trang chủ
        </Link>
      </section>
    </main>
  );
}
