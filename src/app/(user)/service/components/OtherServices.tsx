"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ServiceCard from "./ServiceCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { serviceService } from "@/services/service.service";
import { Service } from "@/types/service";

interface OtherServicesProps {
  currentId: string;
}

export default function OtherServices({ currentId }: OtherServicesProps) {
  const { t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await serviceService.getAll();
        // Lọc bỏ service hiện tại và lấy 3 services khác
        const otherServices = data.filter(s => s._id !== currentId).slice(0, 3);
        setServices(otherServices);
      } catch (err) {
        console.error("Error fetching other services:", err);
      }
    };
    fetchServices();
  }, [currentId]);

  if (services.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 mt-14">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">{t("service.otherServices.title")}</h3>
        <Link href="/service" className="text-green-600 hover:underline">
          {t("service.otherServices.viewAll")}
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((srv) => (
          <Link key={srv._id} href={`/service/${srv._id}`}>
            <ServiceCard
              title={srv.title}
              description={srv.description || ""}
              image={srv.icon || "/images/default-service.jpg"}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
