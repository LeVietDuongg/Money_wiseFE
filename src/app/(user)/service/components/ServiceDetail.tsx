"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { Service } from "@/types/service";

interface ServiceDetailProps {
  service: Service;
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  const { t } = useLanguage();
  
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        {t("service.company")}
      </h3>

      {service.image && (
        <Image
          src={service.image}
          alt={service.title}
          width={800}
          height={400}
          className="rounded-md mb-6"
        />
      )}

      <p className="text-gray-700 leading-relaxed mb-4">
        {service.description}
      </p>

      {service.content && (
        <div 
          className="text-gray-700 leading-relaxed mb-4 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: service.content }}
        />
      )}
    </div>
  );
}
