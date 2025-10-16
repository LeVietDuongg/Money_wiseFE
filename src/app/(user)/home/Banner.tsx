"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaChartLine, FaUserTie, FaClock } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { bannerService } from "@/services/banner.service";
import { Banner as BannerType } from "@/types/banner";
import Banner1 from "@/assets/home/image/banner/BannerBottom.svg";

export default function Banner() {
  const { t } = useLanguage();
  const [banners, setBanners] = useState<BannerType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🟩 Lấy banner từ backend
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await bannerService.getByPosition("about");
        if (Array.isArray(res)) setBanners(res);
        else if (res) setBanners([res]);
      } catch (error) {
        console.error("Error fetching banner:", error);
        setBanners([]);
      }
    };
    fetchBanner();
  }, []);

  // 🟦 Tự động chuyển banner nếu có nhiều cái
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  const currentBanner = banners[currentIndex];

  return (
    <section className="relative w-full aspect-[16/9] sm:aspect-[3/1] lg:aspect-[1200/380] overflow-hidden max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] rounded-lg">
      {/* 🔹 Background image (backend or fallback) */}
      <motion.div
        key={currentBanner?._id || "default"}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          alt="Banner Background"
          src={currentBanner?.imageUrl || Banner1}
          fill
          priority
          className="object-cover object-center"
        />
        {/* Overlay nếu muốn làm mờ ảnh backend */}
        <div className="absolute inset-0 bg-white/10"></div>
      </motion.div>

      {/* 🔹 Nội dung chính */}
      <div className="absolute inset-0 w-full h-full text-black hidden md:block">
        <div className="absolute top-[15%] left-[32%] flex flex-col items-center">
          <FaUsers className="text-3xl mb-2 text-blue-600" />
          <h2 className="text-3xl font-bold">260</h2>
          <p className="text-lg">{t("home.banner.consults")}</p>
        </div>

        <div className="absolute bottom-[15%] left-[8%] flex flex-col items-center">
          <FaChartLine className="text-3xl mb-2 text-blue-600" />
          <h2 className="text-3xl font-bold">95%</h2>
          <p className="text-lg">{t("home.banner.goalsMet")}</p>
        </div>

        <div className="absolute top-[15%] right-[24%] flex flex-col items-center">
          <FaUserTie className="text-3xl mb-2 text-blue-600" />
          <h2 className="text-3xl font-bold">15+</h2>
          <p className="text-lg">{t("home.banner.coaches")}</p>
        </div>

        <div className="absolute bottom-[15%] right-[8%] flex flex-col items-center">
          <FaClock className="text-3xl mb-2 text-blue-600" />
          <h2 className="text-3xl font-bold">5000+</h2>
          <p className="text-lg">{t("home.banner.coachingHours")}</p>
        </div>
      </div>

      {/* 🔹 Mobile layout */}
      <div className="absolute inset-0 flex flex-col md:hidden justify-center items-center gap-6 text-black bg-white/60 p-4">
        <div className="flex flex-col items-center">
          <FaUsers className="text-2xl mb-1 text-blue-600" />
          <h2 className="text-xl font-bold">260</h2>
          <p className="text-sm">{t("home.banner.consults")}</p>
        </div>
        <div className="flex flex-col items-center">
          <FaChartLine className="text-2xl mb-1 text-blue-600" />
          <h2 className="text-xl font-bold">95%</h2>
          <p className="text-sm">{t("home.banner.goalsMet")}</p>
        </div>
        <div className="flex flex-col items-center">
          <FaUserTie className="text-2xl mb-1 text-blue-600" />
          <h2 className="text-xl font-bold">15+</h2>
          <p className="text-sm">{t("home.banner.coaches")}</p>
        </div>
        <div className="flex flex-col items-center">
          <FaClock className="text-2xl mb-1 text-blue-600" />
          <h2 className="text-xl font-bold">5000+</h2>
          <p className="text-sm">{t("home.banner.coachingHours")}</p>
        </div>
      </div>

      {/* 🔹 Dots indicator nếu có nhiều banner */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
          {banners.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentIndex ? "bg-blue-500 scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
