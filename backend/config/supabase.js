import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
// Use Service Role Key if available (for backend/admin access), otherwise fallback to Anon Key
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials in .env file");
  console.error("   Required: SUPABASE_URL and SUPABASE_KEY");
  process.exit(1);
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

console.log(`✅ Supabase client initialized. Service Key: ${!!process.env.SUPABASE_SERVICE_KEY ? 'active' : 'inactive'}`);
