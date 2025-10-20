"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { postService } from "@/services/post.service";
import { Post } from "@/types/topic";

export default function FeaturedNews() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getAll();
        // postService.getAll() đã trả về mảng posts trực tiếp
        console.log("📥 Fetched posts:", data);
        setPosts(data.slice(0, 6)); // 🔹 Lấy 6 bài đầu tiên
      } catch (err) {
        console.error("Failed to load posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 text-center">
        <p className="text-gray-500">{t("loading") || "Đang tải..."}</p>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* ...phần heading... */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("home.featuredNews.title")}
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            {t("home.featuredNews.subtitle")}
          </p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
{posts.map((item, index) => {
            // Lấy topic slug từ item.topic
            const topicSlug = typeof item.topic === "object" && "slug" in item.topic
              ? item.topic.slug
              : "where-money"; // fallback
            
            return (
              <SwiperSlide key={index} className="h-auto flex pb-2">
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-[500px] w-full">
                  <div className="relative w-full h-[220px] overflow-hidden flex-shrink-0">
                    <Image
                      src={item.imageUrl || "/default-image.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Nội dung */}
                  <div className="flex flex-col justify-between flex-1 p-4">
                    <div className="flex-1 max-h-[170px] md:max-h-[190px] overflow-hidden">
                      <h3 className="text-lg font-bold text-blue-600 line-clamp-2  leading-tight mb-0.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 uppercase mb-3">
                        {typeof item.topic === "object" && "title" in item.topic
                          ? item.topic.title
                          : "Chưa có danh mục"}
                      </p>

                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-4 min-h-[84px]">
                        {item.excerpt || item.content?.slice(0, 120) + "..."}
                      </p>
                    </div>
                    <div className="mt-3">
                      <Link
                        href={`/topic/${topicSlug}/post/${item._id}`}
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 hover:gap-3 transition-all text-sm"
                      >
                        {t("home.featuredNews.readMore")}
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* View All */}
        <div className="flex justify-center mt-10">
          <Link
            href="/topic/where-money"
            className="text-blue-600 font-semibold hover:underline text-lg"
          >
            {t("home.featuredNews.viewAll")} 
          </Link>
        </div>
      </div>
    </section>
  );
}
