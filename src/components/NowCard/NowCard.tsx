import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from './NowCard.module.css';

export interface NowEntry {
  label: string;
  value: ReactNode;
}

interface NowCardProps {
  headingPrefix: string;
  headingAccent: string;
  date: string;
  entries: NowEntry[];
  footerLink?: { to: string; label: string };
}

export function NowCard({
  headingPrefix,
  headingAccent,
  date,
  entries,
  footerLink,
}: NowCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.left}>
        <div>
          <h2 className={styles.heading}>
            {headingPrefix} <span className={styles.italic}>{headingAccent}</span>
          </h2>
          <div className={styles.date}>{date}</div>
        </div>
        {footerLink ? (
          <div className={styles.footer}>
            <Link to={footerLink.to}>{footerLink.label} →</Link>
          </div>
        ) : null}
      </div>
      <ul className={styles.list}>
        {entries.map((entry) => (
          <li key={entry.label} className={styles.item}>
            <div className={styles.label}>{entry.label}</div>
            <div className={styles.value}>{entry.value}</div>
          </li>
        ))}
      </ul>
    </article>
  );
}
