'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MdAdd, MdEdit, MdDelete, MdSearch, MdVisibility, MdVisibilityOff, MdImage } from 'react-icons/md';

interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  position: 'header' | 'sidebar' | 'footer' | 'popup';
  status: 'active' | 'inactive';
  startDate: string;
  endDate: string;
  clicks: number;
  impressions: number;
}

const initialBanners: Banner[] = [
  {
    id: 1,
    title: 'Flash Sale Cuối Tuần',
    description: 'Giảm giá tới 50% cho tất cả món ăn yêu thích',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/promotions/flash-sale',
    position: 'header',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    clicks: 1247,
    impressions: 15620
  },
  {
    id: 2,
    title: 'Khuyến Mãi Món Mới',
    description: 'Thử ngay menu mới với giá đặc biệt',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/menu/new-dishes',
    position: 'sidebar',
    status: 'active',
    startDate: '2024-01-10',
    endDate: '2024-03-10',
    clicks: 892,
    impressions: 12450
  },
  {
    id: 3,
    title: 'Ưu Đãi Thành Viên VIP',
    description: 'Đăng ký thành viên VIP để nhận ưu đãi độc quyền',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/membership/vip',
    position: 'popup',
    status: 'inactive',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    clicks: 456,
    impressions: 8930
  }
];

export default function BannerManagementPage() {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const filteredBanners = banners.filter(banner =>
    banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    banner.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBanner = () => {
    setEditingBanner(null);
    setIsModalOpen(true);
  };

  const handleEditBanner = (banner: Banner) => {
    setEditingBanner(banner);
    setIsModalOpen(true);
  };

  const handleDeleteBanner = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa banner này?')) {
      setBanners(banners.filter(banner => banner.id !== id));
    }
  };

  const toggleBannerStatus = (id: number) => {
    setBanners(banners.map(banner =>
      banner.id === id
        ? { ...banner, status: banner.status === 'active' ? 'inactive' : 'active' }
        : banner
    ));
  };

  const getPositionBadge = (position: string) => {
    const badges = {
      header: 'bg-blue-100 text-blue-800',
      sidebar: 'bg-green-100 text-green-800',
      footer: 'bg-yellow-100 text-yellow-800',
      popup: 'bg-purple-100 text-purple-800'
    };
    return badges[position as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getPositionText = (position: string) => {
    const positions = {
      header: 'Đầu trang',
      sidebar: 'Thanh bên',
      footer: 'Cuối trang',
      popup: 'Popup'
    };
    return positions[position as keyof typeof positions] || position;
  };

  return (
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
          onClick={handleAddBanner}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <MdAdd className="mr-2" size={16} />
          Thêm Banner
        </button>
      </div>

      {/* Stats Cards */}
      {/* Stats Cards */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  <Card>
    {/* Sửa ở đây */}
    <CardContent className="flex items-center p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <MdImage className="h-8 w-8 text-blue-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">Tổng Banner</p>
          <p className="text-2xl font-bold text-gray-900">{banners.length}</p>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card>
    {/* Sửa ở đây */}
    <CardContent className="flex items-center p-6">
      <div className="flex items-center ">
        <div className="flex-shrink-0">
          <MdVisibility className="h-8 w-8 text-green-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">Đang Hoạt Động</p>
          <p className="text-2xl font-bold text-gray-900">
            {banners.filter(b => b.status === 'active').length}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card>
    {/* Sửa ở đây */}
    <CardContent className="flex items-center p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="h-8 w-8 bg-yellow-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">👆</span>
          </div>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">Tổng Click</p>
          <p className="text-2xl font-bold text-gray-900">
            {banners.reduce((sum, b) => sum + b.clicks, 0).toLocaleString()}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card>
    {/* Sửa ở đây */}
    <CardContent className="flex items-center p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">👁</span>
          </div>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">Tổng View</p>
          <p className="text-2xl font-bold text-gray-900">
            {banners.reduce((sum, b) => sum + b.impressions, 0).toLocaleString()}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
</div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Tìm kiếm banner..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Banners Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh Sách Banner</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Banner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vị Trí
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời Gian
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hiệu Suất
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng Thái
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao Tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBanners.map((banner) => (
                  <tr key={banner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-16 w-24 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={banner.image}
                            alt={banner.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{banner.title}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2">{banner.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPositionBadge(banner.position)}`}>
                        {getPositionText(banner.position)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div>
                        <p>Bắt đầu: {new Date(banner.startDate).toLocaleDateString('vi-VN')}</p>
                        <p>Kết thúc: {new Date(banner.endDate).toLocaleDateString('vi-VN')}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div>
                        <p>Click: {banner.clicks.toLocaleString()}</p>
                        <p>View: {banner.impressions.toLocaleString()}</p>
                        <p>CTR: {((banner.clicks / banner.impressions) * 100).toFixed(2)}%</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleBannerStatus(banner.id)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          banner.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {banner.status === 'active' ? (
                          <MdVisibility className="mr-1" size={12} />
                        ) : (
                          <MdVisibilityOff className="mr-1" size={12} />
                        )}
                        {banner.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEditBanner(banner)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          <MdEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteBanner(banner.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Xóa"
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

          {filteredBanners.length === 0 && (
            <div className="text-center py-12">
              <MdImage className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Không có banner nào</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Không tìm thấy banner phù hợp' : 'Bắt đầu bằng cách thêm banner mới'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
