'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { Banner } from "@/types/banner";
import { bannerService } from "@/services/banner.service";
import { MdClose, MdCloudUpload } from "react-icons/md";

interface BannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Banner | null;
}

export default function BannerModal({ isOpen, onClose, onSuccess, initialData }: BannerModalProps) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [position, setPosition] = useState<Banner["position"]>("home");
  const [order, setOrder] = useState<number>(0);
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🟢 Load dữ liệu khi edit
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setLink(initialData.link || "");
      setPosition(initialData.position);
      setOrder(initialData.order);
      setIsActive(initialData.isActive);
      setPreview(initialData.imageUrl);
    } else {
      setTitle("");
      setLink("");
      setPosition("home");
      setOrder(0);
      setIsActive(true);
      setImage(null);
      setPreview(null);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("link", link);
      formData.append("position", position);
      formData.append("order", String(order));
      formData.append("isActive", String(isActive));
      if (image) formData.append("image", image);

      if (initialData) {
        await bannerService.update(initialData._id, formData);
      } else {
        await bannerService.create(formData);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("❌ Lỗi khi lưu banner:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg relative p-6">
        {/* Header */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <MdClose size={22} />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Chỉnh sửa Banner" : "Thêm Banner mới"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Liên kết (tùy chọn)</label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Vị trí</label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value as Banner["position"])}
                className="w-full mt-1 p-2 border rounded-lg"
              >
                <option value="home">Trang chủ</option>
                <option value="service">Trang dịch vụ</option>
                <option value="about">Giới thiệu</option>
                <option value="custom">Tùy chỉnh</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Thứ tự hiển thị</label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Ảnh */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh banner</label>
            <div
              onClick={() => document.getElementById("imageUpload")?.click()}
              className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
            >
              {preview ? (
                <div className="relative w-full h-48">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              ) : (
                <>
                  <MdCloudUpload size={32} className="text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Chọn ảnh để tải lên</p>
                </>
              )}
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
          </div>

          {/* Trạng thái */}
          <div className="flex items-center space-x-2">
            <input
              id="active"
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="active" className="text-sm text-gray-700">
              Hoạt động
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Đang lưu..." : initialData ? "Cập nhật" : "Tạo mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
