import { Link, useSearchParams } from 'react-router-dom';

import { SEO } from '@/components/SEO/SEO';
import { WritingItem } from '@/components/WritingItem/WritingItem';
import { formatWritingDate, writingEntries } from '@/content/load';

import styles from './WritingIndexPage.module.css';

export function WritingIndexPage() {
  const [searchParams] = useSearchParams();
  const selectedTag = searchParams.get('tag');
  const tags = Array.from(
    new Set(writingEntries.flatMap(({ frontmatter }) => frontmatter.tags))
  ).sort((a, b) => a.localeCompare(b));
  const filteredEntries = selectedTag
    ? writingEntries.filter(({ frontmatter }) => frontmatter.tags.includes(selectedTag))
    : writingEntries;

  return (
    <>
      <SEO
        title="Writing"
        description="Working notes on AI infrastructure, distributed systems, retrieval, and production engineering. Long-form, no listicles."
      />
      <section className={styles.page} aria-labelledby="writing-index-title">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.eyebrow}>02 · Writing</div>
          <h1 id="writing-index-title" className={styles.title}>
            Notes on production systems
          </h1>
          <p className={styles.intro}>
            Working notes on AI infrastructure, distributed systems, retrieval, orchestration,
            and the engineering choices that make software reliable. Long-form, no listicles.
          </p>
          {tags.length > 0 ? (
            <nav className={styles.filters} aria-label="Filter writing by tag">
              <Link
                className={`${styles.filter} ${selectedTag ? '' : styles.activeFilter}`}
                to="/writing"
                aria-current={selectedTag ? undefined : 'true'}
              >
                All
              </Link>
              {tags.map((tag) => {
                const isActive = selectedTag === tag;
                const href = isActive ? '/writing' : `/writing?tag=${encodeURIComponent(tag)}`;
                return (
                  <Link
                    key={tag}
                    className={`${styles.filter} ${isActive ? styles.activeFilter : ''}`}
                    to={href}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    #{tag}
                  </Link>
                );
              })}
            </nav>
          ) : null}
        </div>
        {filteredEntries.length === 0 ? (
          <p className={styles.empty}>
            {selectedTag ? `No posts tagged #${selectedTag}.` : 'Nothing published yet.'}
          </p>
        ) : (
          <div className={styles.list}>
            {filteredEntries.map(({ frontmatter }) => (
              <WritingItem
                key={frontmatter.slug}
                to={`/writing/${frontmatter.slug}`}
                date={formatWritingDate(frontmatter.date)}
                title={frontmatter.title}
                excerpt={frontmatter.excerpt}
                readTime={frontmatter.readTime}
              />
            ))}
          </div>
        )}
      </div>
    </section>
    </>
  );
}
