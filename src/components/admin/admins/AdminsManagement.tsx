'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MdCloudUpload } from 'react-icons/md';

export default function AdminsManagement() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản Lý ADMIN</h1>
          <p className="text-gray-500 mt-1">Thêm và chỉnh sửa thông tin ADMIN</p>
        </div>
      </div>

      {/* Add Admin Form */}
      <div className="max-w-4xl">
        <Card>
          <CardContent className="p-8">
            {/* Image Upload */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-32 h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
                <div className="text-center">
                  <MdCloudUpload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Upload Photo</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">Chọn ảnh đại diện cho ADMIN</p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên ADMIN*
                  </label>
                  <Input
                    type="text"
                    placeholder="Nhập tên ADMIN"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên
                  </label>
                  <Input
                    type="text"
                    placeholder="Nhập tên đầy đủ"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Nhập địa chỉ email"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ
                  </label>
                  <textarea
                    placeholder="Nhập địa chỉ"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên
                  </label>
                  <Input
                    type="text"
                    placeholder="Nhập tên"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số Điện Thoại
                  </label>
                  <Input
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giới Tính
                  </label>
                  <select className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <Button 
                className="px-12 py-3 bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                Thêm Mới
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
