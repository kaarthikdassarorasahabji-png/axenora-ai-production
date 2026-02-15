import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingScreen } from '@/components/LoadingScreen';

export function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }

  if (!user || profile?.role !== 'admin') {
    // If user is logged in but not admin, redirect to dashboard or login
    // If not logged in, redirect to admin login
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
