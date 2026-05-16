import type { ReactNode } from 'react';

import styles from './StatusCard.module.css';

interface StatusCardProps {
  label: string;
  children: ReactNode;
}

export function StatusCard({ label, children }: StatusCardProps) {
  return (
    <aside className={styles.card} aria-label={label}>
      <div className={styles.label}>
        <span className={styles.dot} aria-hidden="true" />
        {label}
      </div>
      <p className={styles.body}>{children}</p>
    </aside>
  );
}
