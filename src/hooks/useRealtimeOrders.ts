import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { API_BASE_URL } from '@/lib/api';
import { toast } from '@/components/ui/use-toast';

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  confirmed_at?: string;
  items?: any[];
  profiles?: {
    name: string;
    email: string;
  };
}

interface UseRealtimeOrdersOptions {
  userId?: string; // Filter by user ID (for client view)
  showToasts?: boolean; // Show toast notifications on updates
}

export function useRealtimeOrders(options: UseRealtimeOrdersOptions = {}) {
  const { userId, showToasts = false } = options;
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        setLoading(false);
        return;
      }

      const endpoint = userId 
        ? `${API_BASE_URL}/api/orders`
        : `${API_BASE_URL}/api/admin/orders`;

      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setOrders(data.data);
      } else {
        setError(data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const setupRealtimeSubscription = () => {
      channel = supabase
        .channel('orders-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'orders',
            ...(userId && { filter: `user_id=eq.${userId}` })
          },
          (payload) => {
            if (payload.eventType === 'INSERT') {
              const newOrder = payload.new as Order;
              
              if (showToasts && !userId) {
                toast({
                  title: "New Order Received!",
                  description: `Order ${newOrder.order_number} - ₹${newOrder.total_amount?.toLocaleString()}`,
                });
              }

              // Refetch all orders to get full joined data (items, profiles)
              fetchOrders();
            } else if (payload.eventType === 'UPDATE') {
              const updatedOrder = payload.new as Order;
              setOrders((prev) =>
                prev.map((order) =>
                  order.id === updatedOrder.id ? { ...order, ...updatedOrder } : order
                )
              );

              if (showToasts && userId) {
                toast({
                  title: "Order Updated",
                  description: `Your order status: ${updatedOrder.status}`,
                });
              }
            } else if (payload.eventType === 'DELETE') {
              setOrders((prev) => prev.filter((order) => order.id !== payload.old.id));
            }
          }
        )
        .subscribe();
    };

    fetchOrders();
    setupRealtimeSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [userId, showToasts]);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    await fetchOrders();
  };

  return { orders, loading, error, refetch };
}
