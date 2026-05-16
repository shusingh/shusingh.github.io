import { useEffect, useState } from 'react';

import styles from './LoadingIntro.module.css';

const STORAGE_KEY = 'intro:seen';
const TOTAL_MS = 1500;

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function alreadySeen(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function LoadingIntro() {
  const [hidden, setHidden] = useState<boolean>(() => alreadySeen() || prefersReducedMotion());

  useEffect(() => {
    if (hidden) return;

    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Storage may be unavailable (private mode, locked-down browsers); intro will replay.
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timeout = window.setTimeout(() => {
      setHidden(true);
    }, TOTAL_MS);

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
    };
  }, [hidden]);

  useEffect(() => {
    if (hidden) {
      document.body.style.overflow = '';
    }
  }, [hidden]);

  if (hidden) return null;

  return (
    <div className={styles.overlay} aria-hidden="true">
      <div className={styles.inner}>
        <span className={styles.logo}>Shubham Singh</span>
        <span className={styles.name}>
          Shubham <span className={styles.accent}>Singh</span>
        </span>
      </div>
    </div>
  );
}
