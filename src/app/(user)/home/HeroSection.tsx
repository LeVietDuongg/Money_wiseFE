"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { bannerService } from "@/services/banner.service";
import Card from "@/assets/home/image/banner/Card.svg";
import UserCard from "@/assets/home/image/banner/User.svg";
import People from "@/assets/home/image/banner/People.svg";
import { Banner } from "@/types/banner";

export default function HeroSection() {
  const { t } = useLanguage();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);

  //  Lấy banner từ backend
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await bannerService.getByPosition("home");
        setBanners(res || []);
      } catch (err) {
        console.error(" Fetch banners failed:", err);
        setBanners([]); // fallback
      }
    };
    fetchBanners();
  }, []);

  //  Slide tự động
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  //  Typewriter effect
  useEffect(() => {
    const fullText = t("home.hero.title1");
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        index = 0;
        setDisplayedText("");
      }
    }, 150);
    return () => clearInterval(interval);
  }, [t]);

  //  Tạo particles
  useEffect(() => {
    const particleArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(particleArray);
  }, []);

  //  Nếu có banner từ backend → hiển thị slide
  if (banners.length > 0) {
    return (
      <section className="relative w-full overflow-hidden h-[500px] md:h-[600px] lg:h-[680px] rounded-lg">
        {banners.map((banner, index) => (
          <motion.div
            key={banner._id || index}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={banner.imageUrl}
              alt={banner.title || "Banner"}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-5xl font-bold"
              >
                {banner.title || ""}
              </motion.h2>
              {banner.createdAt && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 text-lg md:text-xl max-w-2xl"
                >
                  {banner.title}
                </motion.p>
              )}
              {banner.link && (
                <Link
                  href={banner.link}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full text-black font-semibold shadow-xl"
                >
                  {t("home.hero.bookSession")}
                </Link>
              )}
            </div>
          </motion.div>
        ))}

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
          {banners.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentIndex ? "bg-orange-400 scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      className="w-full flex items-center justify-center 
      overflow-hidden rounded-lg relative
      bg-gradient-to-r from-[#E6F0FF] via-[#FEECEB] to-[#F4E7FF] px-4 md:px-8 lg:px-12 h-auto lg:h-[680px]"
    >
      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.5, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut" as const,
          }}
        />
      ))}

      {/* Decorative Circles */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 rounded-full bg-yellow-300/30 blur-xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut" as const,
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-purple-300/30 blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut" as const,
        }}
      />

      {/* Sparkles */}
      <motion.div
        className="absolute top-[20%] right-[15%] text-4xl"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear" as const,
        }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute bottom-[30%] left-[10%] text-3xl"
        animate={{
          rotate: [360, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "linear" as const,
        }}
      >
        💫
      </motion.div>
      <motion.div
        className="absolute top-[40%] left-[5%] text-2xl"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut" as const,
        }}
      >
        ⭐
      </motion.div>
      
      <div className="flex flex-col lg:flex-row items-center justify-between w-[95%] lg:w-[90%] py-8 gap-8">
        {/* Text bên trái */}
        <div className="mx-auto flex flex-col items-center lg:items-center text-center lg:text-center space-y-6 z-10 max-w-xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
            <span className="text-orange-500 inline-block min-h-[1.2em]">
              {displayedText}
              <motion.span
                className="inline-block w-0.5 h-8 bg-orange-500 ml-1"
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                }}
              />
            </span>
            {" " + t("home.hero.title2")}
            {" " + t("home.hero.title3")}
          </h2>

          <p className="text-gray-900 text-base md:text-lg leading-relaxed">
            {t("home.hero.subtitle")}
          </p>

          <motion.div 
            className="flex gap-4 flex-wrap justify-center w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
              <Link
                href="/contact"
                className="relative px-6 py-3 rounded-full bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300 text-black font-semibold shadow-xl overflow-hidden group inline-block"
              >
                {/* Shine Effect (kept as a background animated layer) */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut" as const,
                  }}
                />

                {/* Button Content */}
                <span className="relative z-10 flex items-center gap-2">
                  {t("home.hero.bookSession")}
                  <motion.span
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut" as const,
                    }}
                  >
                    →
                  </motion.span>
                </span>

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-yellow-400/50 blur-xl"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut" as const,
                  }}
                />
              </Link>
          </motion.div>
        </div>

        {/* Hình minh hoạ bên phải */}
        <div className="relative flex justify-end items-center w-full lg:w-1/2">
          <div className="relative w-full max-w-[420px] md:max-w-[500px] lg:max-w-[650px]">
            {/* People chính → sát phải */}
            <Image
              src={People}
              alt="People"
              className="w-full relative z-10 top-8 md:top-16 lg:top-32"
            />

            {/* Payment Card bên trái */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ y: -10, rotate: 5, scale: 1.05 }}
              className="absolute top-[15%] left-[28%] w-[90px] md:w-[140px] lg:w-[180px] z-20"
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-blue-400/30 blur-2xl rounded-lg"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                }}
              />
              <Image
                src={Card}
                alt="Payment card"
                className="relative z-10 w-full drop-shadow-2xl"
              />
            </motion.div>

            {/* UserCard bên phải, giữa container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ y: -10, rotate: -5, scale: 1.05 }}
              className="absolute -right-12 top-36 -translate-y-1/2 w-[90px] md:w-[140px] lg:w-[180px] z-30"
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-purple-400/30 blur-2xl rounded-lg"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                  delay: 0.5,
                }}
              />
              <Image
                src={UserCard}
                alt="Active Users"
                className="relative z-10 w-full drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}