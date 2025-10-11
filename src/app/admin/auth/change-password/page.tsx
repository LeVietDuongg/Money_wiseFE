"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { adminAuthService } from "@/services/adminAuth.service";

export default function ChangePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Mật khẩu nhập lại không khớp");
      return;
    }

    try {
     await api.post("/auth/change-password", { password });
      alert("Đổi mật khẩu thành công!");
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Đổi mật khẩu thất bại");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-100">
      <form
        onSubmit={handleChange}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Đổi mật khẩu lần đầu
        </h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <input
          type="password"
          placeholder="Mật khẩu mới"
          className="border w-full p-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Xác nhận mật khẩu"
          className="border w-full p-2 mb-6 rounded"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Lưu mật khẩu mới
        </button>
      </form>
    </div>
  );
}
