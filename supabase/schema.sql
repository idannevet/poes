-- POES database schema for Supabase.
-- Run this in the Supabase SQL Editor (Dashboard -> SQL -> New query).

create extension if not exists "pgcrypto";

create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Untitled Opportunity',
  industry text not null default 'Other',
  product_category text not null default 'Other',
  status text not null default 'draft',
  owner_email text not null default '',
  form jsonb not null default '{}'::jsonb,
  scores jsonb not null default '{}'::jsonb,
  final_score numeric not null default 0,
  decision_tier text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists opportunities_final_score_idx on public.opportunities (final_score desc);
create index if not exists opportunities_status_idx on public.opportunities (status);
create index if not exists opportunities_industry_idx on public.opportunities (industry);

-- Row Level Security: this is an internal tool, so any authenticated employee
-- can read and write all opportunities. Tighten these policies if you later
-- want per-owner restrictions.
alter table public.opportunities enable row level security;

drop policy if exists "authenticated read" on public.opportunities;
create policy "authenticated read"
  on public.opportunities for select
  to authenticated
  using (true);

drop policy if exists "authenticated insert" on public.opportunities;
create policy "authenticated insert"
  on public.opportunities for insert
  to authenticated
  with check (true);

drop policy if exists "authenticated update" on public.opportunities;
create policy "authenticated update"
  on public.opportunities for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "authenticated delete" on public.opportunities;
create policy "authenticated delete"
  on public.opportunities for delete
  to authenticated
  using (true);
