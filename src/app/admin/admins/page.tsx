import AdminsManagement from '@/components/admin/admins/AdminsManagement';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function AdminPage() {
  return (
    <DashboardLayout>
      <AdminsManagement />
    </DashboardLayout>
  );
}
