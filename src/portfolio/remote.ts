import { createClient } from '@supabase/supabase-js';
import type { Portfolio } from './types';

/**
 * Supabase 저장소.
 *
 * VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY 가 있을 때만 켜진다.
 * 없으면 isRemoteEnabled 가 false 가 되고 store 는 localStorage 만 쓴다.
 * 키는 .env 에 넣고 커밋하지 않는다. (.env.example 참고)
 */

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** 포트폴리오 전체를 JSON 한 덩어리로 보관하는 테이블 */
const TABLE = import.meta.env.VITE_SUPABASE_TABLE || 'portfolio';

/** 단일 문서라 행 하나만 쓴다 */
const ROW_ID = 'main';

export const isRemoteEnabled = Boolean(url && anonKey);

const client = url && anonKey ? createClient(url, anonKey) : null;

export async function fetchRemote(): Promise<Portfolio | null> {
  if (!client) return null;

  const { data, error } = await client
    .from(TABLE)
    .select('data')
    .eq('id', ROW_ID)
    .maybeSingle();

  if (error) throw error;
  return (data?.data as Portfolio | undefined) ?? null;
}

export async function saveRemote(payload: Portfolio): Promise<void> {
  if (!client) return;

  const { error } = await client.from(TABLE).upsert({
    id: ROW_ID,
    data: payload,
    updated_at: new Date().toISOString(),
  });

  if (error) throw error;
}
