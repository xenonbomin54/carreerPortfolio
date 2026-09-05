-- Supabase SQL Editor 에 통째로 붙여넣고 실행하세요.
-- 포트폴리오 전체를 JSON 한 덩어리로 보관합니다. 행은 'main' 하나만 씁니다.

create table if not exists public.portfolio (
  id         text        primary key,
  data       jsonb       not null,
  updated_at timestamptz not null default now()
);

alter table public.portfolio enable row level security;

-- 읽기: 누구나. 포트폴리오는 공개 페이지라 익명 조회가 필요합니다.
drop policy if exists "portfolio read for everyone" on public.portfolio;
create policy "portfolio read for everyone"
  on public.portfolio for select
  using (true);

-- 쓰기: 누구나. (현재 선택한 방식)
--
--   주의 — anon key 는 JS 번들에 실려 브라우저로 나갑니다. 따라서 이 정책이
--   켜져 있는 동안에는 /upload 주소를 몰라도, 번들에서 키와 URL 을 꺼낸
--   사람이면 누구나 REST API 로 이 테이블을 덮어쓸 수 있습니다.
--   공개 배포 전에는 아래 [잠글 때] 로 바꾸는 걸 권합니다.
--
drop policy if exists "portfolio write for everyone" on public.portfolio;
create policy "portfolio write for everyone"
  on public.portfolio for all
  using (true)
  with check (true);


-- ─────────────────────────────────────────────────────────────
-- [잠글 때] 로그인한 사용자만 쓰기
--
-- 1) Supabase Authentication 에서 본인 계정을 하나 만든다
-- 2) 아래 두 문장을 실행한다
-- 3) /upload 에 로그인 폼이 필요하다고 알려 주면 붙여 준다
--
-- drop policy if exists "portfolio write for everyone" on public.portfolio;
--
-- create policy "portfolio write for authenticated"
--   on public.portfolio for all
--   to authenticated
--   using (true)
--   with check (true);
-- ─────────────────────────────────────────────────────────────
