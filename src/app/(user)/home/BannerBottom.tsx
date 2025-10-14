"use client";

import Image from "next/image";
import Banner1 from "@/assets/home/image/banner/banner1.svg";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BannerBottom() {
  const { t } = useLanguage();
  
  return (
    <div className="relative w-full aspect-[16/9] sm:aspect-[3/1] lg:aspect-[1200/380] max-h-[400px] sm:max-h-[500px] lg:max-h-[700px]">
      {/* Background Image */}
      <Image
        alt="Banner Bottom"
        src={Banner1}
        fill
        priority
        className="object-cover object-center brightness-90"
      />

      {/* Overlay Text + Input */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="text-center text-white max-w-2xl w-full">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 leading-snug">
            {t("home.bannerBottom.title")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6">
            {t("home.bannerBottom.subtitle")}
          </p>

          {/* Input + Button */}
          <div className="flex flex-col sm:flex-row w-full max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <input
              type="email"
              placeholder={t("home.bannerBottom.placeholder")}
              className="flex-1 px-4 py-3 text-gray-700 focus:outline-none text-sm sm:text-base"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-[#247749] text-white font-semibold hover:opacity-90 transition text-sm sm:text-base">
              {t("home.bannerBottom.button")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
