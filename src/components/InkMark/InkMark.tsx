import styles from './InkMark.module.css';

interface InkMarkProps {
  className?: string;
}

/**
 * A small ink-drop mark — a soft blot with a satellite speck, echoing the
 * suminagashi ink. A culturally neutral stand-in for a logo seal.
 */
export function InkMark({ className }: InkMarkProps) {
  return (
    <svg
      className={className ? `${styles.mark} ${className}` : styles.mark}
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <ellipse cx="13.5" cy="17" rx="9.4" ry="8.6" />
      <circle cx="24.5" cy="8.6" r="2.6" />
    </svg>
  );
}
