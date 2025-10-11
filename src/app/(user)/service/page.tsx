"use client";
import { useEffect, useState } from "react";
import { serviceService } from "@/services/service.service";
import { Service } from "@/types/service";
import ServiceCard from "./components/ServiceCard";
import Link from "next/link";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await serviceService.getAll();
        setServices(data);
      } catch (err) {
        console.error("❌ Fetch services error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <p className="text-center mt-10">Đang tải...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center relative">
        Dịch vụ của chúng tôi
        <span className="block absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-24 h-1 bg-green-700 rounded-full"></span>
      </h1>

      {services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((srv) => (
            <Link key={srv._id} href={`/service/${srv._id}`}>
              <ServiceCard
                title={srv.title}
                description={srv.description || ""}
                image={srv.image || srv.icon || "/images/default-service.jpg"}
              />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          Không có dịch vụ nào.
        </p>
      )}
    </div>
  );
}
