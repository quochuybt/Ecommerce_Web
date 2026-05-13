import { Link } from "react-router-dom";
import { CreditCard } from "lucide-react";
import { formatPrice } from "../../utils/formatters.js";

export default function CartSummary({ totals, disabled = false }) {
  const shipping = totals.subtotal > 0 ? 0 : 0;
  const discount = totals.subtotal > 20000000 ? 500000 : 0;
  const total = totals.subtotal + shipping - discount;

  return (
    <aside className="sticky top-32 space-y-5 rounded-xl border border-line bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-ink">Tóm tắt đơn hàng</h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between gap-4 text-[#414754]">
          <span>Tạm tính</span>
          <strong className="text-ink">{formatPrice(totals.subtotal)}</strong>
        </div>
        <div className="flex justify-between gap-4 text-[#414754]">
          <span>Vận chuyển</span>
          <strong className="text-ink">{shipping === 0 ? "Miễn phí" : formatPrice(shipping)}</strong>
        </div>
        <div className="flex justify-between gap-4 text-[#414754]">
          <span>Ưu đãi</span>
          <strong className="text-accent">-{formatPrice(discount)}</strong>
        </div>
      </div>
      <div className="flex justify-between border-t border-line pt-4 text-base">
        <span className="font-semibold text-ink">Tổng cộng</span>
        <strong className="text-accent">{formatPrice(total)}</strong>
      </div>
      <Link
        className={`flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-dark ${
          disabled ? "pointer-events-none opacity-50" : ""
        }`}
        to="/checkout"
      >
        <CreditCard className="h-[18px] w-[18px]" /> Thanh toán
      </Link>
    </aside>
  );
}
