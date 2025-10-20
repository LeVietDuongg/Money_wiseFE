// src/types/topic.ts
export interface Topic {
  _id: string;
  slug: string;
  title: string;
  subtitle?: string;
  banner?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Post {
  _id: string;
  topic: Topic | string;
  title: string;
  excerpt: string;
  author: string;
  type: "image" | "video";
  image?: string;
  videoUrl?: string;
  imageUrl: string; // thêm thuộc tính imageUrl
  content?: string;
  contentBeforeVideo?: string;
  contentAfterVideo?: string;
  createdAt?: string;
  updatedAt?: string;
}
// src/types/topic.ts
export interface CreatePostDTO {
  topicSlug: string;      // bắt buộc, backend cần
  title: string;          // bắt buộc
  excerpt?: string;
  author: string;         // bắt buộc
  type: "image" | "video"; // mặc định "image" nếu muốn
  image?: string;
  videoUrl?: string;
  content?: string;
  contentBeforeVideo?: string;
  contentAfterVideo?: string;
}

