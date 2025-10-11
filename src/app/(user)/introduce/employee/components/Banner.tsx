"use client";

import BannerImage from "@/assets/about/banner.svg";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Banner() {
  const { t } = useLanguage();
  
  return (
    <section className="relative w-full">
      {/* Responsive image aspect ratio */}
      <div className="relative w-full aspect-[1200/380] max-h-[380px]">
        <Image
          src={BannerImage}
          alt="Banner"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
            {t("introduce.employee.title")}
          </h1>
          <p className="mt-2 text-xs sm:text-sm md:text-lg text-white drop-shadow-md">
            {t("introduce.employee.subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
