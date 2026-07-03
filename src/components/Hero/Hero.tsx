import { Link } from 'react-router-dom';

import { PhotoFrame } from '@/components/PhotoFrame/PhotoFrame';
import { StatusCard } from '@/components/StatusCard/StatusCard';
import { writingEntries } from '@/content/load';

import styles from './Hero.module.css';

function ArrowIcon() {
  return (
    <svg className={styles.arrow} viewBox="0 0 12 12" aria-hidden="true">
      <path d="M3 3h6v6M3 9l6-6" />
    </svg>
  );
}

export function Hero() {
  const latest = writingEntries[0];
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.kanjiMotif} aria-hidden="true">
        墨流し
      </div>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <div className={styles.eyebrow}>SDE II · Amazon · Seattle</div>
            <h1 id="hero-title" className={styles.title}>
              Shubham <span className={styles.accent}>Singh</span>
            </h1>
            <p className={styles.role}>
              I build <strong>production agentic AI systems</strong> and the backend and
              full-stack infrastructure they run on, end to end on AWS.
            </p>
            <p className={styles.description}>
              Shipped: regulatory data pipelines processing 30M+ records a month,
              citation-grounded retrieval systems on Bedrock, and full-stack platforms used across
              three Amazon partner teams.
            </p>
            <div className={styles.ctas}>
              <a
                className={`${styles.btn} ${styles.btnPrimary}`}
                href="/Shubham_Resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                View resume
                <ArrowIcon />
              </a>
              <a
                className={`${styles.btn} ${styles.btnSecondary}`}
                href="mailto:shubh.singh.dev@gmail.com"
              >
                Get in touch
              </a>
            </div>
            {latest ? (
              <Link className={styles.latest} to={`/writing/${latest.frontmatter.slug}`}>
                Latest essay: {latest.frontmatter.title} <span aria-hidden="true">→</span>
              </Link>
            ) : null}
            <p className={styles.hint} aria-hidden="true">
              the ink responds to your cursor
            </p>
          </div>
          <div className={styles.right}>
            <PhotoFrame src="/shubham.jpg" alt="Shubham Singh at Lake Union, Seattle" />
            <StatusCard label="Currently">
              Leading frontend and backend architecture for AI-assisted compliance launch workflows
              at Amazon.
            </StatusCard>
          </div>
        </div>
      </div>
    </section>
  );
}
