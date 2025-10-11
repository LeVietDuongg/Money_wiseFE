"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Post } from "@/types/topic";

export default function DifferentPost({
  posts,
  currentPostId,
  slug,
}: {
  posts: Post[];
  currentPostId: string;
  slug: string;
}) {
  const filtered = posts.filter((p) => p._id !== currentPostId);
  const [startIndex, setStartIndex] = useState(0);

  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
    }
    return 3;
  };

  const VISIBLE_COUNT = getVisibleCount();
  const visiblePosts = filtered.slice(startIndex, startIndex + VISIBLE_COUNT);

  const handlePrev = () => startIndex > 0 && setStartIndex((p) => p - 1);
  const handleNext = () =>
    startIndex + VISIBLE_COUNT < filtered.length && setStartIndex((p) => p + 1);

  if (filtered.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">Bài viết khác</h2>
        <Link
          href={`/topic/${slug}`}
          className="text-blue-600 hover:underline text-sm sm:text-base"
        >
          Xem tất cả
        </Link>
      </div>

      <div className="relative">
        {/* Prev */}
        <ChevronLeft
          onClick={handlePrev}
          className={`absolute -left-4 sm:-left-8 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-full p-2 cursor-pointer shadow-md
            ${
              startIndex === 0
                ? "opacity-40 cursor-not-allowed"
                : "bg-green-300 text-gray-700 hover:bg-gray-100"
            }`}
        />

        {/* Posts */}
        <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-hidden">
          {visiblePosts.map((post) => (
            <Link
              key={post._id}
              href={`/topic/${slug}/post/${post._id}`}
              className="bg-white shadow-md rounded-lg flex flex-col hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative w-full h-40 sm:h-48">
                {post.type === "image" && post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                )}
                {post.type === "video" && (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
                    🎬 Video
                  </div>
                )}
              </div>
              <div className="p-3 sm:p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-base sm:text-lg line-clamp-1 min-h-[1.5rem]">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 min-h-[3rem]">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Next */}
        <ChevronRight
          onClick={handleNext}
          className={`absolute -right-4 sm:-right-8 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-full p-2 cursor-pointer shadow-md
            ${
              startIndex + VISIBLE_COUNT >= filtered.length
                ? "opacity-40 cursor-not-allowed"
                : "bg-green-300 text-gray-700 hover:bg-gray-100"
            }`}
        />
      </div>
    </div>
  );
}
