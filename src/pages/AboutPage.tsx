import { SEO } from '@/components/SEO/SEO';

import styles from './AboutPage.module.css';

export function AboutPage() {
  return (
    <>
      <SEO
        title="About"
        description="Shubham Singh, SDE II at Amazon, working on multi-agent systems, compliance orchestration, and production AI infrastructure."
      />
      <section className={styles.page} aria-labelledby="about-title">
        <div className="container">
          <header className={styles.header}>
            <div className={styles.eyebrow}>About</div>
            <h1 id="about-title" className={styles.title}>
              Shubham Singh
            </h1>
            <p className={styles.lede}>
              <strong>SDE II at Amazon, Seattle.</strong> I build production agentic AI systems and
              the distributed infrastructure they run on.
            </p>
          </header>

          <div className={styles.body}>
            <p>
              I spend most of my time on production AI and compliance infrastructure at Amazon:
              citation-grounded Q&amp;A, hybrid retrieval over compliance knowledge, and operator
              surfaces for control launch workflows. Before that I shipped large-scale compliance
              orchestration: the EU DSA pipeline, a compliance testing automation platform, and
              ZeroTouch, the control launch platform I led across three partner teams.
            </p>
            <p>
              What I actually care about is the production path. Most agentic-system talk online is
              demos that fall over at the first edge case. The interesting parts to me are the boring
              ones: idempotency, audit trails, retry semantics, the schema of human feedback. The
              stuff that turns a flashy notebook into something a compliance team can actually
              trust.
            </p>
            <p>
              My day to day is <strong>Java</strong> for AWS backend infrastructure,{' '}
              <strong>Python</strong> for agents and ML work, and <strong>TypeScript</strong> for
              frontends and tooling. I write <strong>Go</strong> on side projects. I'm comfortable
              owning features end to end from HLD through rollout, sometimes as the sole HLD author
              for cross-team programs.
            </p>
            <p>
              Outside work I'm at the gym at 5 AM, doing street photography on a Fujifilm X100VI, or
              somewhere in a non-fiction stack. Lately: Taoist philosophy and re-reading Kleppmann.
            </p>
            <p>
              If you're building serious AI infrastructure and looking for engineers who care about
              the production path, <a href="mailto:shubh.singh.dev@gmail.com">get in touch</a>.
            </p>
          </div>

          <h2 className={styles.sectionTitle}>The facts</h2>
          <dl className={styles.factList}>
            <dt className={styles.factLabel}>Role</dt>
            <dd className={styles.factValue}>SDE II, Amazon · Seattle</dd>

            <dt className={styles.factLabel}>Working on</dt>
            <dd className={styles.factValue}>
              Production AI systems for compliance search, review, and launch workflows
            </dd>

            <dt className={styles.factLabel}>Stack</dt>
            <dd className={styles.factValue}>
              Java · Python · TypeScript · Go · AWS (Bedrock, Step Functions, OpenSearch, Lambda)
            </dd>

            <dt className={styles.factLabel}>Off-hours</dt>
            <dd className={styles.factValue}>
              5 AM gym · film photography (Fujifilm X100VI) · Taoist philosophy
            </dd>

            <dt className={styles.factLabel}>Resume</dt>
            <dd className={styles.factValue}>
              <a
                href="/Shubham_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                aria-label="Resume PDF (opens in new tab)"
              >
                Shubham_Resume.pdf <span aria-hidden="true">↗</span>
              </a>
            </dd>
          </dl>

          <h2 className={styles.sectionTitle}>Photography</h2>
          <p className={styles.body}>
            I shoot mostly film, mostly on the Fujifilm X100VI. A rotating selection lives below;
            real images will replace these placeholders when I get around to scanning the last few
            rolls.
          </p>
          <div className={styles.photoGrid} aria-label="Photography placeholders">
            <div className={styles.photoCell} role="img" aria-label="Photo placeholder" />
            <div className={styles.photoCell} role="img" aria-label="Photo placeholder" />
            <div className={styles.photoCell} role="img" aria-label="Photo placeholder" />
            <div className={styles.photoCell} role="img" aria-label="Photo placeholder" />
            <div className={styles.photoCell} role="img" aria-label="Photo placeholder" />
            <div className={styles.photoCell} role="img" aria-label="Photo placeholder" />
          </div>
          <p className={styles.photoCaption}>Placeholders · real frames to follow</p>
        </div>
      </section>
    </>
  );
}
