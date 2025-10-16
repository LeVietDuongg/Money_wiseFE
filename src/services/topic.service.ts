import api from "./api";
import { Topic, Post } from "@/types/topic";

export const topicService = {
  /** 🟢 Lấy tất cả topic */
  getAll: async (): Promise<Topic[]> => {
    const res = await api.get("/topics");
    return res.data.topics; // backend trả { success: true, topics }
  },

  /** 🟢 Lấy chi tiết 1 topic + danh sách post */
  getBySlug: async (slug: string): Promise<{ topic: Topic; posts: Post[] }> => {
    if (!slug) throw new Error("Slug is required");
    const res = await api.get(`/topics/${slug}`);
    // backend trả { success, topic, posts }
    return {
      topic: res.data.topic,
      posts: res.data.posts,
    };
  },

  /** 🟢 Tạo topic */
  create: async (data: Partial<Topic>): Promise<Topic> => {
    const res = await api.post("/topics", data);
    return res.data.topic;
  },

  /** 🟡 Cập nhật topic */
  update: async (id: string, data: Partial<Topic>): Promise<Topic> => {
    const res = await api.put(`/topics/${id}`, data);
    return res.data.topic;
  },

  /** 🔴 Xóa topic */
  delete: async (id: string) => {
    const res = await api.delete(`/topics/${id}`);
    return res.data;
  },
};
