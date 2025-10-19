"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { adminAuthService } from "@/services/adminAuth.service";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = adminAuthService.getAccessToken();

    // ❗ Bỏ qua check khi ở trang đăng nhập
    if (pathname.startsWith("/admin/auth")) {
      setChecking(false);
      return;
    }

    if (!token) {
      router.replace("/admin/auth/login");
    } else {
      setChecking(false);
    }
  }, [router, pathname]);

  if (checking) return null; // tránh flicker khi load

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>
    </div>
  );
}
