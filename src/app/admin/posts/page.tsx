import DashboardLayout from '@/components/layout/DashboardLayout';
import PostsManagement from '@/components/admin/posts/PostsManagement';

export default function PostsPage() {
  return (
    <DashboardLayout>
      <PostsManagement />
    </DashboardLayout>
  );
}
