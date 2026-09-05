import type { Portfolio } from './types';

/**
 * Supabase 저장소. PostgREST 를 fetch 로 직접 호출한다.
 *
 * 하는 일이 "행 하나 읽기 / 행 하나 덮어쓰기" 뿐이라 supabase-js 를 쓰지 않는다.
 * (그 라이브러리는 realtime·auth·storage 까지 딸려 와서 번들이 210KB 늘어난다.)
 *
 * VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY 가 있을 때만 켜진다.
 * 없으면 isRemoteEnabled 가 false 가 되고 store 는 localStorage 만 쓴다.
 */

/** 프로젝트 기본 주소. 뒤에 /rest/v1 을 붙여 줬더라도 떼어 낸다. */
const root = (import.meta.env.VITE_SUPABASE_URL ?? '')
  .trim()
  .replace(/\/+$/, '')
  .replace(/\/rest\/v1$/, '');

const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim();

/** 포트폴리오 전체를 JSON 한 덩어리로 보관하는 테이블 */
const table = import.meta.env.VITE_SUPABASE_TABLE || 'portfolio';

/** 단일 문서라 행 하나만 쓴다 */
const ROW_ID = 'main';

export const isRemoteEnabled = Boolean(root && anonKey);

const endpoint = `${root}/rest/v1/${table}`;

async function call(query: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(endpoint + query, {
    ...init,
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Supabase ${res.status} — ${await res.text()}`);
  }
  return res;
}

export async function fetchRemote(): Promise<Portfolio | null> {
  if (!isRemoteEnabled) return null;

  const res = await call(`?id=eq.${ROW_ID}&select=data&limit=1`);
  const rows = (await res.json()) as { data: Portfolio }[];
  return rows[0]?.data ?? null;
}

export async function saveRemote(payload: Portfolio): Promise<void> {
  if (!isRemoteEnabled) return;

  // PostgREST 업서트: 같은 id 가 있으면 덮어쓴다.
  await call('', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({
      id: ROW_ID,
      data: payload,
      updated_at: new Date().toISOString(),
    }),
  });
}
