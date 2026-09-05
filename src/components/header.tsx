import { useEffect, useState } from 'react';
import { SECTIONS } from '../portfolio/sections';
import { usePortfolio } from '../portfolio/usePortfolio';

export default function Header() {
  const { data } = usePortfolio();
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!targets.length) return;

    // 헤더 바로 아래를 지나는 섹션을 현재 위치로 본다.
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-60px 0px -70% 0px', threshold: 0 },
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <header className="topbar">
      <div className="topbar__inner">
        <a className="topbar__name" href="#home">
          {data.meta.name}
        </a>

        <nav className="topbar__nav">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`topbar__link${active === s.id ? ' is-on' : ''}`}
              aria-current={active === s.id ? 'true' : undefined}
            >
              {s.nav}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
