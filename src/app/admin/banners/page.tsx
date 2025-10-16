'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { bannerService } from '@/services/banner.service';
import { Banner } from '@/types/banner';
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdSearch,
  MdVisibility,
  MdVisibilityOff,
  MdImage,
  MdCalendarToday,
  MdBarChart,
} from 'react-icons/md';
import BannerModal from './BannerModal';

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);

  // 🟢 Gọi API khi component mount
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const data = await bannerService.getAll();
      setBanners(data);
    } catch (error) {
      console.error('❌ Lỗi khi tải banner:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // 🟣 Lọc theo từ khóa tìm kiếm
  const filteredBanners = banners.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  // 🟡 Hàm mở modal thêm/sửa
  const openAddModal = () => {
    setSelectedBanner(null);
    setModalOpen(true);
  };

  const openEditModal = (banner: Banner) => {
    setSelectedBanner(banner);
    setModalOpen(true);
  };

  // 🟢 Sau khi thêm/sửa thành công
  const handleSuccess = async () => {
    await fetchBanners();
  };

  // 🔹 Hàm helper hiển thị thông tin
  const getPositionBadge = (position: string) => {
    const badges = {
      home: 'bg-blue-100 text-blue-800',
      service: 'bg-green-100 text-green-800',
      about: 'bg-yellow-100 text-yellow-800',
      custom: 'bg-purple-100 text-purple-800',
    };
    return badges[position as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getPositionText = (position: string) => {
    const positions = {
      home: 'Trang chủ',
      service: 'Trang dịch vụ',
      about: 'Giới thiệu',
      custom: 'Tùy chỉnh',
    };
    return positions[position as keyof typeof positions] || position;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản Lý Banner</h1>
            <p className="mt-1 text-sm text-gray-500">
              Quản lý các banner quảng cáo trên trang web
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MdAdd className="mr-2" size={16} />
            Thêm Banner
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MdImage className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Tổng Banner</p>
                  <p className="text-2xl font-bold text-gray-900">{banners.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MdVisibility className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Đang Hoạt Động</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {banners.filter((b) => b.isActive).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MdCalendarToday className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Cập nhật gần đây</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {banners.length > 0
                      ? new Date(banners[banners.length - 1].updatedAt).toLocaleDateString('vi-VN')
                      : '-'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MdBarChart className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Vị trí hiển thị</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(banners.map((b) => b.position)).size}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search bar */}
        <Card>
          <CardContent className="p-6">
            <div className="relative flex-1 max-w-md">
              <MdSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Tìm kiếm banner..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh Sách Banner ({filteredBanners.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-6 text-center text-gray-500">Đang tải dữ liệu...</div>
            ) : filteredBanners.length === 0 ? (
              <div className="p-6 text-center text-gray-500">Không có banner nào</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hình ảnh
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tiêu đề
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vị trí
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBanners.map((banner) => (
                      <tr key={banner._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="relative h-16 w-28 rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={banner.imageUrl}
                              alt={banner.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{banner.title}</p>
                          {banner.link && (
                            <a
                              href={banner.link}
                              target="_blank"
                              className="text-blue-600 text-xs underline"
                            >
                              {banner.link}
                            </a>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPositionBadge(
                              banner.position
                            )}`}
                          >
                            {getPositionText(banner.position)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                              banner.isActive
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            {banner.isActive ? (
                              <MdVisibility className="mr-1" size={12} />
                            ) : (
                              <MdVisibilityOff className="mr-1" size={12} />
                            )}
                            {banner.isActive ? 'Hoạt động' : 'Tạm ẩn'}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => openEditModal(banner)}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                            >
                              <MdEdit size={16} />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg">
                              <MdDelete size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal thêm/sửa */}
      {modalOpen && (
        <BannerModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={handleSuccess}
          initialData={selectedBanner}
        />
      )}
    </DashboardLayout>
  );
}
