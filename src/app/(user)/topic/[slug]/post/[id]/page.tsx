"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { postService } from "@/services/post.service";
import { topicService } from "@/services/topic.service";
import { Post, Topic } from "@/types/topic";
import DifferentPost from "../../../components/DifferentPost";
import Contact from "@/components/Contact";

export default function PostPage() {
  const params = useParams<{ slug: string; id: string }>();
  const { id, slug } = params;

  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!id) return;

    // Lấy bài viết chi tiết
    postService
      .getById(id)
      .then((res: Post) => {
        setPost(res);

        // Sau khi có bài viết -> lấy các bài viết khác cùng topic
        if (res.topic) {
          topicService
            .getBySlug(slug)
            .then((res: { topic: Topic; posts: Post[] }) => {
              // loại bỏ bài hiện tại
              const others = res.posts.filter((p) => p._id !== id);
              setRelatedPosts(others);
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  }, [id, slug]);

  if (!post) return <div className="p-10 text-center">Đang tải...</div>;
  if (!post._id) return notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-4">Tác giả: {post.author}</p>
      <p className="text-gray-700 leading-relaxed mb-4">{post.excerpt}</p>

      {post.type === "video" ? (
        <iframe
          src={post.videoUrl}
          className="w-full aspect-video rounded-lg shadow"
          allowFullScreen
        />
      ) : (
        post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full rounded-lg shadow"
          />
        )
      )}

      <div className="mt-6 text-gray-800 leading-relaxed whitespace-pre-line">
        {post.content}
      </div>
 {/* Divider */}
      <div className="w-full border-t border-green-800 mt-6 mx-auto"></div>
      {/* 🧩 Bài viết khác */}
      {relatedPosts.length > 0 && (
        <DifferentPost posts={relatedPosts} currentPostId={post._id} slug={slug} />
      )}

      <Contact />
    </div>
  );
}
