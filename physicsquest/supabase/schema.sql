-- PhysicsQuest — Supabase schema
-- Run with: supabase db push  OR  psql $DATABASE_URL -f supabase/schema.sql

-- ----------------------------------------------------------------
-- Extensions
-- ----------------------------------------------------------------
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------
-- Users / profiles
-- ----------------------------------------------------------------
create table if not exists profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  display_name  text not null default 'Learner',
  current_level smallint not null default 1 check (current_level between 1 and 10),
  birth_year    smallint,                        -- used to infer age tier
  is_under_13   boolean not null default false,
  parent_email  text,                            -- required when is_under_13
  parent_consent_at timestamptz,                 -- null = consent not yet given
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Trigger: keep updated_at fresh
create or replace function touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
create trigger profiles_updated_at
  before update on profiles
  for each row execute function touch_updated_at();

-- ----------------------------------------------------------------
-- FSRS mastery cards
-- ----------------------------------------------------------------
create table if not exists mastery_cards (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references profiles(id) on delete cascade,
  concept_id      text not null,                -- matches dag node id
  stability       real not null default 0,
  difficulty      real not null default 5,
  elapsed_days    real not null default 0,
  scheduled_days  real not null default 0,
  reps            integer not null default 0,
  lapses          integer not null default 0,
  state           text not null default 'new'
                    check (state in ('new','learning','review','relearning')),
  last_review     timestamptz,
  due             timestamptz not null default now(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (user_id, concept_id)
);

create trigger mastery_cards_updated_at
  before update on mastery_cards
  for each row execute function touch_updated_at();

create index mastery_cards_user_due
  on mastery_cards(user_id, due);

-- ----------------------------------------------------------------
-- Misconception events (logged by AI tutor)
-- ----------------------------------------------------------------
create table if not exists misconception_events (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references profiles(id) on delete cascade,
  concept_id      text not null,
  misconception_id text not null,              -- e.g. "heavier_falls_faster"
  misconception_label text not null,
  detected_at     timestamptz not null default now(),
  resolved_at     timestamptz,                 -- set when a later review is Good/Easy
  lesson_slug     text
);

create index misconception_events_user_concept
  on misconception_events(user_id, concept_id, detected_at desc);

-- ----------------------------------------------------------------
-- Lesson progress (tracks ISLE phases per lesson)
-- ----------------------------------------------------------------
create table if not exists lesson_progress (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references profiles(id) on delete cascade,
  lesson_slug text not null,
  phase       text not null
                check (phase in ('observe','predict','explain','test','apply','done')),
  prediction  text,
  started_at  timestamptz not null default now(),
  completed_at timestamptz,
  unique (user_id, lesson_slug)
);

-- ----------------------------------------------------------------
-- Tutor sessions (only stored with parental consent for under-13)
-- ----------------------------------------------------------------
create table if not exists tutor_sessions (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references profiles(id) on delete cascade,
  lesson_slug text not null,
  concept_id  text not null,
  messages    jsonb not null default '[]'::jsonb,   -- [{role,content}]
  started_at  timestamptz not null default now(),
  ended_at    timestamptz
);

-- ----------------------------------------------------------------
-- Row-Level Security (RLS)
-- ----------------------------------------------------------------
alter table profiles           enable row level security;
alter table mastery_cards      enable row level security;
alter table misconception_events enable row level security;
alter table lesson_progress    enable row level security;
alter table tutor_sessions     enable row level security;

-- Users can only see/edit their own rows
create policy "own profile"     on profiles           for all using (auth.uid() = id);
create policy "own mastery"     on mastery_cards      for all using (auth.uid() = user_id);
create policy "own misconceptions" on misconception_events for all using (auth.uid() = user_id);
create policy "own progress"    on lesson_progress    for all using (auth.uid() = user_id);
create policy "own sessions"    on tutor_sessions     for all using (auth.uid() = user_id);

-- Service role bypasses RLS (used only server-side with SUPABASE_SERVICE_ROLE_KEY)

-- ----------------------------------------------------------------
-- Helper view: mastery summary per user per level
-- ----------------------------------------------------------------
create or replace view mastery_by_level as
select
  mc.user_id,
  -- We don't store level in mastery_cards; join would need a concept table.
  -- For now expose all cards with their current mastery score.
  mc.concept_id,
  mc.stability,
  mc.reps,
  mc.lapses,
  mc.state,
  mc.due,
  -- Approximate current retrievability
  case
    when mc.state = 'new' then 0
    else round(
      power(
        1 + extract(epoch from (now() - mc.last_review)) / 86400.0
          / (9 * greatest(mc.stability, 0.1)),
        -1
      )::numeric,
      3
    )
  end as retrievability
from mastery_cards mc;

comment on view mastery_by_level is
  'Live retrievability per concept card — used by teacher/parent dashboard.';
