import { useEffect, useRef, useState } from 'react';
import { usePortfolio } from '../portfolio/usePortfolio';
import type { ListKey, Portfolio } from '../portfolio/types';

type Spec = {
  key: string;
  label: string;
  kind?: 'text' | 'area' | 'select';
  options?: string[];
  ph?: string;
};

type Tab = {
  key: ListKey | 'meta';
  label: string;
  hint: string;
  unit: string;
  specs: Spec[];
};

const TABS: Tab[] = [
  {
    key: 'meta',
    label: '표지',
    hint: '첫 화면에 크게 들어가는 정보입니다.',
    unit: '',
    specs: [
      { key: 'name', label: '이름' },
      { key: 'nameEn', label: '영문 표기', ph: 'Kim Bomin' },
      { key: 'role', label: '한 줄 분야', ph: '웹 프론트엔드 · 데이터' },
      { key: 'year', label: '연도', ph: '2026' },
      { key: 'intro', label: '소개 문장', kind: 'area' },
    ],
  },
  {
    key: 'profile',
    label: '인적사항',
    hint: '왼쪽 항목명과 오른쪽 내용이 한 줄씩 짝을 이룹니다. 위쪽 세 개는 첫 화면에도 같이 나옵니다.',
    unit: '항목',
    specs: [
      { key: 'label', label: '항목명', ph: '재학' },
      { key: 'value', label: '내용', ph: '○○고등학교 2학년' },
    ],
  },
  {
    key: 'interests',
    label: '관심 분야',
    hint: '왜 관심이 생겼는지 계기를 한 문단으로 적으면 읽는 사람이 이해합니다.',
    unit: '분야',
    specs: [
      { key: 'title', label: '제목' },
      { key: 'body', label: '설명', kind: 'area' },
      { key: 'tags', label: '키워드', ph: '쉼표로 구분 — 프론트엔드, UI, 접근성' },
    ],
  },
  {
    key: 'aims',
    label: '직업 · 학과',
    hint: '',
    unit: '목표',
    specs: [
      { key: 'kind', label: '구분', kind: 'select', options: ['직업', '학과'] },
      { key: 'title', label: '이름', ph: '프론트엔드 개발자 / 컴퓨터공학과' },
      { key: 'org', label: '부가 정보', ph: '1지망, 희망 분야 등' },
      { key: 'reason', label: '이유', kind: 'area' },
    ],
  },
  {
    key: 'courses',
    label: '교과 활동',
    hint: '무엇을 했는지보다 무엇을 알게 됐는지를 쓰면 좋습니다.',
    unit: '활동',
    specs: [
      { key: 'term', label: '시기', ph: '2025 1학기' },
      { key: 'subject', label: '과목', ph: '정보' },
      { key: 'title', label: '활동명' },
      { key: 'summary', label: '내용', kind: 'area' },
    ],
  },
  {
    key: 'clubs',
    label: '동아리',
    hint: '',
    unit: '동아리',
    specs: [
      { key: 'term', label: '시기', ph: '2024 – 현재' },
      { key: 'name', label: '동아리명' },
      { key: 'role', label: '역할', ph: '부장 / 웹 파트' },
      { key: 'summary', label: '내용', kind: 'area' },
    ],
  },
  {
    key: 'langs',
    label: '사용 언어',
    hint: '숙련도는 과장하지 않는 편이 면접에서 안전합니다.',
    unit: '언어',
    specs: [
      { key: 'name', label: '언어' },
      {
        key: 'level',
        label: '숙련도',
        kind: 'select',
        options: ['주로 사용', '다룰 수 있음', '학습 중'],
      },
      { key: 'note', label: '사용 경험', kind: 'area' },
    ],
  },
  {
    key: 'projects',
    label: '프로젝트',
    hint: '결과를 숫자로 적을 수 있으면 적어 주세요. 훨씬 잘 읽힙니다.',
    unit: '프로젝트',
    specs: [
      { key: 'period', label: '기간', ph: '2025. 05 – 2025. 07' },
      { key: 'title', label: '제목' },
      { key: 'role', label: '맡은 일', ph: '기획 · 프론트엔드 단독' },
      { key: 'summary', label: '설명', kind: 'area' },
      { key: 'stack', label: '사용 기술', ph: 'React, TypeScript, Firebase' },
      { key: 'link', label: '링크', ph: 'https:// (없으면 비워 두세요)' },
    ],
  },
];

