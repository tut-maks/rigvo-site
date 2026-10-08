-- Rigvo: leads from the website (demo gate, early access, demo requests).
-- Run once in Supabase → SQL Editor. Only the server (service role) can read/write.
create extension if not exists pgcrypto;
create table if not exists public.rigvo_leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz,
  kind        text not null check (kind in ('demo','early_access','demo_call')),
  name        text,
  email       text not null,
  company     text,
  country     text,
  city        text,
  phone       text,
  vat_id      text,
  plan        text,
  billing     text,
  language    text,
  marketing_opt_in boolean not null default false,
  consent_text text,
  page        text,
  referrer    text,
  utm         jsonb,
  ip_country  text,
  user_agent  text,
  status      text not null default 'new' check (status in ('new','contacted','demo','trial','won','lost','spam')),
  note        text
);
create index if not exists rigvo_leads_created_idx on public.rigvo_leads (created_at desc);
create index if not exists rigvo_leads_email_idx on public.rigvo_leads (lower(email));
alter table public.rigvo_leads enable row level security;
-- No policies on purpose: the browser can never read this table. Access only via /api with the service key.
