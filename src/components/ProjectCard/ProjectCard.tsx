import { Link } from 'react-router-dom';

import type { ProjectKind, ProjectStatus, WorkStat } from '@/content/types';

import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  to: string;
  title: string;
  description: string;
  kind: ProjectKind;
  year: number;
  tags: string[];
  link: string;
  repo?: string;
  liveUrl?: string;
  upstream?: string;
  prUrl?: string;
  prNumber?: number;
  status?: ProjectStatus;
  stat?: WorkStat;
  compact?: boolean;
}

const KIND_LABEL: Record<ProjectKind, string> = {
  personal: 'Personal project',
  contribution: 'Open source',
};

const STATUS_LABEL: Record<ProjectStatus, string> = {
  active: 'Active',
  merged: 'Merged',
  open: 'Open PR',
  closed: 'Closed',
  released: 'Released',
  wip: 'In progress',
};

function stopPropagation(event: React.MouseEvent) {
  event.stopPropagation();
}

export function ProjectCard({
  to,
  title,
  description,
  kind,
  year,
  tags,
  link,
  repo,
  liveUrl,
  upstream,
  prUrl,
  prNumber,
  status,
  stat,
  compact = false,
}: ProjectCardProps) {
  const isContribution = kind === 'contribution';
  const primaryHref = isContribution ? (prUrl ?? link) : (repo ?? link);
  const primaryLabel = isContribution ? 'View PR' : 'View repo';
  const headerLabel = isContribution && upstream ? upstream : KIND_LABEL[kind];
  const cardClass = compact ? `${styles.card} ${styles.compact}` : styles.card;

  return (
    <article className={cardClass}>
      <Link className={styles.cardLink} to={to} aria-label={`${title}: project notes`}>
        <span className="visually-hidden">{title}</span>
      </Link>

      <div className={styles.meta}>
        <span className={styles.metaPrimary}>{headerLabel}</span>
        {isContribution && prNumber ? <span>#{prNumber}</span> : null}
        <span>{year}</span>
        {status ? <span>{STATUS_LABEL[status]}</span> : null}
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      {tags.length > 0 ? (
        <ul className={styles.tags}>
          {tags.map((tag) => (
            <li key={tag}>
              <Link
                className={styles.tag}
                to={`/projects?tag=${encodeURIComponent(tag)}`}
                onClick={stopPropagation}
              >
                #{tag}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      <div className={styles.bottom}>
        {stat ? (
          <div className={styles.stat}>
            <span className={styles.statNumber}>{stat.number}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ) : (
          <span />
        )}
        <div className={styles.actions}>
          {liveUrl ? (
            <a href={liveUrl} target="_blank" rel="noreferrer" onClick={stopPropagation}>
              Live demo <span aria-hidden="true">↗</span>
            </a>
          ) : null}
          <a href={primaryHref} target="_blank" rel="noreferrer" onClick={stopPropagation}>
            {primaryLabel} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
