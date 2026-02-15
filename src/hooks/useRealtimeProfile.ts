import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Hook to keep user profile in sync with database changes in real-time
 * Automatically refreshes profile when updates occur
 */
export function useRealtimeProfile() {
  const { user, refreshProfile } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel(`profile-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`
        },
        (payload) => {
          console.log('[Realtime] Profile updated:', payload.new);
          // Refresh the profile in AuthContext
          refreshProfile();
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('[Realtime] Profile subscription active');
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, refreshProfile]);
}
