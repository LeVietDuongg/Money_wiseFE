'use client';

import Image from 'next/image';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MdAdd, MdEdit, MdDelete, MdSearch, MdVisibility, MdVisibilityOff, MdImage, MdCalendarToday, MdBarChart } from 'react-icons/md';

const mockBanners = [
  {
    id: 1,
    title: 'Flash Sale Cuối Tuần',
    description: 'Giảm giá tới 50% cho tất cả món ăn yêu thích',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/promotions/flash-sale',
    position: 'header',
    status: 'active',
    template: 'single-large',
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
    template: 'left-large-right-small',
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
    template: 'hero-banner',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    clicks: 456,
    impressions: 8930
  }
];

export default function BannersPage() {
  const getTemplateText = (template: string) => {
    const templates = {
      'single-large': 'Ảnh lớn đơn',
      'left-large-right-small': '1 lớn + 2 nhỏ',
      'grid-2x2': 'Lưới 2x2',
      'carousel': 'Carousel',
      'hero-banner': 'Hero Banner'
    };
    return templates[template as keyof typeof templates] || template;
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
          <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <MdAdd className="mr-2" size={16} />
            Thêm Banner
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MdImage className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Tổng Banner</p>
                  <p className="text-2xl font-bold text-gray-900">{mockBanners.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MdVisibility className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Đang Hoạt Động</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockBanners.filter(b => b.status === 'active').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MdBarChart className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Tổng Click</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockBanners.reduce((sum, b) => sum + b.clicks, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MdCalendarToday className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Tổng View</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockBanners.reduce((sum, b) => sum + b.impressions, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Tìm kiếm banner..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                {/* Layout Template Filter */}
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Tất cả Template</option>
                  <option value="single-large">Ảnh lớn đơn</option>
                  <option value="left-large-right-small">1 lớn trái + 2 nhỏ phải</option>
                  <option value="grid-2x2">Lưới 2x2</option>
                  <option value="carousel">Carousel/Slider</option>
                  <option value="hero-banner">Hero Banner</option>
                </select>

                {/* Position Filter */}
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Tất cả vị trí</option>
                  <option value="header">Đầu trang</option>
                  <option value="sidebar">Thanh bên</option>
                  <option value="footer">Cuối trang</option>
                  <option value="popup">Popup</option>
                </select>

                {/* Status Filter */}
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Tất cả trạng thái</option>
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Tạm dừng</option>
                  <option value="scheduled">Đã lên lịch</option>
                  <option value="expired">Hết hạn</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Template Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Chọn Template Layout</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Template 1: Single Large */}
              <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg p-4 cursor-pointer transition-colors">
                <div className="bg-gray-100 rounded h-32 mb-3 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Ảnh lớn đơn</span>
                </div>
                <h4 className="font-medium text-sm">Single Large Banner</h4>
                <p className="text-xs text-gray-500">Một banner lớn toàn bộ</p>
              </div>

              {/* Template 2: Left Large + Right Small */}
              <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg p-4 cursor-pointer transition-colors">
                <div className="flex gap-2 h-32 mb-3">
                  <div className="bg-gray-100 rounded flex-2 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Lớn</span>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="bg-gray-100 rounded flex-1 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Nhỏ 1</span>
                    </div>
                    <div className="bg-gray-100 rounded flex-1 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Nhỏ 2</span>
                    </div>
                  </div>
                </div>
                <h4 className="font-medium text-sm">Left Large + Right Small</h4>
                <p className="text-xs text-gray-500">1 ảnh lớn trái + 2 ảnh nhỏ phải</p>
              </div>

              {/* Template 3: Grid 2x2 */}
              <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg p-4 cursor-pointer transition-colors">
                <div className="grid grid-cols-2 gap-2 h-32 mb-3">
                  <div className="bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-gray-500 text-xs">1</span>
                  </div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-gray-500 text-xs">2</span>
                  </div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-gray-500 text-xs">3</span>
                  </div>
                  <div className="bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-gray-500 text-xs">4</span>
                  </div>
                </div>
                <h4 className="font-medium text-sm">Grid 2x2</h4>
                <p className="text-xs text-gray-500">Lưới 4 banner đều nhau</p>
              </div>

              {/* Template 4: Carousel */}
              <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg p-4 cursor-pointer transition-colors">
                <div className="relative bg-gray-100 rounded h-32 mb-3 flex items-center justify-center overflow-hidden">
                  <span className="text-gray-500 text-sm">Carousel</span>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
                <h4 className="font-medium text-sm">Carousel Slider</h4>
                <p className="text-xs text-gray-500">Banner trượt tự động</p>
              </div>

              {/* Template 5: Hero Banner */}
              <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg p-4 cursor-pointer transition-colors">
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded h-32 mb-3 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">Hero Banner</span>
                </div>
                <h4 className="font-medium text-sm">Hero Banner</h4>
                <p className="text-xs text-gray-500">Banner chính trang chủ</p>
              </div>

              {/* Template 6: Custom */}
              <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg p-4 cursor-pointer transition-colors">
                <div className="bg-gray-100 rounded h-32 mb-3 flex items-center justify-center">
                  <MdAdd className="text-gray-400" size={32} />
                </div>
                <h4 className="font-medium text-sm">Tùy chỉnh</h4>
                <p className="text-xs text-gray-500">Tạo layout riêng</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Banners Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh Sách Banner ({mockBanners.length})</CardTitle>
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
                      Template
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
                  {mockBanners.map((banner) => (
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
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          {getTemplateText(banner.template)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPositionBadge(banner.position)}`}>
                          {getPositionText(banner.position)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div>
                          <p>Bắt đầu: {banner.startDate ? new Date(banner.startDate).toLocaleDateString('vi-VN') : '-'}</p>
                          <p>Kết thúc: {banner.endDate ? new Date(banner.endDate).toLocaleDateString('vi-VN') : '-'}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div>
                          <p>Click: {banner.clicks.toLocaleString()}</p>
                          <p>View: {banner.impressions.toLocaleString()}</p>
                          <p>CTR: {banner.impressions > 0 ? ((banner.clicks / banner.impressions) * 100).toFixed(2) : '0.00'}%</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                          banner.status === 'active'
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}>
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
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Chỉnh sửa"
                          >
                            <MdEdit size={16} />
                          </button>
                          <button
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
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
