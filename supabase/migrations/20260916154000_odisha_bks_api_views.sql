-- Public API facade views over odisha_bks (PostgREST / supabase-js compatible).
-- Canonical data lives only in odisha_bks.*; Bengal tables untouched.

create or replace view public.odisha_bks_district_members
with (security_invoker = true) as
select * from odisha_bks.district_members;

create or replace view public.odisha_bks_district_presence
with (security_invoker = true) as
select * from odisha_bks.district_presence;

grant select on public.odisha_bks_district_members to anon, authenticated, service_role;
grant select on public.odisha_bks_district_presence to anon, authenticated, service_role;
grant insert, update, delete on public.odisha_bks_district_members to service_role;
grant insert, update, delete on public.odisha_bks_district_presence to service_role;

notify pgrst, 'reload schema';
