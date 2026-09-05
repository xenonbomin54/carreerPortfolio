import { useContext } from 'react';
import { PortfolioContext } from './context';

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio 는 <PortfolioProvider> 안에서만 쓸 수 있습니다.');
  return ctx;
}
