import Section from './Section';
import { usePortfolio } from '../portfolio/usePortfolio';

export default function Competence() {
  const { data } = usePortfolio();

  return (
    <Section id="competence" title="역량">
      <h3 className="sub">교과 활동</h3>
      {data.courses.length === 0 ? (
        <p className="empty">아직 등록된 항목이 없습니다.</p>
      ) : (
        <div className="rows">
          {data.courses.map((c) => (
            <article className="row" key={c.id}>
              <p className="row__when">{c.term}</p>
              <div>
                {c.subject && <p className="row__label">{c.subject}</p>}
                <h4 className="row__title">{c.title}</h4>
                {c.summary && <p className="row__text">{c.summary}</p>}
              </div>
            </article>
          ))}
        </div>
      )}

      <h3 className="sub">동아리 활동</h3>
      {data.clubs.length === 0 ? (
        <p className="empty">아직 등록된 항목이 없습니다.</p>
      ) : (
        <div className="rows">
          {data.clubs.map((c) => (
            <article className="row" key={c.id}>
              <p className="row__when">{c.term}</p>
              <div>
                {c.role && <p className="row__label">{c.role}</p>}
                <h4 className="row__title">{c.name}</h4>
                {c.summary && <p className="row__text">{c.summary}</p>}
              </div>
            </article>
          ))}
        </div>
      )}

      <h3 className="sub">사용 언어</h3>
      {data.langs.length === 0 ? (
        <p className="empty">아직 등록된 항목이 없습니다.</p>
      ) : (
        <div className="langs">
          {data.langs.map((l) => (
            <article className="lang" key={l.id}>
              <h4 className="lang__name">{l.name}</h4>
              <p className="lang__level">{l.level}</p>
              {l.note && <p className="lang__note">{l.note}</p>}
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}
