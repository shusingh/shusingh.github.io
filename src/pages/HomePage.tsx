import { Link } from 'react-router-dom';

import { Hero } from '@/components/Hero/Hero';
import { NowCard } from '@/components/NowCard/NowCard';
import { ProjectCard } from '@/components/ProjectCard/ProjectCard';
import { SEO } from '@/components/SEO/SEO';
import { Section } from '@/components/Section/Section';
import { WorkCard } from '@/components/WorkCard/WorkCard';
import { WritingItem } from '@/components/WritingItem/WritingItem';
import { formatWritingDate, projectEntries, workEntries, writingEntries } from '@/content/load';

import styles from './HomePage.module.css';

export function HomePage() {
  const featuredWork = workEntries.filter((entry) => entry.frontmatter.featured).slice(0, 3);
  const [primaryWork, ...secondaryWork] = featuredWork;
  const featuredProjects = projectEntries.filter((entry) => entry.frontmatter.featured).slice(0, 3);
  const latestWriting = writingEntries.slice(0, 3);

  return (
    <>
      <SEO />
      <Hero />

      <Section id="work" num="01" title="Featured work" meta="Selected projects · 2024–2026">
        <div className={styles.workGrid}>
          {primaryWork ? (
            <WorkCard
              to={`/work/${primaryWork.frontmatter.slug}`}
              eyebrow={primaryWork.frontmatter.eyebrow}
              title={primaryWork.frontmatter.title}
              description={primaryWork.frontmatter.description}
              tech={primaryWork.frontmatter.tech}
              stat={primaryWork.frontmatter.stat}
              diagram={primaryWork.frontmatter.diagram}
              linkLabel="Read the case study"
            />
          ) : null}

          {secondaryWork.length > 0 ? (
            <div className={styles.workRow}>
              {secondaryWork.map(({ frontmatter }) => (
                <WorkCard
                  key={frontmatter.slug}
                  variant="small"
                  to={`/work/${frontmatter.slug}`}
                  eyebrow={frontmatter.eyebrow}
                  title={frontmatter.title}
                  description={frontmatter.description}
                  tech={frontmatter.tech}
                  stat={frontmatter.stat}
                  diagram={frontmatter.diagram}
                />
              ))}
            </div>
          ) : null}
        </div>
        <div className={styles.sectionFooter}>
          <Link to="/work">
            View all work <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>

      <Section
        id="projects"
        num="02"
        title="Open source & projects"
        meta="Public work outside work"
      >
        <div className={styles.projectsGrid}>
          {featuredProjects.map(({ frontmatter }) => (
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
            />
          ))}
        </div>
        <div className={styles.sectionFooter}>
          <Link to="/projects">
            View all projects <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>

      <Section id="writing" num="03" title="Writing" meta="Notes on production systems">
        <div className={styles.writingGrid}>
          {latestWriting.map(({ frontmatter }) => (
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
        <div className={styles.sectionFooter}>
          <Link to="/writing">
            All writing <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>

      <Section id="now" num="04" title="Now" meta="What I'm focused on">
        <NowCard
          headingPrefix="What I'm"
          headingAccent="working on"
          date="May 2026 · Seattle"
          entries={[
            {
              label: 'Building',
              value:
                'Citation-grounded compliance Q&A and operator surfaces for control launch workflows at Amazon.',
            },
            {
              label: 'Learning',
              value:
                'DSPy and structured prompt optimization, especially where it beats hand-tuned templates.',
            },
            {
              label: 'Reading',
              value: (
                <>
                  <span className="muted">Currently:</span> <em>The Courage to Be Disliked</em> ·{' '}
                  <em>Designing Data-Intensive Applications</em> (re-read)
                </>
              ),
            },
            {
              label: 'Outside work',
              value: (
                <span className="muted">
                  5 AM gym · film photography (Fujifilm X100VI) · Taoist philosophy
                </span>
              ),
            },
          ]}
          footerLink={{ to: '/now', label: 'Full /now page' }}
        />
      </Section>
    </>
  );
}
