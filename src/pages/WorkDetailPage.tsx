import { Link, useParams } from 'react-router-dom';

import { Prose } from '@/components/Prose/Prose';
import { SEO } from '@/components/SEO/SEO';
import { WorkDiagram } from '@/components/WorkDiagram/WorkDiagram';
import { getAdjacent, getWorkBySlug, workEntries } from '@/content/load';
import { SITE_ORIGIN } from '@/lib/site';

import { NotFoundPage } from './NotFoundPage';
import styles from './WorkDetailPage.module.css';

export function WorkDetailPage() {
  const { slug } = useParams<'slug'>();
  const entry = slug ? getWorkBySlug(slug) : undefined;

  if (!entry) {
    return <NotFoundPage />;
  }

  const { frontmatter, Component } = entry;
  const { prev, next } = getAdjacent(workEntries, frontmatter.slug);

  return (
    <article className={styles.page}>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        type="article"
        ogImage={`${SITE_ORIGIN}/og/work-${frontmatter.slug}.png`}
      />
      <div className="container">
        <Link className={styles.backLink} to="/work">
          <span aria-hidden="true">←</span> All work
        </Link>
        <header className={styles.header}>
          <div className={styles.eyebrow}>{frontmatter.eyebrow}</div>
          <h1 className={styles.title}>{frontmatter.title}</h1>
          <p className={styles.description}>{frontmatter.description}</p>
          {frontmatter.diagram ? (
            <div className={styles.diagramBox}>
              <WorkDiagram {...frontmatter.diagram} />
            </div>
          ) : null}
          <div className={styles.meta}>
            <ul className={styles.tags}>
              {frontmatter.tech.map((item) => (
                <li key={item}>
                  <Link className={styles.tag} to={`/work?tech=${encodeURIComponent(item)}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            {frontmatter.stat ? (
              <div className={styles.stat}>
                <span className={styles.statNumber}>{frontmatter.stat.number}</span>
                <span className={styles.statLabel}>{frontmatter.stat.label}</span>
              </div>
            ) : null}
          </div>
        </header>
        <Prose>
          <Component />
        </Prose>
        {prev || next ? (
          <nav className={styles.nav} aria-label="Adjacent case studies">
            {prev ? (
              <Link className={styles.navItem} to={`/work/${prev.frontmatter.slug}`}>
                <span className={styles.navLabel}>← Previous</span>
                <span className={styles.navTitle}>{prev.frontmatter.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link className={`${styles.navItem} ${styles.next}`} to={`/work/${next.frontmatter.slug}`}>
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
