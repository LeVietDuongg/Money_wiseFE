'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import {
  MdSearch,
  MdMenu,
  MdKeyboardArrowDown,
  MdLogout,
} from 'react-icons/md';
import { adminAuthService } from '@/services/adminAuth.service';
import Avatar from '@/assets/about/doingunhanvien.jpg'
interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [admin, setAdmin] = useState<{ name?: string; email?: string; role?: string } | null>(null);

  const router = useRouter();

  useEffect(() => {
    const info = adminAuthService.getAdminInfo();
    if (info) {
      setAdmin(info);
    }
  }, []);

  const handleLogout = () => {
    adminAuthService.clearAccessToken();
    router.push('/admin/auth/login');
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-2 sm:px-4 lg:px-6 relative">
      {/* Left section */}
      <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden rounded-lg p-1 sm:p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          <MdMenu size={20} />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-base sm:text-xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 hidden sm:block">
            {admin?.name ? `Hi, ${admin.name}! Welcome back 👋` : 'Welcome back, Admin'}
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-2 sm:space-x-4">

        {/* Notification icons */}
        <div className="flex items-center space-x-2">
          <button className="md:hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <MdSearch size={20} />
          </button>

       
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 sm:space-x-3 rounded-lg p-1 sm:p-2 hover:bg-gray-50"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Image
              src={Avatar}
              alt="Profile"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-gray-900">{admin?.name || 'Admin'}</p>
              <p className="text-xs text-gray-500">{admin?.role || 'Super Admin'}</p>
            </div>
            <MdKeyboardArrowDown
              size={18}
              className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <MdLogout size={18} className="mr-2 text-gray-500" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
