"use client";
import React, { useEffect, useState } from "react";
import { serviceService } from "@/services/service.service";
import { Service } from "@/types/service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import ModalForm from "../common/ModalForm";
import Image from "next/image";
import { isAxiosError } from "axios";

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editService, setEditService] = useState<Service | null>(null);

  const fetchAll = async () => {
    try {
      const s = await serviceService.getAll();
      setServices(s);
    } catch (err) {
      console.error("⚠️ Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSave = async (
    formData: Partial<Service>,
    files?: { icon?: File; image?: File }
  ) => {
    try {
      if (editService) {
        await serviceService.update(editService._id!, formData, files);
      } else {
        await serviceService.create(formData, files);
      }
      await fetchAll();
      setModalOpen(false);
      setEditService(null);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        console.error("❌ Save error:", err.response?.data);
        alert(`Có lỗi xảy ra: ${err.response?.data?.message || err.message}`);
      } else if (err instanceof Error) {
        alert(`Lỗi: ${err.message}`);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Xác nhận xóa dịch vụ này?")) return;
    try {
      await serviceService.delete(id);
      await fetchAll();
    } catch (err) {
      alert("Không thể xóa dịch vụ");
    }
  };

  if (loading) return <p>Đang tải...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Danh sách dịch vụ</h1>
        <Button
          onClick={() => {
            setEditService(null);
            setModalOpen(true);
          }}
          className="flex items-center space-x-1"
        >
          <MdAdd size={16} />
          <span>Thêm Dịch Vụ</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{`Tổng cộng: ${services.length} dịch vụ`}</CardTitle>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <p>Chưa có dịch vụ nào</p>
          ) : (
            <table className="min-w-[700px] w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-3 text-left">Icon</th>
                  <th className="py-2 px-3 text-left">Ảnh</th>
                  <th className="py-2 px-3 text-left">Tiêu đề</th>
                  <th className="py-2 px-3 text-left">Mô tả</th>
                  <th className="py-2 px-3 text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {services.map((srv) => (
                  <tr key={srv._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">
                      {srv.icon ? (
                        <Image
                          src={srv.icon}
                          alt="Icon"
                          width={32}
                          height={32}
                          className="w-8 h-8 object-cover rounded-md border"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-2 px-3">
                      {srv.image ? (
                        <Image
                          src={srv.image}
                          alt="Service image"
                          width={64}
                          height={64}
                          className="w-16 h-16 object-cover rounded-md border"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-2 px-3">{srv.title}</td>
                    <td className="py-2 px-3">{srv.description || "-"}</td>
                    <td className="py-2 px-3">
                      <button
                        className="mr-2 text-blue-600"
                        onClick={() => {
                          setEditService(srv);
                          setModalOpen(true);
                        }}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => handleDelete(srv._id!)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <ModalForm
        open={modalOpen}
        title={editService ? "Sửa dịch vụ" : "Thêm dịch vụ"}
        initialData={editService || undefined}
        onClose={() => {
          setModalOpen(false);
          setEditService(null);
        }}
        onSubmit={handleSave}
      />
    </div>
  );
}
