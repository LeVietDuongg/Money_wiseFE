import DashboardLayout from '@/components/layout/DashboardLayout';
import ServicesManagement from '@/components/admin/services/ServicesManagement';

export default function ServicesPage() {
  return (
    <DashboardLayout>
      <ServicesManagement />
    </DashboardLayout>
  );
}
