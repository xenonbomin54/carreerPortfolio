import { usePortfolio } from '../portfolio/usePortfolio';

export default function Home() {
  const { data } = usePortfolio();
  const { meta } = data;
  const highlights = data.profile.slice(0, 3);

  return (
    <section id="home" className="hero">
      <h1 className="hero__name">{meta.name}</h1>
      {meta.role && <p className="hero__role">{meta.role}</p>}
      {meta.intro && <p className="hero__intro">{meta.intro}</p>}

      {highlights.length > 0 && (
        <ul className="hero__meta">
          {highlights.map((f) => (
            <li key={f.id}>
              <span>{f.label}</span>
              {f.value}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
