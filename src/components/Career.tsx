import Section from './Section';
import { usePortfolio } from '../portfolio/usePortfolio';

const splitTags = (raw: string) =>
  raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

const careerImages: string[] = [
  new URL('../assets/1.jpeg', import.meta.url).href,
  new URL('../assets/2.jpeg', import.meta.url).href,
  new URL('../assets/3.jpeg', import.meta.url).href,
  new URL('../assets/4.jpeg', import.meta.url).href,
  new URL('../assets/5.jpeg', import.meta.url).href,
  new URL('../assets/6.jpeg', import.meta.url).href,
  new URL('../assets/7.jpeg', import.meta.url).href,
  new URL('../assets/8.jpeg', import.meta.url).href,
  new URL('../assets/9.jpeg', import.meta.url).href,
  new URL('../assets/10.jpeg', import.meta.url).href,
  new URL('../assets/11.jpeg', import.meta.url).href,
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
          {data.interests.map((it) => (
            <article className="entry" key={it.id}>
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

      <h3 className="sub">활동 사진</h3>
      <div className="career-gallery">
        {careerImages.map((image, index) => (
          // 리액트 경고 방지를 위해 key 값을 index로 설정했습니다.
          <div className="career-gallery__item" key={index}>
            <img 
              src={image} 
              alt={`진로 활동 사진 ${index + 1}`} 
            />
          </div>
        ))}
      </div>

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