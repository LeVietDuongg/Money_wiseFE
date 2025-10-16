"use client";

import React, { useEffect, useState } from "react";
import { postService } from "@/services/post.service";
import { topicService } from "@/services/topic.service";
import { CreatePostDTO, Post, Topic } from "@/types/topic";
import {
  MdAdd,
  MdSearch,
  MdEdit,
  MdDelete,
  MdVisibility,
} from "react-icons/md";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";

export default function PostsManagement() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [topicFilter, setTopicFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);

  // form state
  const [form, setForm] = useState<CreatePostDTO>({
    title: "",
    excerpt: "",
    author: "",
    topicSlug: "",
    type: "image",
    image: "",
    videoUrl: "",
    content: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const PER_PAGE = 9;
  const [page, setPage] = useState(1);

  // 🟢 Lấy dữ liệu bài viết và chủ đề
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [postsRes, topicsRes] = await Promise.all([
          postService.getAll(),
          topicService.getAll(),
        ]);
        setPosts(postsRes);
        setTopics(topicsRes);
      } catch (error) {
        console.error("❌ Lỗi tải bài viết:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🔍 Lọc bài viết
  const filtered = posts.filter((p) => {
    const matchTitle = p.title?.toLowerCase().includes(search.toLowerCase());
    const matchTopic =
      topicFilter === "all" ||
      (typeof p.topic === "object" && p.topic._id === topicFilter) ||
      p.topic === topicFilter;
    return matchTitle && matchTopic;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const currentData = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // 🗑 Xóa bài viết
  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa bài viết này?")) return;
    try {
      await postService.delete(id);
      setPosts(posts.filter((p) => p._id !== id));
    } catch (error) {
      console.error("❌ Lỗi xóa bài viết:", error);
    }
  };

  // ✏️ Mở modal
  const openModal = (post?: Post) => {
    if (post) {
      setForm({
        title: post.title || "",
        excerpt: post.excerpt || "",
        author: post.author || "",
        topicSlug:
          typeof post.topic === "object"
            ? post.topic.slug
            : (post.topic as string),
        type: post.type || "image",
        image: post.image || "",
        videoUrl: post.videoUrl || "",
        content: post.content || "",
      });
      setPreview(post.image || null);
      setEditing(post);
    } else {
      setForm({
        title: "",
        excerpt: "",
        author: "",
        topicSlug: "",
        type: "image",
        image: "",
        videoUrl: "",
        content: "",
      });
      setPreview(null);
      setEditing(null);
    }
    setImageFile(null);
    setModalOpen(true);
  };

  // 🟩 Lưu bài viết
  const handleSubmit = async () => {
    if (!form.title.trim()) return alert("Vui lòng nhập tiêu đề bài viết!");
    if (!form.author.trim()) return alert("Vui lòng nhập tác giả!");
    if (!form.topicSlug.trim()) return alert("Vui lòng chọn chủ đề!");

    try {
      const payload: CreatePostDTO & { imageFile?: File } = {
        ...form,
        type: form.videoUrl ? "video" : "image",
      };

      if (imageFile) payload.imageFile = imageFile;

      if (editing) {
        await postService.update(editing._id, payload);
      } else {
        await postService.create(payload);
      }

      // Load lại danh sách
      const updatedPosts = await postService.getAll();
      setPosts(updatedPosts);
      setModalOpen(false);
      setEditing(null);
      setImageFile(null);
      setPreview(null);
    } catch (error) {
      console.error("❌ Lỗi lưu bài viết:", error);
      alert("Không thể lưu bài viết. Vui lòng thử lại.");
    }
  };

  // 🟡 Xử lý chọn file ảnh
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Danh sách bài viết
          </h1>
          <p className="text-gray-500 mt-1">
            Quản lý tất cả bài viết trên website
          </p>
        </div>
        <Button onClick={() => openModal()}>
          <MdAdd size={16} className="mr-1" /> Thêm Bài Viết
        </Button>
      </div>

      {/* Bộ lọc */}
      <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
        <div className="relative flex-shrink min-w-[120px] w-full sm:w-auto">
          <MdSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            className="w-full sm:w-64 pl-10 py-2 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={topicFilter}
          onChange={(e) => setTopicFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-2 text-xs sm:text-sm"
        >
          <option value="all">Tất cả chủ đề</option>
          {topics.map((t) => (
            <option key={t._id} value={t._id}>
              {t.title}
            </option>
          ))}
        </select>
      </div>

      {/* Danh sách bài viết */}
      <Card>
        <CardHeader>
          <CardTitle>
            {loading
              ? "Đang tải..."
              : `Hiển thị ${currentData.length} / ${filtered.length} bài viết`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-[800px] w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">Tiêu đề</th>
                  <th className="text-left py-3 px-4">Tác giả</th>
                  <th className="text-left py-3 px-4">Chủ đề</th>
                  <th className="text-left py-3 px-4">Ngày tạo</th>
                  <th className="text-left py-3 px-4">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((p) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{p.title}</td>
                    <td className="py-3 px-4">{p.author}</td>
                    <td className="py-3 px-4">
                      {typeof p.topic === "object" ? p.topic.title : "—"}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {p.createdAt
                        ? new Date(p.createdAt).toLocaleDateString("vi-VN")
                        : "—"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            window.open(
                              `/topic/${
                                typeof p.topic === "object" ? p.topic.slug : ""
                              }/post/${p._id}`
                            )
                          }
                          className="text-gray-400 hover:text-blue-600"
                        >
                          <MdVisibility size={16} />
                        </button>
                        <button
                          onClick={() => openModal(p)}
                          className="text-gray-400 hover:text-blue-600"
                        >
                          <MdEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <MdDelete size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-3 py-1 border rounded-lg text-sm ${
                page === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Trước
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`px-3 py-1 border rounded-lg text-sm ${
                  num === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`px-3 py-1 border rounded-lg text-sm ${
                page === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Sau
            </button>
          </div>
        )}
      </Card>

      {/* Modal thêm/sửa bài viết */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
      >
        <div className="space-y-3">
          <Input
            placeholder="Tiêu đề *"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Input
            placeholder="Mô tả ngắn"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
          <Input
            placeholder="Tác giả"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />
          <select
            value={form.topicSlug}
            onChange={(e) => setForm({ ...form, topicSlug: e.target.value })}
            className="border w-full p-2 rounded-lg text-sm"
          >
            <option value="">Chọn chủ đề</option>
            {topics.map((t) => (
              <option key={t._id} value={t.slug}>
                {t.title}
              </option>
            ))}
          </select>

          {/* Upload ảnh */}
          <div>
            <label className="text-sm font-medium">Ảnh đại diện</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm border rounded-lg p-2 mt-1"
            />
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-2 w-full h-40 object-cover rounded-lg border"
              />
            )}
          </div>

          <Input
            placeholder="Video YouTube URL (tuỳ chọn)"
            value={form.videoUrl}
            onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
          />
          <textarea
            placeholder="Nội dung bài viết"
            className="w-full border rounded-lg p-2 h-32 text-sm"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <div className="flex justify-end space-x-2 pt-3">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSubmit}>Lưu</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
