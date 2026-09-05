import type { ReactNode } from 'react';

type Props = {
  id: string;
  title: string;
  children: ReactNode;
};

export default function Section({ id, title, children }: Props) {
  return (
    <section id={id} className="section">
      <h2 className="section__title">{title}</h2>
      {children}
    </section>
  );
}
