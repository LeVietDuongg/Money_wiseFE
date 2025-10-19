'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  MdDashboard,
  MdFolder,
  MdDescription,
  MdImage,

} from 'react-icons/md';
import Image from 'next/image';
import Logo from '../../../public/Logo.svg'
interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  {
    icon: MdDashboard,
    label: 'Bảng Điều Khiển',
    href: '/admin/dashboard',
  },
  {
    icon: MdFolder,
    label: 'Quản Lý Chủ Đề',
    href: '/admin/topics',
  },
  {
    icon: MdDescription,
    label: 'Quản Lý Bài Viết',
    href: '/admin/posts',
  },
  {
    icon: MdDescription,
    label: 'Quản Lý dịch vụ',
    href: '/admin/services',
  },
  {
    icon: MdImage,
    label: 'Quản Lý Banner',
    href: '/admin/banners',
  },

];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed left-0 top-0 z-50 h-full w-56 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b border-gray-200">
          <div className="flex items-center space-x-2">
          <Image 
          width={140}
          height={140}
          alt='logo'
          src={Logo}/>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-3">
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    )}
                    onClick={() => {
                      // Close mobile sidebar when clicking a link
                      if (window.innerWidth < 1024) {
                        onClose();
                      }
                    }}
                  >
                    <Icon
                      size={20}
                      className={clsx(
                        isActive ? 'text-blue-700' : 'text-gray-500'
                      )}
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom section - Restaurant theme promotion */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="rounded-lg bg-gradient-to-br from-orange-50 to-red-50 p-3">
            <div className="mb-2 flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                <span className="text-sm">🍳</span>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900">Swiss Restaurant Admin Dashboard</p>
                <p className="text-xs text-gray-600">Swiss Restaurant Admin Dashboard</p>
              </div>
            </div>
            <button className="w-full rounded-md bg-orange-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-orange-700">
              Add Recipe
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
