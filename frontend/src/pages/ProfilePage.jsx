import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Camera, Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth.jsx";
import { api } from "../services/api.js";

// Helper function to compress and resize image before upload
const compressImage = (file, maxWidth = 300, maxHeight = 300, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      // Adjust dimensions while keeping aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Export as a lightweight JPEG base64 string
      const base64 = canvas.toDataURL("image/jpeg", quality);
      URL.revokeObjectURL(img.src);
      resolve(base64);
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(img.src);
      reject(err);
    };
  });
};

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);

  const [fullName, setFullName] = useState(user?.full_name || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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

  const initials = fullName
    ? fullName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Compress image client-side to a very small base64 string (~20-40KB)
      const base64String = await compressImage(file, 250, 250, 0.6);
      
      // Store the base64 string directly as the avatar URL
      setAvatarUrl(base64String);
      setSuccessMsg("Đã chọn ảnh thành công! Hãy nhấn nút 'Lưu hồ sơ' bên dưới để áp dụng vĩnh viễn.");
    } catch (err) {
      console.error(err);
      setErrorMsg("Không thể xử lý file ảnh.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg("Họ và tên không được để trống");
      return;
    }

    setSaving(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Direct API update to user profile, sending the base64 avatar directly
      const res = await api.put(`/users/${user.id}`, {
        full_name: fullName,
        avatar_url: avatarUrl,
      });

      if (res.user) {
        updateUser({
          full_name: res.user.full_name,
          avatar_url: res.user.avatar_url,
        });
        setSuccessMsg("Cập nhật hồ sơ và ảnh đại diện thành công!");
      } else {
        setErrorMsg("Không tìm thấy thông tin user cập nhật.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Cập nhật hồ sơ thất bại.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-page py-10">
      <section className="mx-auto max-w-app px-6">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            User Profile
          </span>
          <h1 className="mt-2 text-3xl font-bold text-ink">Hồ sơ người dùng</h1>
        </div>

        {successMsg && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 text-sm text-emerald-800 shadow-sm animate-fadeIn">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
            <p className="font-medium">{successMsg}</p>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-rose-100 bg-rose-50/50 p-4 text-sm text-rose-800 shadow-sm animate-fadeIn">
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
            <p className="font-medium">{errorMsg}</p>
          </div>
        )}

        <div className="grid gap-8 rounded-2xl border border-line bg-white p-6 shadow-sm md:grid-cols-[250px_1fr]">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-ink text-3xl font-black text-white border-2 border-line transition-all shadow-md">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/55 backdrop-blur-xs">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <button
              type="button"
              disabled={uploading || saving}
              onClick={handleAvatarClick}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#c1c6d6] px-4 text-sm font-semibold text-ink hover:bg-soft transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Camera className="h-[18px] w-[18px]" /> Đổi ảnh
            </button>
          </div>

          <form onSubmit={handleSave} className="grid gap-5">
            <label>
              <span className="mb-1.5 block text-sm font-medium text-ink">
                Họ và tên
              </span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nhập họ và tên"
                className="h-11 w-full rounded-lg border border-[#c1c6d6] px-3.5 text-sm outline-none focus:border-primary transition-all focus:ring-2 focus:ring-primary/10"
              />
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-medium text-ink">
                Email
              </span>
              <input
                type="email"
                defaultValue={user.email}
                readOnly
                className="h-11 w-full rounded-lg border border-[#c1c6d6] bg-soft px-3.5 text-sm text-muted cursor-not-allowed"
              />
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-medium text-ink">
                Vai trò
              </span>
              <input
                type="text"
                defaultValue={user.role}
                readOnly
                className="h-11 w-full rounded-lg border border-[#c1c6d6] bg-soft px-3.5 text-sm text-muted cursor-not-allowed"
              />
            </label>

            <button
              type="submit"
              disabled={uploading || saving}
              className="inline-flex h-11 w-fit items-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-dark transition-all disabled:opacity-50 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              {saving ? (
                <>
                  <Loader2 className="h-[18px] w-[18px] animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="h-[18px] w-[18px]" />
                  Lưu hồ sơ
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
