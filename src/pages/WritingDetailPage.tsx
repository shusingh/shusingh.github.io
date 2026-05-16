import { Link, useParams } from 'react-router-dom';

import { Prose } from '@/components/Prose/Prose';
import { SEO } from '@/components/SEO/SEO';
import {
  formatWritingDate,
  getAdjacent,
  getWritingBySlug,
  writingEntries,
} from '@/content/load';
import { SITE_ORIGIN } from '@/lib/site';

import { NotFoundPage } from './NotFoundPage';
import styles from './WritingDetailPage.module.css';

export function WritingDetailPage() {
  const { slug } = useParams<'slug'>();
  const entry = slug ? getWritingBySlug(slug) : undefined;

  if (!entry) {
    return <NotFoundPage />;
  }

  const { frontmatter, Component } = entry;
  const { prev, next } = getAdjacent(writingEntries, frontmatter.slug);

  return (
    <article className={styles.page}>
      <SEO
        title={frontmatter.title}
        description={frontmatter.excerpt}
        type="article"
        ogImage={`${SITE_ORIGIN}/og/writing-${frontmatter.slug}.png`}
      />
      <div className="container">
        <Link className={styles.backLink} to="/writing">
          <span aria-hidden="true">←</span> All writing
        </Link>
        <header className={styles.header}>
          <div className={styles.meta}>
            <span>{formatWritingDate(frontmatter.date)}</span>
            <span>{frontmatter.readTime}</span>
          </div>
          <h1 className={styles.title}>{frontmatter.title}</h1>
          <p className={styles.excerpt}>{frontmatter.excerpt}</p>
          {frontmatter.tags.length > 0 ? (
            <ul className={styles.tags}>
              {frontmatter.tags.map((tag) => (
                <li key={tag}>
                  <Link className={styles.tag} to={`/writing?tag=${encodeURIComponent(tag)}`}>
                    #{tag}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </header>
        <Prose>
          <Component />
        </Prose>
        {prev || next ? (
          <nav className={styles.nav} aria-label="Adjacent posts">
            {prev ? (
              <Link className={styles.navItem} to={`/writing/${prev.frontmatter.slug}`}>
                <span className={styles.navLabel}>← Newer</span>
                <span className={styles.navTitle}>{prev.frontmatter.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link className={`${styles.navItem} ${styles.next}`} to={`/writing/${next.frontmatter.slug}`}>
                <span className={styles.navLabel}>Older →</span>
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
