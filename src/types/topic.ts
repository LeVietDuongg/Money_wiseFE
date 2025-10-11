import { StaticImageData } from "next/image";

export interface Post {
  _id?: string;
  id?: number;
  title: string;
  excerpt: string;
  content?: string;
  contentBeforeVideo?: string;
  contentAfterVideo?: string;
  type: "image" | "video";
  image?: StaticImageData | string;
  videoUrl?: string;
  author: string;
  topic?: string | Topic;
  topicSlug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Topic {
  _id?: string;
  slug: string;
  title: string;
  subtitle?: string;
  banner?: StaticImageData | string;
  posts?: Post[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePostDTO {
  topicSlug: string;
  title: string;
  excerpt?: string;
  author: string;
  type: "image" | "video";
  image?: string;
  videoUrl?: string;
  content?: string;
  contentBeforeVideo?: string;
  contentAfterVideo?: string;
}
