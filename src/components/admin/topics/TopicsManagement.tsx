"use client";

import { useEffect, useState } from "react";
import { topicService } from "@/services/topic.service";
import { Topic } from "@/types/topic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MdAdd, MdEdit, MdDelete, MdSearch } from "react-icons/md";
import Modal from "@/components/ui/Modal";

export default function TopicsManagement() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Topic | null>(null);

  // form state
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    banner: "",
  });

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const data = await topicService.getAll();
      setTopics(data);
    } catch (err) {
      console.error("Lỗi lấy topic:", err);
    } finally {
      setLoading(false);
    }
  };

const handleSubmit = async () => {
  if (!form.title.trim()) return alert("Tên chủ đề không được để trống!");

  try {
    // 🧠 Tạo slug tự động từ title
    const slug = form.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    const payload = { ...form, slug };

    if (editing) {
      await topicService.update(editing._id, payload);
    } else {
      await topicService.create(payload);
    }

    fetchTopics();
    closeModal();
  } catch (err) {
    console.error("Lỗi lưu topic:", err);
    alert("Không thể lưu chủ đề. Kiểm tra console để xem chi tiết.");
  }
};

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc muốn xóa chủ đề này?")) {
      await topicService.delete(id);
      fetchTopics();
    }
  };

  const openModal = (topic?: Topic) => {
    if (topic)
      setForm({
        title: topic.title,
        subtitle: topic.subtitle ?? "",
        banner: topic.banner ?? "",
      });
    else setForm({ title: "", subtitle: "", banner: "" });
    setEditing(topic || null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    setForm({ title: "", subtitle: "", banner: "" });
  };

  const filtered = topics.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý Chủ Đề</h1>
        <Button onClick={() => openModal()}>
          <MdAdd className="mr-2" /> Thêm Chủ Đề
        </Button>
      </div>

      <div className="relative w-full sm:w-80">
        <MdSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Tìm kiếm chủ đề..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {loading
              ? "Đang tải..."
              : `Danh sách chủ đề (${filtered.length})`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="p-4 text-center">Đang tải dữ liệu...</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Tên chủ đề</th>
                  <th className="text-left py-3 px-4">Mô tả</th>
                  <th className="text-left py-3 px-4">Banner</th>
                  <th className="text-left py-3 px-4">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{t.title}</td>
                    <td className="py-3 px-4">{t.subtitle}</td>
                    <td className="py-3 px-4 truncate max-w-[180px]">
                      {t.banner ? (
                        <a
                          href={t.banner}
                          target="_blank"
                          className="text-blue-500 underline"
                        >
                          Xem ảnh
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-3 px-4 flex gap-3">
                      <button
                        onClick={() => openModal(t)}
                        className="text-blue-600"
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="text-red-600"
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

      {/* Modal thêm/sửa */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editing ? "Chỉnh sửa Chủ Đề" : "Thêm Chủ Đề Mới"}
      >
        <div className="space-y-3">
          <Input
            placeholder="Tên chủ đề *"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Input
            placeholder="Mô tả ngắn"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          />
          <Input
            placeholder="Link banner"
            value={form.banner}
            onChange={(e) => setForm({ ...form, banner: e.target.value })}
          />
          <div className="flex justify-end space-x-2 pt-3">
            <Button variant="secondary" onClick={closeModal}>
              Hủy
            </Button>
            <Button onClick={handleSubmit}>Lưu</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
