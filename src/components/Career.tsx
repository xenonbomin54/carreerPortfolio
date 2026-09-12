import Section from './Section';
import { usePortfolio } from '../portfolio/usePortfolio';

const splitTags = (raw: string) =>
  raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

const careerImages = [
  '/images/career/1.jpg',
  '/images/career/2.jpg',
  '/images/career/3.jpg',
  '/images/career/4.jpg',
  '/images/career/5.jpg',
  '/images/career/6.jpg',
  '/images/career/7.jpg',
  '/images/career/8.jpg',
  '/images/career/9.jpg',
  '/images/career/10.jpg',
  '/images/career/11.jpg',
];

export default function Career() {
  const { data } = usePortfolio();

  return (
    <Section id="career" title="진로 활동">
      <h3 className="sub">관심 분야</h3>
      {data.interests.length === 0 ? (
        <p className="empty">아직 등록된 항목이 없습니다.</p>
      ) : (
        <div className="entries">
          {data.interests.map((it, index) => (
            <article className="entry" key={it.id}>
              {careerImages[index] && (
                <img
                  className="entry__image"
                  src={careerImages[index]}
                  alt={`${it.title} 활동 사진`}
                />
              )}

              <h4 className="entry__title">{it.title}</h4>

              <p className="entry__body">{it.body}</p>

              {splitTags(it.tags).length > 0 && (
                <p className="tags">
                  {splitTags(it.tags).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </p>
              )}
            </article>
          ))}
        </div>
      )}

      <h3 className="sub">관심 직업 · 학과</h3>
      {data.aims.length === 0 ? (
        <p className="empty">아직 등록된 항목이 없습니다.</p>
      ) : (
        <div className="aims">
          {data.aims.map((a) => (
            <article className="aim" key={a.id}>
              <p className="aim__kind">{a.kind}</p>
              <h4 className="aim__title">{a.title}</h4>
              {a.org && <p className="aim__org">{a.org}</p>}
              {a.reason && <p className="aim__reason">{a.reason}</p>}
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}