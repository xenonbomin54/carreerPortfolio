import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { defaultPortfolio, uid } from './defaults';
import { PortfolioContext } from './context';
import type { PortfolioCtx, SyncState } from './context';
import { fetchRemote, isRemoteEnabled, saveRemote } from './remote';
import type { ListKey, Portfolio } from './types';

const STORAGE_KEY = 'portfolio.v2';
const SAVE_DELAY = 800;

/** 저장본에 없는 키는 기본값으로 메운다 (항목이 늘어나도 깨지지 않게) */
function merge(parsed: Partial<Portfolio>): Portfolio {
  return { ...defaultPortfolio, ...parsed, meta: { ...defaultPortfolio.meta, ...parsed.meta } };
}

function loadLocal(): Portfolio {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPortfolio;
    return merge(JSON.parse(raw) as Partial<Portfolio>);
  } catch {
    return defaultPortfolio;
  }
}

const blankOf = (key: ListKey) => {
  const sample = defaultPortfolio[key][0] as Record<string, string>;
  const blank: Record<string, string> = { id: uid() };
  for (const k of Object.keys(sample)) if (k !== 'id') blank[k] = '';
  return blank;
};

export function PortfolioProvider({
  children,
  writable = false,
}: {
  children: ReactNode;
  /** true 일 때만 Supabase 에 쓴다. 공개 페이지는 읽기 전용. */
  writable?: boolean;
}) {
  const [data, setData] = useState<Portfolio>(loadLocal);
  const [sync, setSync] = useState<SyncState>(isRemoteEnabled ? 'loading' : 'off');

  // 원격을 한 번 읽어오기 전에는 저장하지 않는다 (기본값으로 덮어쓰는 사고 방지)
  const ready = useRef(!isRemoteEnabled);

  useEffect(() => {
    if (!isRemoteEnabled) return;
    let alive = true;

    fetchRemote()
      .then((remote) => {
        if (!alive) return;
        if (remote) setData(merge(remote));
        setSync('idle');
      })
      .catch((e) => {
        console.error('[portfolio] 원격 불러오기 실패', e);
        if (alive) setSync('error');
      })
      .finally(() => {
        ready.current = true;
      });

    return () => {
      alive = false;
    };
  }, []);

  // 로컬 캐시는 항상 남긴다
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* 용량 초과 등은 무시 */
    }
  }, [data]);

  // 원격 저장은 편집 화면에서만, 입력이 멈춘 뒤에
  useEffect(() => {
    if (!writable || !isRemoteEnabled || !ready.current) return;

    setSync('saving');
    const t = setTimeout(() => {
      saveRemote(data)
        .then(() => setSync('idle'))
        .catch((e) => {
          console.error('[portfolio] 원격 저장 실패', e);
          setSync('error');
        });
    }, SAVE_DELAY);

    return () => clearTimeout(t);
  }, [data, writable]);

  const setMeta: PortfolioCtx['setMeta'] = useCallback((patch) => {
    setData((d) => ({ ...d, meta: { ...d.meta, ...patch } }));
  }, []);

  const addItem: PortfolioCtx['addItem'] = useCallback((key) => {
    setData((d) => ({ ...d, [key]: [...(d[key] as Record<string, string>[]), blankOf(key)] }));
  }, []);

  const updateItem: PortfolioCtx['updateItem'] = useCallback((key, id, field, value) => {
    setData((d) => ({
      ...d,
      [key]: (d[key] as Record<string, string>[]).map((it) =>
        it.id === id ? { ...it, [field]: value } : it,
      ),
    }));
  }, []);

  const removeItem: PortfolioCtx['removeItem'] = useCallback((key, id) => {
    setData((d) => ({
      ...d,
      [key]: (d[key] as Record<string, string>[]).filter((it) => it.id !== id),
    }));
  }, []);

  const moveItem: PortfolioCtx['moveItem'] = useCallback((key, id, dir) => {
    setData((d) => {
      const list = [...(d[key] as Record<string, string>[])];
      const i = list.findIndex((it) => it.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= list.length) return d;
      [list[i], list[j]] = [list[j], list[i]];
      return { ...d, [key]: list };
    });
  }, []);

  const replaceAll: PortfolioCtx['replaceAll'] = useCallback((next) => setData(merge(next)), []);

  const reset: PortfolioCtx['reset'] = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setData(defaultPortfolio);
  }, []);

  const value = useMemo(
    () => ({ data, sync, setMeta, addItem, updateItem, removeItem, moveItem, replaceAll, reset }),
    [data, sync, setMeta, addItem, updateItem, removeItem, moveItem, replaceAll, reset],
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}
