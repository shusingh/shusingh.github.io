import { Link, useSearchParams } from 'react-router-dom';

import { SEO } from '@/components/SEO/SEO';
import { WorkCard } from '@/components/WorkCard/WorkCard';
import { workEntries } from '@/content/load';

import styles from './WorkIndexPage.module.css';

export function WorkIndexPage() {
  const [searchParams] = useSearchParams();
  const selectedTech = searchParams.get('tech');
  const techItems = Array.from(
    new Set(workEntries.flatMap(({ frontmatter }) => frontmatter.tech))
  ).sort((a, b) => a.localeCompare(b));
  const filteredEntries = selectedTech
    ? workEntries.filter(({ frontmatter }) => frontmatter.tech.includes(selectedTech))
    : workEntries;

  return (
    <>
      <SEO
        title="Work"
        description="Selected production case studies in agentic AI, distributed orchestration, and platform design at Amazon."
      />
      <section className={styles.page} aria-labelledby="work-index-title">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.eyebrow}>01 · Work</div>
          <h1 id="work-index-title" className={styles.title}>
            Case studies
          </h1>
          <p className={styles.intro}>
            Selected production work across agentic AI, distributed orchestration, and platform
            design. Each case study walks through the problem, the approach, and the metrics it
            moved.
          </p>
          {techItems.length > 0 ? (
            <nav className={styles.filters} aria-label="Filter case studies by technology">
              <Link
                className={`${styles.filter} ${selectedTech ? '' : styles.activeFilter}`}
                to="/work"
              >
                All
              </Link>
              {techItems.map((tech) => (
                <Link
                  key={tech}
                  className={`${styles.filter} ${
                    selectedTech === tech ? styles.activeFilter : ''
                  }`}
                  to={`/work?tech=${encodeURIComponent(tech)}`}
                >
                  {tech}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
        {filteredEntries.length === 0 ? (
          <p className={styles.empty}>
            {selectedTech ? `No case studies using ${selectedTech}.` : 'No case studies yet.'}
          </p>
        ) : (
          <div className={styles.grid}>
            {filteredEntries.map(({ frontmatter }) => (
              <WorkCard
                key={frontmatter.slug}
                to={`/work/${frontmatter.slug}`}
                eyebrow={frontmatter.eyebrow}
                title={frontmatter.title}
                description={frontmatter.description}
                tech={frontmatter.tech}
                stat={frontmatter.stat}
                diagram={frontmatter.diagram}
                variant={frontmatter.featured ? 'hero' : 'small'}
              />
            ))}
          </div>
        )}
      </div>
    </section>
    </>
  );
}
