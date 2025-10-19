"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { adminAuthService } from "@/services/adminAuth.service";
import { Loader2, LockKeyhole, CheckCircle2 } from "lucide-react";

export default function ChangePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("❌ Mật khẩu nhập lại không khớp");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/change-password", { password });
      adminAuthService.clearAccessToken();
      alert("✅ Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
      router.push("/admin/auth/login");
    } catch (err) {
      setError("❌ Đổi mật khẩu thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl w-full max-w-md p-8 border border-white/30">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <LockKeyhole className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Đổi mật khẩu lần đầu
          </h1>
          <p className="text-gray-500 text-sm">
            Vui lòng đặt mật khẩu mới để tiếp tục
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleChange} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-md">
              {error}
            </div>
          )}

          <div className="relative">
            <LockKeyhole className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Mật khẩu mới"
              className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <CheckCircle2 className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu mới"
              className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-all"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white font-semibold py-2.5 rounded-lg hover:bg-green-700 transition-all flex justify-center items-center shadow-md"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5 mr-2" /> Đang lưu...
              </>
            ) : (
              "Lưu mật khẩu mới"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-gray-400 text-xs mt-8">
          © {new Date().getFullYear()} Admin System. All rights reserved.
        </div>
      </div>

  );
}
