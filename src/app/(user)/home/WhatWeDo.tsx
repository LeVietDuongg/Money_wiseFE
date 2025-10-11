"use client";

import { Lightbulb, BarChart3, Headphones } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WhatWeDo() {
  const { t } = useLanguage();
  
  const services = [
    {
     icon: <Lightbulb className="w-12 h-12 text-indigo-500 mx-auto transition-transform group-hover:scale-110" />,
      title: t("home.whatWeDo.service1.title"),
      desc: t("home.whatWeDo.service1.desc"),
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-indigo-500 mx-auto transition-transform group-hover:scale-110" />,
      title: t("home.whatWeDo.service2.title"),
      desc: t("home.whatWeDo.service2.desc"),
    },
    {
      icon: <Headphones className="w-12 h-12 text-indigo-500 mx-auto transition-transform group-hover:scale-110" />,
      title: t("home.whatWeDo.service3.title"),
      desc: t("home.whatWeDo.service3.desc"),
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {t("home.whatWeDo.title")}
        </h2>
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
          {t("home.whatWeDo.subtitle")}
        </p>

        {/* Service Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 md:p-8 rounded-2xl shadow hover:shadow-lg transition"
             >
              {service.icon}
              <h3 className="mt-4 md:mt-6 text-lg md:text-xl font-semibold text-gray-800">
                {service.title}
              </h3>
              <p className="mt-2 md:mt-3 text-gray-500 text-sm md:text-base">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
