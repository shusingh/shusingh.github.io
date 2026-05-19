import { PhotoFrame } from '@/components/PhotoFrame/PhotoFrame';
import { StatusCard } from '@/components/StatusCard/StatusCard';

import styles from './Hero.module.css';

function ArrowIcon() {
  return (
    <svg className={styles.arrow} viewBox="0 0 12 12" aria-hidden="true">
      <path d="M3 3h6v6M3 9l6-6" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className="container">
        <div className={styles.grid}>
          <div>
            <div className={styles.eyebrow}>SDE II · Amazon · Seattle</div>
            <h1 id="hero-title" className={styles.title}>
              Shubham <span className={styles.accent}>Singh</span>
            </h1>
            <p className={styles.role}>
              I build <strong>production software end-to-end</strong>: backend services,
              full-stack platforms, and (currently) agentic AI systems on AWS.
            </p>
            <p className={styles.description}>
              Previously shipped: regulatory data pipelines processing 30M+ records a month,
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
          </div>
          <div className={styles.right}>
            <PhotoFrame src="/shubham.jpg" alt="Shubham Singh at Lake Union, Seattle" />
            <StatusCard label="Currently">
              Leading frontend architecture for ZeroTouch, the control launch platform that
              coordinates ownership, review status, blockers, and launch artifacts across partner
              teams so 2,000+ controls can move without spreadsheet-driven handoffs.
            </StatusCard>
          </div>
        </div>
      </div>
    </section>
  );
}
