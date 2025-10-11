import api from "./api";
import { Post } from "@/types/topic";
import { CreatePostDTO } from "@/types/topic";

export const postService = {
  getAll: async (): Promise<Post[]> => {
    const res = await api.get("/posts");
    return res.data.posts;
  },

  getByTopicSlug: async (slug: string): Promise<Post[]> => {
    const res = await api.get(`/posts/topic/${slug}`);
    return res.data.posts;
  },

  getById: async (id: string): Promise<Post> => {
    console.log(`🔍 Fetching post with ID: ${id}`);
    const res = await api.get(`/posts/${id}`);
    
    // 🔍 Debug log để kiểm tra dữ liệu post
    console.log("📊 Post detail:", res.data.post);
    console.log("📷 Post image URL:", res.data.post?.image);
    
    return res.data.post;
  },

  /** 🔹 Tạo bài viết */
  create: async (data: CreatePostDTO): Promise<Post> => {
    const res = await api.post("/posts", data);
    return res.data.post;
  },

  /** 🔹 Cập nhật bài viết */
  update: async (id: string, data: Partial<CreatePostDTO>): Promise<Post> => {
    const res = await api.put(`/posts/${id}`, data);
    return res.data.post;
  },

  delete: async (id: string) => {
    const res = await api.delete(`/posts/${id}`);
    return res.data;
  },
};
