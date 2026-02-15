-- Fix profiles status column for suspension feature
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';

-- Ensure user_services table exists and has RLS
CREATE TABLE IF NOT EXISTS public.user_services (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users NOT NULL,
    service_id text NOT NULL, -- Name or ID of service
    tier text DEFAULT 'standard',
    status text DEFAULT 'active',
    billing_cycle text DEFAULT 'monthly',
    start_date timestamptz DEFAULT now(),
    renewal_date timestamptz,
    created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_services ENABLE ROW LEVEL SECURITY;

-- Policies for user_services
CREATE POLICY "Users can view their own services" 
ON public.user_services FOR SELECT 
USING (auth.uid() = user_id);

-- Admin policies (using service_role key bypasses this, but good to have)
-- If we had an admin role check in RLS:
-- CREATE POLICY "Admins can do everything" ON public.user_services TO authenticated USING ( ... );

-- Grant permissions which might be missing
GRANT ALL ON public.user_services TO service_role;
GRANT SELECT ON public.user_services TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.user_services TO service_role;
