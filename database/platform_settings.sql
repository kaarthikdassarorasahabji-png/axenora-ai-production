-- Create platform_settings table
CREATE TABLE IF NOT EXISTS public.platform_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access to public settings" ON public.platform_settings
  FOR SELECT USING (key IN ('maintenance_mode', 'public_announcement'));

CREATE POLICY "Allow admin full access" ON public.platform_settings
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role = 'admin'
    )
  );

-- Insert default settings
INSERT INTO public.platform_settings (key, value, description)
VALUES 
  ('razorpay_config', '{"test_mode": true}', 'Razorpay configuration and mode'),
  ('email_notifications', '{"order_confirmation": true, "status_update": true, "service_activation": true, "invoice": true}', 'Email notification preferences'),
  ('maintenance_mode', 'false', 'System maintenance mode'),
  ('general_settings', '{"site_name": "Axenora AI", "support_email": "support@axenoraai.in"}', 'General platform settings')
ON CONFLICT (key) DO NOTHING;
