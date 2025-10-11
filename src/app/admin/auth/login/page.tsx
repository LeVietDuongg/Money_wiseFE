"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { adminAuthService } from "@/services/adminAuth.service";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  try {
    const res = await api.post("/auth/login", { email, password });
    const { accessToken, mustResetPassword } = res.data;

    adminAuthService.setAccessToken(accessToken);

    if (mustResetPassword) {
      router.push("/admin/auth/change-password"); // 👈 ép đổi mật khẩu lần đầu
    } else {
      router.push("/admin/dashboard");
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else if (typeof err === "object" && err && "response" in err) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr.response?.data?.message || "Đăng nhập thất bại");
    } else {
      setError("Đăng nhập thất bại");
    }
  }
};


  return (
    <div className="flex justify-center items-center h-screen bg-green-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-6 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
