import api from "./api";
import { Banner } from "@/types/banner";

export const bannerService = {
  /** 🟩 Lấy tất cả banner */
  getAll: async (): Promise<Banner[]> => {
    const res = await api.get("/banners");
    return Array.isArray(res.data?.banners) ? res.data.banners : [];
  },

  /** 🟦 Lấy banner theo vị trí (home, service, about...) */
  getByPosition: async (position: string): Promise<Banner[]> => {
    const res = await api.get(`/banners/${position}`);
    return Array.isArray(res.data?.banners) ? res.data.banners : [];
  },

  /** 🟨 Tạo banner mới (có token) */
  create: async (formData: FormData): Promise<Banner> => {
    const token = localStorage.getItem("admin_access_token"); // ✅ hoặc sessionStorage
    const res = await api.post("/banners", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.banner;
  },

  /** 🟧 Cập nhật banner (có token) */
  update: async (id: string, formData: FormData): Promise<Banner> => {
    const token = localStorage.getItem("admin_access_token");
    const res = await api.put(`/banners/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.banner;
  },

  /** 🟥 Xóa banner (có token) */
  delete: async (id: string): Promise<void> => {
    const token = localStorage.getItem("admin_access_token");
    await api.delete(`/banners/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
