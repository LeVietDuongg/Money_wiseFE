"use client";

import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";


export default function Testimonials() {
  const { t } = useLanguage();
  
  const testimonials = [
  {
    content: t("home.testimonials.testimonial1.content"),
    name: t("home.testimonials.testimonial1.name"),
    title: t("home.testimonials.testimonial1.title"),
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    content: t("home.testimonials.testimonial2.content"),
    name: t("home.testimonials.testimonial2.name"),
    title: t("home.testimonials.testimonial2.title"),
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    content: t("home.testimonials.testimonial3.content"),
    name: t("home.testimonials.testimonial3.name"),
    title: t("home.testimonials.testimonial3.title"),
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-center">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          {t("home.testimonials.title")}
        </h2>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          {t("home.testimonials.subtitle")}
        </p>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 sm:p-8 text-left hover:shadow-lg transition"
            >
              <FaQuoteLeft className="text-green-600 text-2xl sm:text-3xl mb-3" />
              <p className="text-gray-700 mb-4 text-sm sm:text-base">
                {item.content}
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-sm sm:text-base">{item.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{item.title}</p>
                </div>
              </div>
              <div className="flex mt-3 text-yellow-400 text-sm sm:text-base">
                {[...Array(5)].map((_, idx) => (
                  <FaStar key={idx} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
