import { useRef } from 'react';
import { usePortfolio } from '../portfolio/usePortfolio';

const WINDOW_MS = 1200;
const NEEDED = 3;

export default function Footer({ onSecret }: { onSecret: () => void }) {
  const { data } = usePortfolio();
  const taps = useRef<number[]>([]);

  // 마침표를 1.2초 안에 세 번 누르면 편집 서랍이 열린다.
  const tap = () => {
    const now = Date.now();
    taps.current = [...taps.current, now].filter((t) => now - t < WINDOW_MS);
    if (taps.current.length >= NEEDED) {
      taps.current = [];
      onSecret();
    }
  };

  return (
    <footer className="foot">
      <span>
        {data.meta.year} {data.meta.name}
      </span>
      <span className="foot__dot" onClick={tap} aria-hidden="true">
        ·
      </span>
    </footer>
  );
}
