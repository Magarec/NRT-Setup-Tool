-- NRT ACC Setup Hub - Supabase Schema Tabs Version

create table if not exists public.setups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  title text not null,
  track text not null,
  car text not null,
  driver text,
  visibility text not null default 'public',
  weather text default 'Trocken',

  tyre_fl text,
  tyre_fr text,
  tyre_rl text,
  tyre_rr text,

  tc1 text,
  tc2 text,
  abs text,
  ecu_map text,

  toe_fl text,
  toe_fr text,
  toe_rl text,
  toe_rr text,
  camber_fl text,
  camber_fr text,
  camber_rl text,
  camber_rr text,
  caster_fl text,
  caster_fr text,
  caster_rl text,
  caster_rr text,
  arb_front text,
  arb_rear text,
  diff_preload text,

  bump_fl text,
  bump_fr text,
  bump_rl text,
  bump_rr text,
  fast_bump_fl text,
  fast_bump_fr text,
  fast_bump_rl text,
  fast_bump_rr text,
  rebound_fl text,
  rebound_fr text,
  rebound_rl text,
  rebound_rr text,
  fast_rebound_fl text,
  fast_rebound_fr text,
  fast_rebound_rl text,
  fast_rebound_rr text,

  ride_height_front text,
  ride_height_rear text,
  rear_wing text,
  diffuser text,
  brake_duct_front text,
  brake_duct_rear text,

  notes text,
  rating integer default 0,
  created_at timestamptz default now()
);

alter table public.setups enable row level security;

create policy "Öffentliche Setups sichtbar"
on public.setups for select
using (visibility = 'public' or auth.uid() = user_id);

create policy "Eingeloggte User können Setups erstellen"
on public.setups for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Eigene Setups bearbeiten"
on public.setups for update
to authenticated
using (auth.uid() = user_id);

create policy "Eigene Setups löschen"
on public.setups for delete
to authenticated
using (auth.uid() = user_id);
