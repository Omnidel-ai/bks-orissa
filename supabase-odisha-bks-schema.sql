-- BKS Odisha — isolated schema inside shared BKS Supabase project (lhnorkjfldywnrqqunqn)
-- Architectural reference: public.bks_district_members / public.bks_district_presence (Bengal)
--
-- AUTHORIZED: ADD odisha_bks schema + Odisha-only objects + odisha-district-members bucket
-- FORBIDDEN: modify/drop/truncate Bengal tables, Protyaborton, Vatika, or other existing data
--
-- Idempotent: create if not exists / policy recreate only for Odisha objects

create schema if not exists odisha_bks;

grant usage on schema odisha_bks to postgres, anon, authenticated, service_role;

create table if not exists odisha_bks.district_members (
  id uuid primary key default gen_random_uuid(),
  district_id text not null,
  slug text not null,
  full_name text not null,
  photo_path text,
  designation text,
  village text,
  block text,
  area text,
  bio text,
  category text,
  display_order integer not null default 100,
  is_published boolean not null default false,
  is_archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  updated_by text,
  constraint odisha_bks_district_members_district_slug_unique unique (district_id, slug)
);

create index if not exists odisha_bks_district_members_public_list_idx
  on odisha_bks.district_members (district_id, is_published, is_archived, display_order);

create or replace function odisha_bks.district_members_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists odisha_bks_district_members_updated_at on odisha_bks.district_members;
create trigger odisha_bks_district_members_updated_at
before update on odisha_bks.district_members
for each row
execute function odisha_bks.district_members_set_updated_at();

alter table odisha_bks.district_members enable row level security;

drop policy if exists "odisha_bks_public_select_published_members"
  on odisha_bks.district_members;
create policy "odisha_bks_public_select_published_members"
on odisha_bks.district_members
for select
to anon, authenticated
using (is_published = true and is_archived = false);

create table if not exists odisha_bks.district_presence (
  district_id text primary key,
  status text not null
    check (status in ('active', 'indicated', 'upcoming')),
  notes text,
  updated_at timestamptz not null default now(),
  updated_by text
);

alter table odisha_bks.district_presence enable row level security;

drop policy if exists "odisha_bks_public_select_presence"
  on odisha_bks.district_presence;
create policy "odisha_bks_public_select_presence"
on odisha_bks.district_presence
for select
to anon, authenticated
using (true);

grant select on table odisha_bks.district_members to anon, authenticated, service_role;
grant select on table odisha_bks.district_presence to anon, authenticated, service_role;
grant all on table odisha_bks.district_members to service_role;
grant all on table odisha_bks.district_presence to service_role;

alter default privileges in schema odisha_bks
  grant select on tables to anon, authenticated;
alter default privileges in schema odisha_bks
  grant all on tables to service_role;

-- Odisha-only photo bucket (do not alter Bengal district-members bucket)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'odisha-district-members',
  'odisha-district-members',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "odisha_bks_public_read_member_photos" on storage.objects;
create policy "odisha_bks_public_read_member_photos"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'odisha-district-members');

notify pgrst, 'reload schema';
