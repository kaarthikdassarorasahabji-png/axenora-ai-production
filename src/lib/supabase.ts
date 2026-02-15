import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️  Supabase environment variables are not configured');
  console.warn('   Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file');
  console.warn('   Get these from: https://app.supabase.com/project/_/settings/api');
}

// Use fallback values to prevent app crash, but Supabase features won't work
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);
