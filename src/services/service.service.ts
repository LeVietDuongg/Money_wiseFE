import api from "./api";
import { Service } from "@/types/service";

export const serviceService = {
  /** 🟩 Lấy tất cả dịch vụ */
  getAll: async (): Promise<Service[]> => {
    const res = await api.get("/services");
    return Array.isArray(res.data?.services) ? res.data.services : [];
  },

  /** 🟦 Lấy chi tiết theo ID */
  getById: async (id: string): Promise<Service> => {
    const res = await api.get(`/services/${id}`);
    return res.data?.service || res.data;
  },

  /** 🟨 Tạo mới (kèm icon + image nếu có) */
  create: async (
    data: Partial<Service>,
    files?: { icon?: File; image?: File }
  ): Promise<Service> => {
    const formData = new FormData();

    // 🧩 Thêm 2 file icon & image
    if (files?.icon instanceof File) formData.append("icon", files.icon);
    if (files?.image instanceof File) formData.append("image", files.image);

    // 🧩 Thêm các trường text
    if (data.title) formData.append("title", data.title.trim());
    if (data.description) formData.append("description", data.description.trim());
    if (data.content) formData.append("content", data.content.trim());

    const res = await api.post("/services", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data?.service || res.data;
  },

  /** 🟧 Cập nhật (kèm icon + image nếu có) */
  update: async (
    id: string,
    data: Partial<Service>,
    files?: { icon?: File; image?: File }
  ): Promise<Service> => {
    const formData = new FormData();

    if (files?.icon instanceof File) formData.append("icon", files.icon);
    if (files?.image instanceof File) formData.append("image", files.image);

    if (data.title) formData.append("title", data.title.trim());
    if (data.description) formData.append("description", data.description.trim());
    if (data.content) formData.append("content", data.content.trim());

    const res = await api.put(`/services/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data?.service || res.data;
  },

  /** 🟥 Xóa */
  delete: async (id: string): Promise<{ message: string }> => {
    const res = await api.delete(`/services/${id}`);
    return res.data;
  },
};
