"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { serviceService } from "@/services/service.service";
import { Service } from "@/types/service";
import ServiceDetail from "../components/ServiceDetail";
import OtherServices from "../components/OtherServices";

export default function ServiceDetailPage() {
  const { id } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const data = await serviceService.getById(id as string);
        setService(data);
      } catch (err) {
        console.error("❌ Fetch service detail error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Đang tải dữ liệu...</p>;
  if (!service) return <p className="text-center mt-10 text-gray-500">Không tìm thấy dịch vụ.</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <ServiceDetail service={service} />
      <OtherServices currentId={service._id} />
    </div>
  );
}
