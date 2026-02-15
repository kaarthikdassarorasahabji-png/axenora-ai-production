import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { API_BASE_URL } from '@/lib/api';

interface AdminStats {
  revenue: number;
  activeClients: number;
  pendingOrders: number;
  activeServices: number;
}

export function useRealtimeAdminStats() {
  const [stats, setStats] = useState<AdminStats>({
    revenue: 0,
    activeClients: 0,
    pendingOrders: 0,
    activeServices: 0
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchStats = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/analytics/overview`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Set up real-time subscriptions for tables that affect stats
    const ordersChannel = supabase
      .channel('admin-orders-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          console.log('[Realtime] Orders change detected, refreshing stats');
          fetchStats();
        }
      )
      .subscribe();

    const profilesChannel = supabase
      .channel('admin-profiles-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'profiles'
        },
        (payload) => {
          console.log('[Realtime] New client registered, refreshing stats');
          fetchStats();
        }
      )
      .subscribe();

    fetchStats();

    return () => {
      supabase.removeChannel(ordersChannel);
      supabase.removeChannel(profilesChannel);
    };
  }, []);

  return { stats, loading, lastUpdated, refetch: fetchStats };
}
