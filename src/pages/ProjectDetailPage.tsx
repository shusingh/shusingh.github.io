import { Link, useParams } from 'react-router-dom';

import { Prose } from '@/components/Prose/Prose';
import { SEO } from '@/components/SEO/SEO';
import { WorkDiagram } from '@/components/WorkDiagram/WorkDiagram';
import { getAdjacent, getProjectBySlug, projectEntries } from '@/content/load';
import type { ProjectKind, ProjectStatus } from '@/content/types';
import { SITE_ORIGIN } from '@/lib/site';

import { NotFoundPage } from './NotFoundPage';
import styles from './ProjectDetailPage.module.css';

const KIND_LABEL: Record<ProjectKind, string> = {
  personal: 'Personal project',
  contribution: 'Open source contribution',
};

const STATUS_LABEL: Record<ProjectStatus, string> = {
  active: 'Active',
  merged: 'Merged',
  open: 'Open',
  closed: 'Closed',
  released: 'Released',
  wip: 'In progress',
};

export function ProjectDetailPage() {
  const { slug } = useParams<'slug'>();
  const entry = slug ? getProjectBySlug(slug) : undefined;

  if (!entry) {
    return <NotFoundPage />;
  }

  const { frontmatter, Component } = entry;
  const { prev, next } = getAdjacent(projectEntries, frontmatter.slug);

  return (
    <article className={styles.page}>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        type="article"
        ogImage={`${SITE_ORIGIN}/og/project-${frontmatter.slug}.png`}
      />
      <div className="container">
        <Link className={styles.backLink} to="/projects">
          <span aria-hidden="true">←</span> All projects
        </Link>
        <header className={styles.header}>
          <div className={styles.eyebrow}>{KIND_LABEL[frontmatter.kind]}</div>
          <h1 className={styles.title}>{frontmatter.title}</h1>
          <p className={styles.description}>{frontmatter.description}</p>
          {frontmatter.diagram ? (
            <div className={styles.diagramBox}>
              <WorkDiagram {...frontmatter.diagram} />
            </div>
          ) : null}
          <div className={styles.meta}>
            <ul className={styles.tags}>
              {frontmatter.tags.map((tag) => (
                <li key={tag}>
                  <Link className={styles.tag} to={`/projects?tag=${encodeURIComponent(tag)}`}>
                    #{tag}
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.sideMeta}>
              <span>{frontmatter.year}</span>
              {frontmatter.status ? <span>{STATUS_LABEL[frontmatter.status]}</span> : null}
              {frontmatter.upstream ? <span>{frontmatter.upstream}</span> : null}
              {frontmatter.prUrl ? (
                <a href={frontmatter.prUrl} target="_blank" rel="noreferrer">
                  View PR
                  {frontmatter.prNumber ? ` #${frontmatter.prNumber}` : ''}{' '}
                  <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <a href={frontmatter.repo ?? frontmatter.link} target="_blank" rel="noreferrer">
                  View repo <span aria-hidden="true">↗</span>
                </a>
              )}
              {frontmatter.liveUrl ? (
                <a href={frontmatter.liveUrl} target="_blank" rel="noreferrer">
                  Live demo <span aria-hidden="true">↗</span>
                </a>
              ) : null}
              {frontmatter.pypiUrl ? (
                <a href={frontmatter.pypiUrl} target="_blank" rel="noreferrer">
                  PyPI package <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </div>
          </div>
          {frontmatter.stat ? (
            <div className={styles.stat}>
              <span className={styles.statNumber}>{frontmatter.stat.number}</span>
              <span className={styles.statLabel}>{frontmatter.stat.label}</span>
            </div>
          ) : null}
        </header>
        <Prose>
          <Component />
        </Prose>
        {prev || next ? (
          <nav className={styles.nav} aria-label="Adjacent projects">
            {prev ? (
              <Link className={styles.navItem} to={`/projects/${prev.frontmatter.slug}`}>
                <span className={styles.navLabel}>← Previous</span>
                <span className={styles.navTitle}>{prev.frontmatter.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                className={`${styles.navItem} ${styles.next}`}
                to={`/projects/${next.frontmatter.slug}`}
              >
                <span className={styles.navLabel}>Next →</span>
                <span className={styles.navTitle}>{next.frontmatter.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        ) : null}
      </div>
    </article>
  );
}
