import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AdminNavbar } from '@/components/AdminNavbar';
import { AdminSidebar } from '@/components/AdminSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';

export const AdminLayout = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      toast({
        title: 'Akses Ditolak',
        description: 'Anda harus login sebagai admin untuk mengakses halaman ini.',
        variant: 'destructive',
      });
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate, toast]);

  if (loading || !user || !isAdmin) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminNavbar />
          <main className="flex-1 p-6 bg-muted/40">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
