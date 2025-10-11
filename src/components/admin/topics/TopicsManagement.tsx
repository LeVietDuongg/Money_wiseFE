'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MdAdd, MdSearch, MdEdit, MdDelete, MdMoreHoriz } from 'react-icons/md';

export default function TopicsManagement() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Danh Sách Chủ Đề</h1>
          <p className="text-gray-500 mt-1">Quản lý các chủ đề bài viết</p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <MdSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Tìm kiếm chủ đề..."
              className="w-full pl-10"
            />
          </div>
        </div>
        
        <Button className="flex items-center space-x-2 w-full sm:w-auto justify-center">
          <MdAdd size={16} />
          <span>Thêm Chủ Đề</span>
        </Button>
      </div>

      {/* Sample Topics List */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách chủ đề (3 chủ đề)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Tên chủ đề</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Mô tả</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Số bài viết</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Ngày tạo</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Trạng thái</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">Fried Dishes</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-600 max-w-xs truncate">Delicious fried food recipes</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-900">45</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-600">2024-01-15</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Hoạt động
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <MdEdit size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <MdDelete size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MdMoreHoriz size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">BBQ</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-600 max-w-xs truncate">Barbecue recipes and techniques</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-900">32</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-600">2024-01-10</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Hoạt động
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <MdEdit size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <MdDelete size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MdMoreHoriz size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">Hot Pot</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-600 max-w-xs truncate">Traditional hot pot recipes</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-900">28</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-600">2024-01-05</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Hoạt động
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <MdEdit size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <MdDelete size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MdMoreHoriz size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
