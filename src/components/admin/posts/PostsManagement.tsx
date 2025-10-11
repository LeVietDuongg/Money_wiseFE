'use client';
import React from 'react';

type CustomInputProps = {
  value?: string;
  onClick?: () => void;
};
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MdAdd, MdSearch, MdEdit, MdDelete, MdVisibility, MdCalendarToday } from 'react-icons/md';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDateInput = React.forwardRef<HTMLInputElement, CustomInputProps>(({ value, onClick }, ref) => (
  <div className="relative" onClick={onClick}>
    <MdCalendarToday
      className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      size={18}
    />
    <Input
      type="text"
      placeholder="dd/mm/yyyy"
      className="w-24 md:w-32 pl-8"
      value={value}
      ref={ref}
      readOnly
    />
  </div>
));
CustomDateInput.displayName = 'CustomDateInput';

export default function PostsManagement() {
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Danh sách bài viết</h1>
          <p className="text-gray-500 mt-1">Quản lý tất cả bài viết trên website</p>
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
        <div className="flex flex-wrap gap-2 flex-1 min-w-0">
          {/* Search */}
          <div className="relative flex-shrink min-w-[120px] w-full sm:w-auto">
            <MdSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              className="w-full sm:w-48 md:w-64 lg:w-80 pl-10 py-2 text-xs"
            />
          </div>
          {/* Trạng thái */}
          <select className="flex-shrink min-w-[100px] w-full sm:w-auto px-2 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm">
            <option>Tất cả trạng thái</option>
            <option>Đã đăng</option>
            <option>Bản nháp</option>
            <option>Đã xóa</option>
          </select>
          {/* Chủ đề */}
          <select className="flex-shrink min-w-[100px] w-full sm:w-auto px-2 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm">
            <option>Tất cả chủ đề</option>
            <option>Fried Dishes</option>
            <option>BBQ</option>
            <option>Hot Pot</option>
          </select>
          {/* Date filter: chỉ hiện trên desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            {/* --- Ô chọn ngày bắt đầu --- */}
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              customInput={<CustomDateInput />}
            />
            <span className="text-gray-500">đến</span>
            {/* --- Ô chọn ngày kết thúc --- */}
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              minDate={startDate ?? undefined}
              customInput={<CustomDateInput />}
            />
          </div>
          {/* Button lọc ngày: chỉ hiện trên mobile */}
          <button
            className="flex items-center px-2 py-2 border border-gray-300 rounded-lg text-xs text-gray-700 lg:hidden w-full sm:w-auto justify-center sm:justify-start min-w-[100px]"
            onClick={() => setShowDateFilter(!showDateFilter)}
          >
            <MdCalendarToday className="mr-2" size={16} />
            Lọc ngày
          </button>
        </div>
        {/* Nút thêm bài viết */}
        <Button className="flex items-center space-x-1 px-2 py-2 text-xs sm:text-sm w-full md:w-auto justify-center whitespace-nowrap">
          <MdAdd size={16} />
          <span className="truncate max-w-[100px] sm:max-w-none">Thêm Bài Viết</span>
        </Button>
      </div>

      {/* Modal lọc ngày cho mobile */}
      {showDateFilter && (
        <div className="lg:hidden mt-2 bg-white border rounded-lg p-4 shadow-lg">
          <div className="flex items-center space-x-2">
            <Input type="date" className="w-32" />
            <span className="text-gray-500">đến</span>
            <Input type="date" className="w-32" />
            <Button size="sm" onClick={() => setShowDateFilter(false)}>
              Áp dụng
            </Button>
          </div>
        </div>
      )}

      {/* Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>Showing 1-24 of 29</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <table className="min-w-[800px] w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Tiêu đề</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Tác giả</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Chủ đề</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Lượt xem</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Ngày đăng</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Trạng thái</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">Delicious Fried Chicken Recipe</div>
                    <div className="text-sm text-gray-500">Step by step guide to perfect fried chicken</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-900">John Doe</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Fried Dishes
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-900">1,234</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-600">14/03/2019</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Đã đăng
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <MdVisibility size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <MdEdit size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <MdDelete size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">BBQ Masterclass</div>
                    <div className="text-sm text-gray-500">Learn the art of perfect barbecue</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-900">Jane Smith</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      BBQ
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-900">856</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-600">12/03/2019</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Bản nháp
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <MdVisibility size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <MdEdit size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <MdDelete size={16} />
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