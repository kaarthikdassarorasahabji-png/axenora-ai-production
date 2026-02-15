import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { API_BASE_URL } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface UserStats {
  activeServices: number;
  totalOrders: number;
  totalInvestment: number;
}

export function useRealtimeUserStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats>({
    activeServices: 0,
    totalOrders: 0,
    totalInvestment: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        setLoading(false);
        return;
      }

      // Fetch user's orders
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });

      const data = await response.json();
      
      if (data.success && data.data) {
        const orders = data.data;
        
        // Calculate stats from orders
        const totalOrders = orders.length;
        const totalInvestment = orders
          .filter((order: any) => order.payment_status === 'paid')
          .reduce((sum: number, order: any) => sum + (order.total_amount || 0), 0);
        
        // Fetch active services from user_services table
        const { count: activeServicesCount } = await supabase
            .from('user_services')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('status', 'active');

        // Fallback or combine? If orders also imply active services?
        // Let's assume user_services is the source of truth for "Active Services" count.
        // Or if we want to include confirmed orders that haven't been manually activated yet?
        // Probably safer to just use user_services table as Admin manually activates.
        
        const activeServices = activeServicesCount || 0;

        setStats({
          activeServices,
          totalOrders,
          totalInvestment
        });
      }
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    // Set up real-time subscription for user's orders
    const channel = supabase
      .channel(`user-orders-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('[Realtime] User order change detected, refreshing stats');
          fetchStats();
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('[Realtime] User stats subscription active');
        }
      });

    fetchStats();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  return { stats, loading, refetch: fetchStats };
}
