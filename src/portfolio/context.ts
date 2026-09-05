import { createContext } from 'react';
import type { ListKey, Portfolio } from './types';

/** off = Supabase 미설정(로컬만) */
export type SyncState = 'off' | 'loading' | 'saving' | 'idle' | 'error';

export type PortfolioCtx = {
  data: Portfolio;
  sync: SyncState;
  setMeta: (patch: Partial<Portfolio['meta']>) => void;
  addItem: (key: ListKey) => void;
  updateItem: (key: ListKey, id: string, field: string, value: string) => void;
  removeItem: (key: ListKey, id: string) => void;
  moveItem: (key: ListKey, id: string, dir: -1 | 1) => void;
  replaceAll: (next: Portfolio) => void;
  reset: () => void;
};

export const PortfolioContext = createContext<PortfolioCtx | null>(null);
