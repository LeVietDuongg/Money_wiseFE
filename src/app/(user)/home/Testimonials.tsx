"use client";

import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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

        {/* Swiper Slider */}
        <div className="mt-10">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((item, i) => (
              <SwiperSlide key={i} className="pb-2">
                <div
                  className="
                    bg-white rounded-2xl shadow-md 
                    p-6 sm:p-8 
                    text-left 
                    hover:shadow-xl transition-all duration-300 
                    flex flex-col justify-between 
                    h-[320px] sm:h-[340px]
                  "
                >
                  <div>
                    <FaQuoteLeft className="text-green-600 text-2xl sm:text-3xl mb-3" />
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed line-clamp-5">
                      {item.content}
                    </p>
                  </div>

                  <div className="mt-2 pt-3 border-t-2 border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-green-100"
                      />
                      <div>
                        <p className="font-semibold text-sm sm:text-base text-gray-800">{item.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{item.title}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 text-yellow-400 text-base">
                      {[...Array(5)].map((_, idx) => (
                        <FaStar key={idx} />
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
