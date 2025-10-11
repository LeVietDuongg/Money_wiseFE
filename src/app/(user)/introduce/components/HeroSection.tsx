"use client";

import BannerImage from "@/assets/topic/conty.png";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <section className="relative w-full">
      {/* Container to maintain aspect ratio, responsive on all screens */}
      <div className="relative w-full aspect-[1200/380] max-h-[540px]">
        <Image
          src={BannerImage}
          alt="About Us Banner"
          fill

          priority
          className="object-cover" // fill image without distortion
        />

        {/* Text Overlay with better contrast */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-black/20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl">
            MONEYWISE VIETNAM
          </h1>
        </div>
      </div>
    </section>
  );
}
