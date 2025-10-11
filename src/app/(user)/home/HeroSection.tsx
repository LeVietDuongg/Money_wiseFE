"use client";

import Image from "next/image";
import Card from "@/assets/home/image/banner/Card.svg";
import UserCard from "@/assets/home/image/banner/User.svg";
import People from "@/assets/home/image/banner/People.svg";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const { t } = useLanguage();
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    // Tạo particles trang trí
    const particleArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(particleArray);
  }, []);

  useEffect(() => {
    // Typewriter effect cho title1
    const fullText = t("home.hero.title1");
    let currentIndex = 0;
    setDisplayedText("");

    const typeWriter = () => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        // Reset sau 2 giây khi hoàn thành
        setTimeout(() => {
          currentIndex = 0;
          setDisplayedText("");
        }, 2000);
      }
    };

    const interval = setInterval(typeWriter, 150); // 150ms mỗi chữ

    return () => clearInterval(interval);
  }, [t]);

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
        <div className="mx-auto flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 z-10 max-w-xl">
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
          <p className="text-gray-900 text-base md:text-lg">
            {t("home.hero.subtitle")}
          </p>

          <motion.div 
            className="flex gap-4 flex-wrap justify-center w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button 
              className="relative px-6 py-3 rounded-full bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300 text-black font-semibold shadow-xl overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Shine Effect */}
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
            </motion.button>
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