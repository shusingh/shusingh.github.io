import { useEffect, useRef, useState, type ReactNode } from 'react';

import styles from './Section.module.css';

interface SectionProps {
  id?: string;
  num: string;
  title: string;
  meta?: string;
  children: ReactNode;
}

/** One-time rise-and-fade as the section first enters the viewport. */
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setRevealed(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -60px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, revealed };
}

export function Section({ id, num, title, meta, children }: SectionProps) {
  const headingId = id ? `${id}-title` : undefined;
  const { ref, revealed } = useReveal();

  return (
    <section
      ref={ref}
      className={`${styles.section} ${revealed ? styles.revealed : styles.pending}`}
      id={id}
      aria-labelledby={headingId}
    >
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
