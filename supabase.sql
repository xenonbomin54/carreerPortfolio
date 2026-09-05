-- Supabase SQL Editor 에 붙여넣고 실행하세요.
-- 포트폴리오 전체를 JSON 한 덩어리로 보관합니다. 행은 'main' 하나만 씁니다.

create table if not exists public.portfolio (
  id         text        primary key,
  data       jsonb       not null,
  updated_at timestamptz not null default now()
);

alter table public.portfolio enable row level security;

-- 읽기: 누구나. 포트폴리오는 공개 페이지라 익명 조회가 필요합니다.
create policy "portfolio read for everyone"
  on public.portfolio for select
  using (true);


-- ─────────────────────────────────────────────────────────────
-- 쓰기 정책은 아직 만들지 않았습니다. 아래 둘 중 하나를 고르세요.
-- 정책이 없으면 RLS 가 모든 쓰기를 막으므로, 지금 상태에서 /upload 는
-- 저장에 실패합니다. 잠긴 편이 열린 채 방치되는 것보다 안전합니다.
-- ─────────────────────────────────────────────────────────────

-- [A] 로그인한 사용자만 쓰기 (권장)
--     Supabase Authentication 에서 본인 계정을 하나 만든 뒤 사용합니다.
--     /upload 에 로그인 폼을 붙이는 작업이 추가로 필요합니다.
--
-- create policy "portfolio write for authenticated"
--   on public.portfolio for all
--   to authenticated
--   using (true)
--   with check (true);


-- [B] 누구나 쓰기 (권장하지 않음)
--     anon key 는 브라우저에 노출되므로, /upload 주소를 아는 사람은
--     물론이고 키를 본 사람 누구나 포트폴리오를 덮어쓸 수 있습니다.
--     테스트 용도로만 잠깐 켜세요.
--
-- create policy "portfolio write for everyone"
--   on public.portfolio for all
--   using (true)
--   with check (true);
