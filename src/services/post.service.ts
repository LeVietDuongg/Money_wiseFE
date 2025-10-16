import api from "./api";
import { Post, CreatePostDTO } from "@/types/topic";

export const postService = {
  /** 🟢 Lấy tất cả bài viết */
  getAll: async (): Promise<Post[]> => {
    const res = await api.get("/posts");
    return res.data.posts;
  },

  /** 🟢 Lấy bài viết theo topic slug */
  getByTopicSlug: async (slug: string): Promise<Post[]> => {
    const res = await api.get(`/posts/topic/${slug}`);
    return res.data.posts;
  },

  /** 🟢 Lấy chi tiết 1 bài viết */
  getById: async (id: string): Promise<Post> => {
    const res = await api.get(`/posts/${id}`);
    return res.data.post;
  },

  /** 🟩 Tạo bài viết (có thể có upload ảnh) */
  create: async (data: CreatePostDTO & { imageFile?: File }): Promise<Post> => {
    const formData = new FormData();

    // 🔸 Chuyển các field text sang FormData
    formData.append("topicSlug", data.topicSlug);
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("type", data.type);

    if (data.excerpt) formData.append("excerpt", data.excerpt);
    if (data.videoUrl) formData.append("videoUrl", data.videoUrl);
    if (data.content) formData.append("content", data.content);
    if (data.contentBeforeVideo) formData.append("contentBeforeVideo", data.contentBeforeVideo);
    if (data.contentAfterVideo) formData.append("contentAfterVideo", data.contentAfterVideo);

    // 🔸 File upload
    if (data.imageFile) {
      formData.append("image", data.imageFile);
    }

    const res = await api.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.post;
  },

  /** 🟦 Cập nhật bài viết (có thể có upload ảnh mới) */
  update: async (
    id: string,
    data: Partial<CreatePostDTO> & { imageFile?: File }
  ): Promise<Post> => {
    const formData = new FormData();

    if (data.topicSlug) formData.append("topicSlug", data.topicSlug);
    if (data.title) formData.append("title", data.title);
    if (data.excerpt) formData.append("excerpt", data.excerpt);
    if (data.author) formData.append("author", data.author);
    if (data.type) formData.append("type", data.type);
    if (data.videoUrl) formData.append("videoUrl", data.videoUrl);
    if (data.content) formData.append("content", data.content);
    if (data.contentBeforeVideo)
      formData.append("contentBeforeVideo", data.contentBeforeVideo);
    if (data.contentAfterVideo)
      formData.append("contentAfterVideo", data.contentAfterVideo);

    if (data.imageFile) formData.append("image", data.imageFile);

    const res = await api.put(`/posts/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.post;
  },

  /** 🔴 Xóa bài viết */
  delete: async (id: string) => {
    const res = await api.delete(`/posts/${id}`);
    return res.data;
  },
};
