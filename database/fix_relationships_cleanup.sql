-- FIX 1: Clean up Orphan Orders (CRITICAL FIRST STEP)
-- We must delete orders that point to non-existent users before adding the constraint.
DELETE FROM orders 
WHERE user_id NOT IN (SELECT id FROM profiles);

-- FIX 2: Add Foreign Key Relationship for Orders
ALTER TABLE orders 
ADD CONSTRAINT fk_orders_user 
FOREIGN KEY (user_id) 
REFERENCES profiles(id)
ON DELETE SET NULL;

-- FIX 3: Create user_services table (Missing Table)
create table if not exists public.user_services (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  service_id text not null,
  tier text not null,
  billing_cycle text not null,
  status text default 'active',
  start_date timestamptz default now(),
  renewal_date timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS for user_services
alter table public.user_services enable row level security;

-- Policies for user_services
create policy "Users can view their own services"
  on public.user_services for select
  using ( auth.uid() = user_id );

-- Grant access to authenticated users
grant all on table public.user_services to authenticated;
grant all on table public.user_services to service_role;
