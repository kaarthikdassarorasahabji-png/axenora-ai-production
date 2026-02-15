-- 1. Add status column to profiles if it doesn't exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';

-- 2. Create user_services table if not exists (including RLS enablement)
CREATE TABLE IF NOT EXISTS public.user_services (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users NOT NULL,
    service_id text NOT NULL,
    tier text DEFAULT 'standard',
    status text DEFAULT 'active',
    billing_cycle text DEFAULT 'monthly',
    start_date timestamptz DEFAULT now(),
    renewal_date timestamptz,
    created_at timestamptz DEFAULT now()
);

-- Enable RLS (idempotent)
ALTER TABLE public.user_services ENABLE ROW LEVEL SECURITY;

-- 3. Safely recreate the policy (Drop then Create)
DROP POLICY IF EXISTS "Users can view their own services" ON public.user_services;

CREATE POLICY "Users can view their own services" 
ON public.user_services FOR SELECT 
USING (auth.uid() = user_id);

-- 4. Apply Grants (safe to re-run)
GRANT ALL ON public.user_services TO service_role;
GRANT SELECT ON public.user_services TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.user_services TO service_role;
