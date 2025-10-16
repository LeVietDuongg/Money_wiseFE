"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import know from "@/assets/topic/know.png";
import cani55 from "@/assets/topic/cani55.png";
import begintoadvance from "@/assets/topic/begintoadvance.png";
import mistake from "@/assets/topic/sailam.jpg";
import lifetimemoney from "@/assets/topic/lifttimemoeny.png";
import retail55 from "@/assets/topic/retail55.png";

export default function FeaturedNews() {
  const { t } = useLanguage();

  const news = [
    { title: t("home.featuredNews.news1.title"), category: t("home.featuredNews.news1.category"), desc: t("home.featuredNews.news1.desc"), img: cani55 },
    { title: t("home.featuredNews.news2.title"), category: t("home.featuredNews.news2.category"), desc: t("home.featuredNews.news2.desc"), img: mistake },
    { title: t("home.featuredNews.news3.title"), category: t("home.featuredNews.news3.category"), desc: t("home.featuredNews.news3.desc"), img: know },
    { title: t("home.featuredNews.news4.title"), category: t("home.featuredNews.news4.category"), desc: t("home.featuredNews.news4.desc"), img: cani55 },
    { title: t("home.featuredNews.news5.title"), category: t("home.featuredNews.news5.category"), desc: t("home.featuredNews.news5.desc"), img: know },
    { title: t("home.featuredNews.news6.title"), category: t("home.featuredNews.news6.category"), desc: t("home.featuredNews.news6.desc"), img: know },
  ];

  // Animation variants
  const leftVariants: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] } },
  };

  const rightVariants: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] } },
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("home.featuredNews.title")}</h2>
          <p className="text-gray-600 text-sm md:text-base">{t("home.featuredNews.subtitle")}</p>
        </div>

        {/* News list */}
        <div className="space-y-0">
          {news.map((item, index) => {
            const isRight = index % 2 === 1; // item bên phải
            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={isRight ? rightVariants : leftVariants}
              >
                <div className={`flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 py-12 md:py-16 ${isRight ? "md:flex-row-reverse" : ""}`}>
                  {/* Image */}
                  <div className="w-full md:w-1/2">
                    <div className="overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
                      <Image
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                      />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center p-4 md:p-6">
                    <h3 className="text-2xl font-bold text-blue-600">{item.title}</h3>
                    <p className="text-sm font-medium text-gray-600 uppercase my-2">{item.category}</p>
                    <p className="text-gray-600 text-base leading-relaxed">{item.desc}</p>
                    <a href="#" className="inline-block mt-4 text-blue-600 font-semibold hover:underline">
                      {t("home.featuredNews.readMore")}
                    </a>
                  </div>
                </div>

                {/* Horizontal divider */}
                {index < news.length - 1 && <hr className="border-t border-gray-300" />}
              </motion.div>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="flex justify-center mt-12">
          <a
            href="topic/where-money"
            className="text-blue-600 font-semibold hover:underline text-lg"
          >
            {t("home.featuredNews.viewAll")} →
          </a>
        </div>
      </div>
    </section>
  );
}
