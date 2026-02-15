import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { API_BASE_URL } from '@/lib/api';

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role: string;
  profile_completed: boolean;
  created_at: string;
  updated_at?: string;
}

export function useRealtimeClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.access_token) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/api/admin/clients`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        });

        const data = await response.json();
        
        if (data.success) {
          setClients(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch clients:', error);
      } finally {
        setLoading(false);
      }
    };

    const channel = supabase
      .channel('clients-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        (payload) => {
          console.log('[Realtime] Client change:', payload);

          if (payload.eventType === 'INSERT') {
            const newClient = payload.new as Client;
            setClients((prev) => [newClient, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedClient = payload.new as Client;
            setClients((prev) =>
              prev.map((client) =>
                client.id === updatedClient.id ? updatedClient : client
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setClients((prev) => prev.filter((client) => client.id !== payload.old.id));
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('[Realtime] Clients subscription active');
        }
      });

    fetchClients();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { clients, loading };
}
