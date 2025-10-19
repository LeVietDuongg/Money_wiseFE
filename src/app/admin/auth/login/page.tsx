"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { adminAuthService } from "@/services/adminAuth.service";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import type { AxiosError } from "axios";

interface LoginResponse {
  accessToken: string;
  mustResetPassword?: boolean;
}

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post<LoginResponse>("/auth/login", { email, password });
      const { accessToken, mustResetPassword } = res.data;

      adminAuthService.setAccessToken(accessToken);

      router.push(
        mustResetPassword ? "/admin/auth/change-password" : "/admin/dashboard"
      );
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Đăng nhập thất bại. Vui lòng thử lại.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl w-full max-w-md p-8 border border-white/30 transition-transform duration-300 hover:-translate-y-1 hover:shadow-emerald-100/50">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">
          Admin Portal
        </h1>
        <p className="text-gray-500 text-sm">Đăng nhập để quản trị hệ thống</p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-md">
            {error}
          </div>
        )}

        <div className="relative">
          <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-all bg-white/80"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <LockKeyhole className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-all bg-white/80"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              <Loader2 className="animate-spin w-5 h-5 mr-2" /> Đang đăng nhập...
            </>
          ) : (
            "Đăng nhập"
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
