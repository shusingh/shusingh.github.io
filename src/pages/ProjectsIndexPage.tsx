import { Link, useSearchParams } from 'react-router-dom';

import { ProjectCard } from '@/components/ProjectCard/ProjectCard';
import { SEO } from '@/components/SEO/SEO';
import { projectEntries } from '@/content/load';
import type { ProjectEntry, ProjectKind } from '@/content/types';

import styles from './ProjectsIndexPage.module.css';

type KindFilter = ProjectKind | 'all';

function getKindFilter(value: string | null): KindFilter {
  if (value === 'personal' || value === 'contribution') return value;
  return 'all';
}

function kindPath(kind: KindFilter, selectedTag: string | null): string {
  const params = new URLSearchParams();
  if (kind !== 'all') params.set('kind', kind);
  if (selectedTag) params.set('tag', selectedTag);
  const suffix = params.toString();
  return suffix ? `/projects?${suffix}` : '/projects';
}

function tagPath(tag: string, selectedKind: KindFilter): string {
  const params = new URLSearchParams();
  if (selectedKind !== 'all') params.set('kind', selectedKind);
  params.set('tag', tag);
  return `/projects?${params.toString()}`;
}

function renderCard(entry: ProjectEntry, compact: boolean) {
  const { frontmatter } = entry;
  return (
    <ProjectCard
      key={frontmatter.slug}
      to={`/projects/${frontmatter.slug}`}
      title={frontmatter.title}
      description={frontmatter.description}
      kind={frontmatter.kind}
      year={frontmatter.year}
      tags={frontmatter.tags}
      link={frontmatter.link}
      repo={frontmatter.repo}
      liveUrl={frontmatter.liveUrl}
      upstream={frontmatter.upstream}
      prUrl={frontmatter.prUrl}
      prNumber={frontmatter.prNumber}
      status={frontmatter.status}
      stat={frontmatter.stat}
      compact={compact}
    />
  );
}

export function ProjectsIndexPage() {
  const [searchParams] = useSearchParams();
  const selectedKind = getKindFilter(searchParams.get('kind'));
  const selectedTag = searchParams.get('tag');
  const tags = Array.from(
    new Set(projectEntries.flatMap(({ frontmatter }) => frontmatter.tags))
  ).sort((a, b) => a.localeCompare(b));

  const filteredEntries = projectEntries.filter(({ frontmatter }) => {
    const kindMatches = selectedKind === 'all' || frontmatter.kind === selectedKind;
    const tagMatches = !selectedTag || frontmatter.tags.includes(selectedTag);
    return kindMatches && tagMatches;
  });
  const featuredEntries = filteredEntries.filter(({ frontmatter }) => frontmatter.featured);
  const restEntries = filteredEntries.filter(({ frontmatter }) => !frontmatter.featured);
  const restPersonal = restEntries.filter(({ frontmatter }) => frontmatter.kind === 'personal');
  const restContributions = restEntries.filter(
    ({ frontmatter }) => frontmatter.kind === 'contribution'
  );

  return (
    <>
      <SEO
        title="Projects"
        description="Open source contributions and side projects by Shubham Singh, including RAG infrastructure, distributed systems experiments, and developer tools."
      />
      <section className={styles.page} aria-labelledby="projects-index-title">
        <div className="container">
          <div className={styles.header}>
            <div className={styles.eyebrow}>02 · Projects</div>
            <h1 id="projects-index-title" className={styles.title}>
              Open source &amp; projects
            </h1>
            <p className={styles.intro}>
              Side projects and public contributions outside work. Some are reusable tools; others
              are workbench repos where I explore systems ideas in public.
            </p>
            <div className={styles.filterBlock}>
              <nav className={styles.filters} aria-label="Filter projects by kind">
                {[
                  ['all', 'All'],
                  ['personal', 'Personal'],
                  ['contribution', 'Open source'],
                ].map(([kind, label]) => (
                  <Link
                    key={kind}
                    className={`${styles.filter} ${
                      selectedKind === kind ? styles.activeFilter : ''
                    }`}
                    to={kindPath(kind as KindFilter, selectedTag)}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
              {tags.length > 0 ? (
                <nav className={styles.filters} aria-label="Filter projects by tag">
                  <Link
                    className={`${styles.filter} ${selectedTag ? '' : styles.activeFilter}`}
                    to={kindPath(selectedKind, null)}
                  >
                    All tags
                  </Link>
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      className={`${styles.filter} ${
                        selectedTag === tag ? styles.activeFilter : ''
                      }`}
                      to={tagPath(tag, selectedKind)}
                    >
                      #{tag}
                    </Link>
                  ))}
                </nav>
              ) : null}
            </div>
          </div>

          {filteredEntries.length === 0 ? (
            <p className={styles.empty}>No projects match this filter.</p>
          ) : (
            <>
              {featuredEntries.length > 0 ? (
                <section className={styles.subSection} aria-labelledby="featured-title">
                  <div className={styles.subSectionHeader}>
                    <h2 id="featured-title">Featured</h2>
                    <span>
                      {featuredEntries.length}{' '}
                      {featuredEntries.length === 1 ? 'pick' : 'picks'}
                    </span>
                  </div>
                  <div className={styles.featuredGrid}>
                    {featuredEntries.map((entry) => renderCard(entry, false))}
                  </div>
                </section>
              ) : null}

              {restPersonal.length > 0 ? (
                <section className={styles.subSection} aria-labelledby="projects-title">
                  <div className={styles.subSectionHeader}>
                    <h2 id="projects-title">Projects</h2>
                    <span>
                      {restPersonal.length} public{' '}
                      {restPersonal.length === 1 ? 'repo' : 'repos'}
                    </span>
                  </div>
                  <div className={styles.compactGrid}>
                    {restPersonal.map((entry) => renderCard(entry, true))}
                  </div>
                </section>
              ) : null}

              {restContributions.length > 0 ? (
                <section className={styles.subSection} aria-labelledby="open-source-title">
                  <div className={styles.subSectionHeader}>
                    <h2 id="open-source-title">Open source</h2>
                    <span>
                      {restContributions.length}{' '}
                      {restContributions.length === 1 ? 'open PR' : 'open PRs'}
                    </span>
                  </div>
                  <div className={styles.compactGrid}>
                    {restContributions.map((entry) => renderCard(entry, true))}
                  </div>
                </section>
              ) : null}
            </>
          )}
        </div>
      </section>
    </>
  );
}
