"use client";

import { Lightbulb, LineChart, Shield, Home, PieChart, Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function OurServices() {
  const { t } = useLanguage();

  const services = [
    {
      id: "68e4dc74653b638e2c8cdd3b",
      icon: <Lightbulb className="w-12 h-12 text-indigo-500 mx-auto transition-transform group-hover:scale-110" />,
      title: t("home.ourServices.services.0.title"),
      desc: t("home.ourServices.services.0.desc"),
    },
    {
      id: "68e4c17de031d8d116fdebbc",
      icon: <LineChart className="w-12 h-12 text-indigo-500 mx-auto transition-transform group-hover:scale-110" />,
      title: t("home.ourServices.services.1.title"),
      desc: t("home.ourServices.services.1.desc"),
    },
    {
      id: "68e3dbecc3d993e5db3b5fde",
      icon: <Shield className="w-12 h-12 text-indigo-500 mx-auto transition-transform group-hover:scale-110" />,
      title: t("home.ourServices.services.2.title"),
      desc: t("home.ourServices.services.2.desc"),
    },
    {
      id: "68e3dbd6c3d993e5db3b5fdc",
      icon: <Home className="w-12 h-12 text-indigo-500 mx-auto transition-transform group-hover:scale-110" />,
      title: t("home.ourServices.services.3.title"),
      desc: t("home.ourServices.services.3.desc"),
    },
    {
      id: "68e4dd22653b638e2c8cdd4f",
      icon: <PieChart className="w-12 h-12 text-indigo-500 mx-auto transition-transform group-hover:scale-110" />,
      title: t("home.ourServices.services.4.title"),
      desc: t("home.ourServices.services.4.desc"),
    },
    {
      id: "68e4dd43653b638e2c8cdd52",
      icon: <Briefcase className="w-12 h-12 text-indigo-500 mx-auto transition-transform group-hover:scale-110" />,
      title: t("home.ourServices.services.5.title"),
      desc: t("home.ourServices.services.5.desc"),
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {t("home.ourServices.title")}
        </h2>

        {/* Service Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((srv) => (
            <Link
              key={srv.id}
              href={`/service/${srv.id}`}
              className="group bg-white p-6 md:p-8 rounded-2xl shadow hover:shadow-xl hover:-translate-y-2 transition transform cursor-pointer block"
            >
              {/* Icon */}
              {srv.icon}

              <h3 className="mt-4 text-lg md:text-xl font-semibold text-gray-800">
                {srv.title}
              </h3>
              <p className="mt-2 md:mt-3 text-gray-500 text-sm md:text-base line-clamp-3">
                {srv.desc}
              </p>

           
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
