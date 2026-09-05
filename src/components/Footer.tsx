import { usePortfolio } from '../portfolio/usePortfolio';

export default function Footer() {
  const { data } = usePortfolio();

  return (
    <footer className="foot">
      <span>
        {data.meta.year} {data.meta.name}
      </span>
    </footer>
  );
}
