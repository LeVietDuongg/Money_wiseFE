"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import HeroSection from "../components/HeroSection";
import { topicService } from "@/services/topic.service";
import { Topic, Post } from "@/types/topic";
import Contact from "@/components/Contact";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TopicPage() {
  const { slug } = useParams<{ slug: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const { t } = useLanguage();

  // 🟢 Hook luôn nằm trước mọi return
  const filteredPosts = useMemo(() => {
    const keyword = searchQuery.toLowerCase().trim();
    if (!keyword) return posts;

    return posts.filter((p) => {
      const matchTitle = p.title?.toLowerCase().includes(keyword);
      const matchExcerpt = p.excerpt?.toLowerCase().includes(keyword);
      const matchAuthor = p.author?.toLowerCase().includes(keyword);
      return matchTitle || matchExcerpt || matchAuthor;
    });
  }, [posts, searchQuery]);

  useEffect(() => {
    if (!slug) return;
    topicService
      .getBySlug(slug)
      .then((res: { topic: Topic; posts: Post[] }) => {
        setTopic(res.topic);
        setPosts(res.posts);
        setCurrentPage(1);
      })
      .catch(console.error);
  }, [slug]);

  // 🟡 Sau khi tất cả hook đã được gọi, mới return conditionally
  if (!topic) return <div className="p-10 text-center">Đang tải...</div>;

  // 🔢 Phân trang
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isVideoFile = (url?: string) =>
    url ? /\.(mp4|mov|webm|ogg)$/i.test(url) : false;

  const isYouTube = (url?: string) =>
    url ? /youtu\.?be|youtube\.com/.test(url) : false;

  const getYouTubeEmbedUrl = (url: string): string => {
    const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/) || [];
    const videoId = videoIdMatch[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <div>
      <HeroSection
        image={topic.banner ?? "/default-banner.jpg"}
        title={topic.title}
        subtitle={topic.subtitle ?? ""}
      />

      {/* 🟢 Thanh tiêu đề + ô tìm kiếm */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <h1 className="flex items-center text-xl sm:text-4xl font-bold px-3 py-2">
          {topic.title}
        </h1>

        <div className="flex items-center border border-green-600 rounded-full px-3 py-2 w-full sm:max-w-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-green-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
            />
          </svg>
          <input
            type="text"
            placeholder={t("topic.search")}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 px-3 py-1 text-gray-700 focus:outline-none text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Danh sách bài viết */}
      <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            Không tìm thấy bài viết nào.
          </p>
        ) : (
          currentPosts.map((post) => {
            const isVideo = post.type === "video";
            const videoUrl = post.videoUrl;
            return (
              <div
                key={post._id}
                className="border rounded-lg overflow-hidden shadow bg-white hover:shadow-lg transition flex flex-col"
              >
                <div className="relative w-full h-48 bg-gray-100">
                  {isVideo && videoUrl ? (
                    isYouTube(videoUrl) ? (
                      <iframe
                        src={getYouTubeEmbedUrl(videoUrl)}
                        className="w-full h-full"
                        allowFullScreen
                      ></iframe>
                    ) : isVideoFile(videoUrl) ? (
                      <video
                        src={videoUrl}
                        className="w-full h-full object-cover"
                        controls
                        muted
                        loop
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        Video không hợp lệ
                      </div>
                    )
                  ) : (
                    <Image
                      src={post.image || "/default-thumbnail.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto">
                    <a
                      href={`/topic/${slug}/post/${post._id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Xem chi tiết →
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded-md ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <ChevronLeft />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-2 border rounded-md ${
                currentPage === i + 1
                  ? "bg-green-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded-md ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <ChevronRight />
          </button>
        </div>
      )}

      <div className="w-[80%] border-t border-green-800 mt-6 mx-auto"></div>
      <Contact />
    </div>
  );
}
