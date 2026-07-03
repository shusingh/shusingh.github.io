import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './ReadingProgress.module.css';

/**
 * A thin accent stroke across the top of the viewport that draws itself as
 * the reader scrolls — a brushstroke being pulled across the page.
 */
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return undefined;

    let raf = 0;
    function update() {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar!.style.transform = `scaleX(${progress})`;
    }
    function schedule() {
      if (!raf) raf = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  // Portaled to <body>: position: fixed breaks inside any ancestor with a
  // transform (e.g. an animated page container), and z-index would otherwise
  // be trapped in the main content's stacking context.
  return createPortal(
    <div className={styles.track} aria-hidden="true">
      <div ref={barRef} className={styles.bar} />
    </div>,
    document.body
  );
}
