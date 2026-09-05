import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { defaultPortfolio, uid } from './defaults';
import { PortfolioContext } from './context';
import type { PortfolioCtx } from './context';
import type { ListKey, Portfolio } from './types';

const STORAGE_KEY = 'portfolio.v1';

function load(): Portfolio {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPortfolio;
    const parsed = JSON.parse(raw) as Partial<Portfolio>;
    // 저장본에 없는 키는 기본값으로 메운다 (항목이 늘어나도 깨지지 않게)
    return { ...defaultPortfolio, ...parsed, meta: { ...defaultPortfolio.meta, ...parsed.meta } };
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

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Portfolio>(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

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

  const replaceAll: PortfolioCtx['replaceAll'] = useCallback((next) => setData(next), []);

  const reset: PortfolioCtx['reset'] = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setData(load());
  }, []);

  const value = useMemo(
    () => ({ data, setMeta, addItem, updateItem, removeItem, moveItem, replaceAll, reset }),
    [data, setMeta, addItem, updateItem, removeItem, moveItem, replaceAll, reset],
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}
