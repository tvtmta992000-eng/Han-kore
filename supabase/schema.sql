-- Chạy trong Supabase: Dashboard → SQL Editor → New query → dán và bấm Run.
-- Mỗi người dùng có một dòng lưu toàn bộ tiến độ học (dạng JSON).
create table if not exists public.progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.progress enable row level security;

-- Chỉ chủ tài khoản được đọc / ghi tiến độ của chính mình.
drop policy if exists "read own progress" on public.progress;
create policy "read own progress" on public.progress for select using (auth.uid() = user_id);
drop policy if exists "insert own progress" on public.progress;
create policy "insert own progress" on public.progress for insert with check (auth.uid() = user_id);
drop policy if exists "update own progress" on public.progress;
create policy "update own progress" on public.progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
