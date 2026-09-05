import Section from './Section';
import { usePortfolio } from '../portfolio/usePortfolio';

export default function Projects() {
  const { data } = usePortfolio();

  return (
    <Section id="work" title="프로젝트">
      {data.projects.length === 0 ? (
        <p className="empty">아직 등록된 항목이 없습니다.</p>
      ) : (
        <div className="work">
          {data.projects.map((p) => (
            <article className="work__item" key={p.id}>
              <div className="work__top">
                <h3 className="work__title">{p.title}</h3>
                {p.period && <span className="work__period">{p.period}</span>}
              </div>
              {p.role && <p className="work__role">{p.role}</p>}
              {p.summary && <p className="work__summary">{p.summary}</p>}
              <p className="work__stack">
                {p.stack}
                {p.link && (
                  <>
                    {p.stack && '  ·  '}
                    <a
                      className="work__link"
                      href={p.link}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      바로가기
                    </a>
                  </>
                )}
              </p>
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}
