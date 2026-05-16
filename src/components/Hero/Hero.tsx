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
              I build <strong>production agentic AI systems</strong> and distributed infrastructure on
              AWS.
            </p>
            <p className={styles.description}>
              Leading ZeroTouch platform work for compliance control launches: config-driven
              workflows, role-gated review, artifact orchestration, and operational paths built for
              thousands of launches.
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
                href="mailto:ksingh.shubh@gmail.com"
              >
                Get in touch
              </a>
            </div>
          </div>
          <div className={styles.right}>
            <PhotoFrame src="/shubham.jpg" alt="Shubham Singh at Lake Union, Seattle" />
            <StatusCard label="Currently">
              Building the platform Amazon teams use to launch compliance controls: guided workflows,
              review gates, reusable evidence, and recovery paths when a launch needs to change
              midstream.
            </StatusCard>
          </div>
        </div>
      </div>
    </section>
  );
}
