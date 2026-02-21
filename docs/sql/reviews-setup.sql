-- Reviews table: user_id links to Supabase Auth (same as clients.id for portal users)
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  user_name text not null default 'Anonymous',
  rating smallint not null check (rating >= 1 and rating <= 5),
  comment text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for listing by date and for lookups by user
create index if not exists idx_reviews_created_at on public.reviews (created_at desc);
create index if not exists idx_reviews_user_id on public.reviews (user_id);

-- Optional: trigger to keep updated_at in sync
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists reviews_updated_at on public.reviews;
create trigger reviews_updated_at
  before update on public.reviews
  for each row execute function public.set_updated_at();

comment on table public.reviews is 'User reviews and suggestions for the clinic; user_id matches auth.users/clients.';
