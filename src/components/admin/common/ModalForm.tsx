"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";

import { Service } from "@/types/service";

interface ModalFormProps {
  open: boolean;
  title: string;
  initialData?: Partial<Service>;
  onClose: () => void;
  onSubmit: (data: Partial<Service>, files?: { icon?: File; image?: File }) => void;
}

export default function ModalForm({
  open,
  title,
  initialData,
  onClose,
  onSubmit,
}: ModalFormProps) {
  const [formTitle, setFormTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormTitle(initialData.title ?? "");
      setDescription(initialData.description ?? "");
      setContent(initialData.content ?? "");
      setIconPreview(initialData.icon ?? "");
      setImagePreview(initialData.image ?? "");
      setIconFile(null);
      setImageFile(null);
    } else {
      setFormTitle("");
      setDescription("");
      setContent("");
      setIconFile(null);
      setImageFile(null);
      setIconPreview("");
      setImagePreview("");
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!formTitle.trim() || !description.trim()) {
      alert("Vui lòng nhập đủ Tiêu đề và Mô tả");
      return;
    }

    const result: Partial<Service> = {
      ...initialData,
      title: formTitle.trim(),
      description: description.trim(),
      content: content.trim(),
    };

    onSubmit(result, { icon: iconFile || undefined, image: imageFile || undefined });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Tiêu đề */}
          <div>
            <label className="text-sm text-gray-700 block mb-1">Tiêu đề dịch vụ</label>
            <Input
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="Nhập tiêu đề..."
            />
          </div>

          {/* Mô tả */}
          <div>
            <label className="text-sm text-gray-700 block mb-1">Mô tả</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả..."
              rows={3}
            />
          </div>

          {/* Nội dung */}
          <div>
            <label className="text-sm text-gray-700 block mb-1">Nội dung chi tiết</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập nội dung chi tiết..."
              rows={4}
            />
          </div>

          {/* Icon */}
          <div>
            <label className="text-sm text-gray-700 block mb-1">Icon</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selected = e.target.files?.[0];
                if (selected) {
                  setIconFile(selected);
                  setIconPreview(URL.createObjectURL(selected));
                }
              }}
              className="block w-full border rounded-md px-2 py-1 text-sm"
            />
            {iconPreview && (
              <img
                src={iconPreview}
                alt="Icon preview"
                className="w-16 h-16 object-cover rounded-md border mt-2"
              />
            )}
          </div>

          {/* Image */}
          <div>
            <label className="text-sm text-gray-700 block mb-1">Ảnh chi tiết</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selected = e.target.files?.[0];
                if (selected) {
                  setImageFile(selected);
                  setImagePreview(URL.createObjectURL(selected));
                }
              }}
              className="block w-full border rounded-md px-2 py-1 text-sm"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image preview"
                className="w-24 h-24 object-cover rounded-md border mt-2"
              />
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSubmit}>Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
