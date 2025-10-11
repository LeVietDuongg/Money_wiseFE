import DashboardLayout from '@/components/layout/DashboardLayout';
import TopicsManagement from '@/components/admin/topics/TopicsManagement';

export default function TopicsPage() {
  return (
    <DashboardLayout>
      <TopicsManagement />
    </DashboardLayout>
  );
}
