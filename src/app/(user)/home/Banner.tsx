"use client";

import Image from "next/image";
import { FaUsers, FaChartLine, FaUserTie, FaClock } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import Banner1 from "@/assets/home/image/banner/BannerBottom.svg";

export default function Banner() {
  const { t } = useLanguage();

  return (
    <div className="relative w-full aspect-[16/9] sm:aspect-[3/1] lg:aspect-[1200/380] max-h-[400px] sm:max-h-[500px] lg:max-h-[600px]">
      {/* Background Image */}
      <Image
        alt="Banner Bottom"
        src={Banner1}
        fill
        priority
        className="object-cover object-center"
      />

      {/* Desktop layout */}
      <div className="absolute inset-0 w-full h-full text-black hidden md:block">
        {/* Top Left - Clients/Consults */}
        <div className="absolute top-[15%] left-[32%] flex flex-col items-center">
          <FaUsers className="text-3xl mb-2 text-blue-600" />
          <h2 className="text-3xl font-bold">260</h2>
          <p className="text-lg">{t("home.banner.consults")}</p>
        </div>

        {/* Bottom Left - Goals Met */}
        <div className="absolute bottom-[15%] left-[8%] flex flex-col items-center">
          <FaChartLine className="text-3xl mb-2 text-blue-600" />
          <h2 className="text-3xl font-bold">95%</h2>
          <p className="text-lg">{t("home.banner.goalsMet")}</p>
        </div>

        {/* Top Right - Coaches/Experts */}
        <div className="absolute top-[15%] right-[24%] flex flex-col items-center">
          <FaUserTie className="text-3xl mb-2 text-blue-600" />
          <h2 className="text-3xl font-bold">15+</h2>
          <p className="text-lg">{t("home.banner.coaches")}</p>
        </div>

        {/* Bottom Right - Coaching Hours */}
        <div className="absolute bottom-[15%] right-[8%] flex flex-col items-center">
          <FaClock className="text-3xl mb-2 text-blue-600" />
          <h2 className="text-3xl font-bold">5000+</h2>
          <p className="text-lg">{t("home.banner.coachingHours")}</p>
        </div>
      </div>

      {/* Mobile & Tablet layout */}
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
    </div>
  );
}