function Field({
  spec,
  value,
  onChange,
}: {
  spec: Spec;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="field">
      <span>{spec.label}</span>
      {spec.kind === 'area' ? (
        <textarea
          value={value}
          placeholder={spec.ph}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : spec.kind === 'select' ? (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">선택</option>
          {spec.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={value}
          placeholder={spec.ph}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

export default function Editor({ onClose }: { onClose: () => void }) {
  const { data, setMeta, addItem, updateItem, removeItem, moveItem, replaceAll, reset } =
    usePortfolio();
  const [tabKey, setTabKey] = useState<Tab['key']>('profile');
  const fileRef = useRef<HTMLInputElement>(null);
  const tab = TABS.find((t) => t.key === tabKey)!;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const download = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${data.meta.name || 'data'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const upload = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text()) as Portfolio;
      if (!parsed || typeof parsed !== 'object' || !parsed.meta) throw new Error('형식 불일치');
      replaceAll(parsed);
    } catch {
      alert('이 파일은 읽을 수 없습니다. 내보내기로 만든 JSON인지 확인해 주세요.');
    }
  };

  const list = tabKey === 'meta' ? [] : (data[tabKey] as Record<string, string>[]);

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="내용 편집">
        <div className="drawer__head">
          <div>
            <h2>내용 편집</h2>
            <p>이 브라우저에만 저장됩니다</p>
          </div>
          <button className="drawer__close" onClick={onClose}>
            닫기
          </button>
        </div>

        <div className="tabs">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`tab${t.key === tabKey ? ' is-on' : ''}`}
              onClick={() => setTabKey(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="drawer__body">
          {tab.hint && <p className="drawer__hint">{tab.hint}</p>}

          {tabKey === 'meta' ? (
            <div className="card">
              {tab.specs.map((s) => (
                <Field
                  key={s.key}
                  spec={s}
                  value={(data.meta as unknown as Record<string, string>)[s.key] ?? ''}
                  onChange={(v) => setMeta({ [s.key]: v })}
                />
              ))}
            </div>
          ) : (
            <>
              {list.map((item, i) => (
                <div className="card" key={item.id}>
                  <div className="card__bar">
                    <span>
                      {tab.unit} {i + 1}
                    </span>
                    <button
                      className="icon-btn"
                      onClick={() => moveItem(tabKey, item.id, -1)}
                      disabled={i === 0}
                      title="위로"
                    >
                      ↑
                    </button>
                    <button
                      className="icon-btn"
                      onClick={() => moveItem(tabKey, item.id, 1)}
                      disabled={i === list.length - 1}
                      title="아래로"
                    >
                      ↓
                    </button>
                    <button
                      className="icon-btn danger"
                      onClick={() => removeItem(tabKey, item.id)}
                      title="삭제"
                    >
                      삭제
                    </button>
                  </div>
                  {tab.specs.map((s) => (
                    <Field
                      key={s.key}
                      spec={s}
                      value={item[s.key] ?? ''}
                      onChange={(v) => updateItem(tabKey, item.id, s.key, v)}
                    />
                  ))}
                </div>
              ))}

              <button className="add" onClick={() => addItem(tabKey)}>
                + {tab.unit} 추가
              </button>
            </>
          )}
        </div>

        <div className="drawer__foot">
          <button className="icon-btn" onClick={download}>
            내보내기
          </button>
          <button className="icon-btn" onClick={() => fileRef.current?.click()}>
            가져오기
          </button>
          <button
            className="icon-btn danger"
            onClick={() => {
              if (confirm('입력한 내용을 모두 지우고 처음 상태로 되돌립니다. 진행할까요?')) reset();
            }}
          >
            초기화
          </button>
          <em>자동 저장됨</em>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void upload(f);
              e.target.value = '';
            }}
          />
        </div>
      </aside>
    </>
  );
}
