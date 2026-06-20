create table if not exists public.chat_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  interest text,
  summary text,
  source text not null default 'website-chatbot',
  page text,
  session_id text,
  consented_at timestamptz not null default now(),
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.chat_leads enable row level security;

create index if not exists chat_leads_created_at_idx on public.chat_leads (created_at desc);
create index if not exists chat_leads_status_idx on public.chat_leads (status);

comment on table public.chat_leads is 'Consent-based leads captured by the Axenora website assistant. Backend service-role access only.';
