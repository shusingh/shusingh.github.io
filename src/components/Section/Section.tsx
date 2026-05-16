import type { ReactNode } from 'react';

import styles from './Section.module.css';

interface SectionProps {
  id?: string;
  num: string;
  title: string;
  meta?: string;
  children: ReactNode;
}

export function Section({ id, num, title, meta, children }: SectionProps) {
  const headingId = id ? `${id}-title` : undefined;

  return (
    <section className={styles.section} id={id} aria-labelledby={headingId}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title} id={headingId}>
            <span className={styles.num}>{num}</span>
            {title}
          </h2>
          {meta ? <div className={styles.meta}>{meta}</div> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
