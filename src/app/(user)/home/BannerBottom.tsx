"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { bannerService } from "@/services/banner.service";
import { contactService } from "@/services/contact.service"; 
import toast from "react-hot-toast"; // 
import { Banner } from "@/types/banner";
import Banner1 from "@/assets/home/image/banner/banner1.svg";

export default function BannerBottom() {
  const { t } = useLanguage();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // 🟩 Lấy banner
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

  // 🟦 Auto slide
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Vui lòng nhập email!");
      return;
    }

    try {
      setLoading(true);
      const res = await contactService.sendMessage({ email, type: "newsletter" });
      if (res.success) {
        toast.success("Đăng ký nhận tin thành công!");
        setEmail("");
      } else {
        toast.error(res.message || "Gửi thất bại!");
      }
    } catch (err) {
      toast.error("Không thể gửi email. Vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  const currentBanner = banners[currentIndex];

  return (
    <div className="relative w-full aspect-[16/9] sm:aspect-[3/1] lg:aspect-[1200/380] overflow-hidden rounded-lg">
      <motion.div
        key={currentBanner?._id || "default"}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        <Image
          alt="Banner Bottom"
          src={currentBanner?.imageUrl || Banner1}
          fill
          priority
          className="object-cover object-center brightness-90 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </motion.div>

      {/* Overlay nội dung */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="text-center text-white max-w-2xl w-full">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
            {t("home.bannerBottom.title")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6">
            {t("home.bannerBottom.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row w-full max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <input
              type="email"
              placeholder={t("home.bannerBottom.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 text-gray-700 focus:outline-none text-sm sm:text-base"
            />
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-[#247749] text-white font-semibold hover:opacity-90 transition text-sm sm:text-base disabled:opacity-70"
            >
              {loading ? "..." : t("home.bannerBottom.button")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
