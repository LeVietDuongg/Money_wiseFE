'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MdEmail, MdSearch, MdAdd, MdEdit, MdDelete, MdBlock, MdCheckCircle, MdCancel, MdPerson, MdTrendingUp } from 'react-icons/md';

const mockSubscribers = [
  {
    id: 1,
    email: 'john.doe@example.com',
    name: 'John Doe',
    subscribeDate: '2024-01-15',
    status: 'active',
    source: 'website',
    tags: ['Premium', 'Food Lover'],
    lastActivity: '2024-01-28',
    totalEmails: 45,
    openRate: 85.5
  },
  {
    id: 2,
    email: 'sofia.nguyen@gmail.com',
    name: 'Sofia Nguyen',
    subscribeDate: '2024-01-10',
    status: 'active',
    source: 'popup',
    tags: ['VIP', 'Regular Customer'],
    lastActivity: '2024-01-29',
    totalEmails: 52,
    openRate: 92.3
  },
  {
    id: 3,
    email: 'mike.wilson@yahoo.com',
    name: 'Mike Wilson',
    subscribeDate: '2024-01-05',
    status: 'unsubscribed',
    source: 'social',
    tags: ['Casual'],
    lastActivity: '2024-01-20',
    totalEmails: 23,
    openRate: 45.2
  },
  {
    id: 4,
    email: 'anna.tran@hotmail.com',
    name: 'Anna Tran',
    subscribeDate: '2024-01-12',
    status: 'bounced',
    source: 'manual',
    tags: ['New Customer'],
    lastActivity: '2024-01-15',
    totalEmails: 8,
    openRate: 0
  },
  {
    id: 5,
    email: 'david.lee@outlook.com',
    name: 'David Lee',
    subscribeDate: '2024-01-18',
    status: 'active',
    source: 'website',
    tags: ['Food Enthusiast', 'Premium'],
    lastActivity: '2024-01-30',
    totalEmails: 28,
    openRate: 78.9
  }
];

export default function SubscriptionsPage() {
  const getStatusBadge = (status: string) => {
    const badges = {
      active: 'bg-green-100 text-green-800',
      unsubscribed: 'bg-red-100 text-red-800',
      bounced: 'bg-yellow-100 text-yellow-800'
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const statuses = {
      active: 'Hoạt động',
      unsubscribed: 'Đã hủy',
      bounced: 'Lỗi email'
    };
    return statuses[status as keyof typeof statuses] || status;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <MdCheckCircle className="mr-1" size={14} />;
      case 'unsubscribed': return <MdCancel className="mr-1" size={14} />;
      case 'bounced': return <MdBlock className="mr-1" size={14} />;
      default: return null;
    }
  };

  const getSourceBadge = (source: string) => {
    const badges = {
      website: 'bg-blue-100 text-blue-800',
      popup: 'bg-purple-100 text-purple-800',
      social: 'bg-green-100 text-green-800',
      manual: 'bg-gray-100 text-gray-800'
    };
    return badges[source as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getSourceText = (source: string) => {
    const sources = {
      website: 'Website',
      popup: 'Popup',
      social: 'Mạng XH',
      manual: 'Thủ công'
    };
    return sources[source as keyof typeof sources] || source;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản Lý Đăng Ký</h1>
            <p className="mt-1 text-sm text-gray-500">
              Quản lý danh sách người đăng ký email newsletter
            </p>
          </div>
          <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <MdAdd className="mr-2" size={16} />
            Xuất ra file CSV
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MdPerson className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Tổng Đăng Ký</p>
                  <p className="text-2xl font-bold text-gray-900">{mockSubscribers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MdCheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Đang Hoạt Động</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockSubscribers.filter(s => s.status === 'active').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MdTrendingUp className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Tỷ Lệ Mở Email</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockSubscribers.length > 0 
                      ? (mockSubscribers.reduce((sum, s) => sum + s.openRate, 0) / mockSubscribers.length).toFixed(1)
                      : '0.0'
                    }%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MdEmail className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Email Đã Gửi</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockSubscribers.reduce((sum, s) => sum + s.totalEmails, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo tên, email hoặc nhãn..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="all">Tất cả trạng thái</option>
                  <option value="active">Hoạt động</option>
                  <option value="unsubscribed">Đã hủy</option>
                  <option value="bounced">Lỗi email</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscribers Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Danh Sách Người Đăng Ký ({mockSubscribers.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Người dùng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nguồn
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày đăng ký
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hoạt động
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockSubscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {subscriber.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {subscriber.email}
                          </div>
                          {subscriber.tags.length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-1">
                              {subscriber.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSourceBadge(subscriber.source)}`}>
                          {getSourceText(subscriber.source)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(subscriber.subscribeDate).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div>
                          <p>Email: {subscriber.totalEmails}</p>
                          <p>Tỷ lệ mở: {subscriber.openRate}%</p>
                          <p className="text-xs text-gray-400">
                            Lần cuối: {new Date(subscriber.lastActivity).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(subscriber.status)}`}>
                          {getStatusIcon(subscriber.status)}
                          {getStatusText(subscriber.status)}
                        </span>
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
