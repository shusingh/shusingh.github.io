import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { WorkDiagram, type WorkDiagramProps } from '@/components/WorkDiagram/WorkDiagram';

import styles from './WorkCard.module.css';

export type WorkCardVariant = 'hero' | 'small';

export interface WorkCardStat {
  number: string;
  label: string;
}

interface WorkCardProps {
  to: string;
  eyebrow: string;
  title: string;
  description: string;
  tech: string[];
  variant?: WorkCardVariant;
  stat?: WorkCardStat;
  diagram?: WorkDiagramProps;
  visual?: ReactNode;
  linkLabel?: string;
}

export function WorkCard({
  to,
  eyebrow,
  title,
  description,
  tech,
  variant = 'hero',
  stat,
  diagram,
  visual,
  linkLabel,
}: WorkCardProps) {
  const className = variant === 'small' ? `${styles.card} ${styles.small}` : styles.card;
  const defaultLinkLabel = variant === 'small' ? 'Case study' : 'Read the case study';

  return (
    <Link to={to} className={className} aria-label={`${title} case study`}>
      <div className={styles.visual}>{visual ?? (diagram ? <WorkDiagram {...diagram} /> : null)}</div>
      <div className={styles.content}>
        <div className={styles.eyebrow}>{eyebrow}</div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        {tech.length > 0 ? (
          <ul className={styles.tags}>
            {tech.map((item) => (
              <li key={item} className={styles.tag}>
                {item}
              </li>
            ))}
          </ul>
        ) : null}
        {stat ? (
          <div className={styles.stat}>
            <span className={styles.statNumber}>{stat.number}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ) : null}
        <span className={styles.link}>
          {linkLabel ?? defaultLinkLabel}
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
