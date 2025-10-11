'use client';

import dynamic from 'next/dynamic';
import KPICard from '@/components/admin/dashboard/KPICard';
import TopPostsSection from '@/components/admin/dashboard/TopPostsSection';
import { MdDescription, MdVisibility, MdPeople, MdAttachMoney, MdCalendarToday } from 'react-icons/md';
import { Button } from '@/components/ui/Button';

const TopicsChart = dynamic(() => import('@/components/admin/dashboard/TopicsChart'), { ssr: false });
const WeeklyVisitsChart = dynamic(() => import('@/components/admin/dashboard/WeeklyVisitsChart'), { ssr: false });

export default function DashboardClientPage() {
  return (
    <div className="space-y-6">
      {/* Filter Period Section */}
      <div className="flex items-center justify-end">
        <Button variant="outline" className="flex items-center space-x-2">
          <MdCalendarToday size={16} />
          <span>Filter Periods</span>
          <span className="text-gray-400">2 sẽ trong 500</span>
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Tổng số Bài viết"
          value="75"
          subtitle="📈 +2% from last week"
          icon={<MdDescription size={24} />}
          backgroundColor="#dcfce7"
          iconColor="#16a34a"
        />
        
        <KPICard
          title="Tổng số Lượt xem"
          value="357"
          subtitle="📈 +5% from last week"
          icon={<MdVisibility size={24} />}
          backgroundColor="#fef3c7"
          iconColor="#d97706"
        />
        
        <KPICard
          title="Tổng số người theo dõi"
          value="65"
          subtitle="📈 +3% from last week"
          icon={<MdPeople size={24} />}
          backgroundColor="#dbeafe"
          iconColor="#2563eb"
        />
        
        <KPICard
          title="Tổng số theo dõi"
          value="$128"
          subtitle="📈 +12% from last week"
          icon={<MdAttachMoney size={24} />}
          backgroundColor="#dcfdf4"
          iconColor="#059669"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopicsChart />
        <WeeklyVisitsChart />
      </div>

      {/* Top Posts Section */}
      <TopPostsSection />
    </div>
  );
}
