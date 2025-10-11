"use client";

import Image from "next/image";
import { FaFacebook, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

// Assets
import Person1 from "@/assets/home/about/dacap.png";
import Person2 from "@/assets/home/about/dacap2.png";

export default function AboutUs() {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 md:mb-28 text-center text-[#2C3E50]">
          {t("home.aboutUs.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-start">
          {/* Images Left */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 relative">
            {/* Image 1 */}
            <div className="relative group">
              <div className="w-full h-[300px] sm:h-[350px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={Person1}
                  alt="Man looking up"
                  width={400}
                  height={500}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Monthly Members box */}
              <div className="absolute -top-6 -right-4 sm:-top-8 sm:-right-6 md:-top-20 md:-right-44 bg-white px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-4 rounded-xl shadow-xl text-center w-32 sm:w-36 md:w-44 border border-gray-100">
                <p className="text-gray-500 text-xs sm:text-sm font-medium">
                  {t("home.aboutUs.monthlyMembers")}
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-black mt-1">5000+</p>
              </div>
            </div>

            {/* Image 2 */}
            <div className="relative group mt-8 sm:mt-12">
              <div className="w-full h-[300px] sm:h-[350px] md:h-[420px] bg-[#E8D69F] rounded-2xl shadow-lg flex items-center justify-center overflow-hidden">
                <Image
                  src={Person2}
                  alt="Man smiling while using phone"
                  width={250}
                  height={350}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Reviews box */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 md:-bottom-12 md:-left-40 bg-white px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-3 shadow-xl rounded-xl border border-gray-100">
                <div className="flex flex-col items-center space-y-1 sm:space-y-2">
                  <div className="flex -space-x-1 sm:-space-x-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 border-2 border-white"></div>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 border-2 border-white"></div>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 border-2 border-white"></div>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 border-2 border-white flex items-center justify-center text-xs text-white font-bold">
                      +
                    </div>
                  </div>
                  <p className="text-black font-bold text-xs sm:text-sm whitespace-nowrap">
                    {t("home.aboutUs.reviews")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Right */}
          <div className="md:col-span-2 flex flex-col justify-center max-w-[800px] w-full">
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {t("home.aboutUs.description1")}{" "}
              <span className="font-semibold">MoneyWise</span>. {t("home.aboutUs.description2")}
            </p>
            <div className="mt-1 text-gray-700 leading-relaxed text-sm sm:text-base space-y-1">
              <p>{t("home.aboutUs.point1")}</p>
              <p>{t("home.aboutUs.point2")}</p>
              <p>{t("home.aboutUs.point3")}</p>
              <p>{t("home.aboutUs.point4")}</p>
            </div>
            {/* Button */}
            <button className="mt-6 w-full sm:w-fit px-6 py-3 sm:px-8 sm:py-3 bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-base sm:text-lg font-semibold rounded-lg shadow hover:opacity-90 transition">
              {t("home.aboutUs.explore")}
            </button>

            {/* Social icons */}
            <div className="flex gap-4 sm:gap-5 mt-6 justify-center sm:justify-start">
              <FaFacebook
                size={28}
                className="sm:w-8 sm:h-8 md:w-9 md:h-9 text-[#4267B2] cursor-pointer hover:scale-110 transition-transform"
              />
              <FaLinkedin
                size={28}
                className="sm:w-8 sm:h-8 md:w-9 md:h-9 text-[#0A66C2] cursor-pointer hover:scale-110 transition-transform"
              />
              <FaTiktok
                size={28}
                className="sm:w-8 sm:h-8 md:w-9 md:h-9 text-black cursor-pointer hover:scale-110 transition-transform"
              />
              <FaYoutube
                size={28}
                className="sm:w-8 sm:h-8 md:w-9 md:h-9 text-[#FF0000] cursor-pointer hover:scale-110 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
