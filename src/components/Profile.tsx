import Section from './Section';
import { usePortfolio } from '../portfolio/usePortfolio';

export default function Profile() {
  const { data } = usePortfolio();

  return (
    <Section id="profile" title="기본 인적사항">
      {data.profile.length === 0 ? (
        <p className="empty">아직 등록된 항목이 없습니다.</p>
      ) : (
        <dl className="facts">
          {data.profile.map((f) => (
            <div key={f.id}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </Section>
  );
}
