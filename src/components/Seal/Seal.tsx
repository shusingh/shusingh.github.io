import styles from './Seal.module.css';

interface SealProps {
  /** The kanji to stamp. */
  char: string;
  /** Accessible label; when omitted the seal is treated as decorative. */
  label?: string;
  className?: string;
}

/**
 * A small vermilion hanko-style seal stamping a single kanji, set in the
 * Japanese serif. Decorative by default.
 */
export function Seal({ char, label, className }: SealProps) {
  return (
    <span
      className={className ? `${styles.seal} ${className}` : styles.seal}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {char}
    </span>
  );
}
