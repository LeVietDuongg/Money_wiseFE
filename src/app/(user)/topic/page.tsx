"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import Link from "next/link";
import { topicService } from "@/services/topic.service";
import { Topic } from "@/types/topic";

export default function TopicListPage() {
  const router = useRouter();

  const handleTopicClick = (slug: string) => {
    router.push(`/topic/${slug}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Danh sách chủ đề
      </h1>

      {/* Desktop/Laptop: danh sách dọc */}
      <ul className="hidden sm:block space-y-4">
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link
              href={`/topic/${topic.slug}`}
              className="text-blue-600 hover:underline text-lg"
            >
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile/Tablet: grid card */}
      <div className="grid grid-cols-1 gap-6 sm:hidden">
        {topics.map((topic) => (
          <button
            key={topic.slug}
            onClick={() => handleTopicClick(topic.slug)}
            className="relative block border-2 border-blue-200 rounded-2xl p-8 min-h-[100px] shadow-md hover:shadow-xl active:shadow-inner active:border-blue-400 transition-all bg-gradient-to-br from-white to-blue-50 text-center font-bold text-xl w-full touch-manipulation select-none"
            style={{ 
              WebkitTapHighlightColor: 'rgba(59, 130, 246, 0.1)',
              cursor: 'pointer'
            }}
          >
            <span className="text-blue-700">{topic.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
