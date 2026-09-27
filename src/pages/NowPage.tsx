import type { ReactNode } from 'react';

import { SEO } from '@/components/SEO/SEO';
import { NOW_DATE } from '@/lib/site';

import styles from './NowPage.module.css';

interface NowEntry {
  label: string;
  value: ReactNode;
}

const entries: NowEntry[] = [
  {
    label: 'Building',
    value: (
      <p>
        Taking the compliance agent at Amazon from answering to acting: tools over the knowledge
        base and data catalog, downstream MCP servers, and human approval on every change.
      </p>
    ),
  },
  {
    label: 'Shipping',
    value: (
      <p>
        <strong>ComplianceIQ</strong> releases, each gated by a 500+ case eval harness covering
        grounding, citation correctness, and refusal behavior, plus A2A so other teams' agents
        can call ours.
      </p>
    ),
  },
  {
    label: 'Learning',
    value: (
      <p>
        DSPy and structured prompt optimization. Specifically, where it beats hand-tuned templates
        and where the abstraction gets in the way of debuggability.
      </p>
    ),
  },
  {
    label: 'Reading',
    value: (
      <ul>
        <li>
          <em>The Courage to Be Disliked</em> <span className="muted">by Kishimi &amp; Koga</span>
        </li>
        <li>
          <em>Designing Data-Intensive Applications</em>{' '}
          <span className="muted">by Kleppmann (re-read)</span>
        </li>
        <li>
          <em>The Way of Chuang Tzu</em> <span className="muted">by Merton</span>
        </li>
      </ul>
    ),
  },
  {
    label: 'Watching',
    value: (
      <p>
        The Bedrock AgentCore + Strands ecosystem closely, especially where AWS lands the
        primitives versus where it leaves room for framework competition.
      </p>
    ),
  },
  {
    label: 'Outside work',
    value: (
      <ul>
        <li>5 AM gym, four days a week</li>
        <li>Street photography on the Fujifilm X100VI</li>
        <li>Taoist philosophy, currently reading Chuang Tzu</li>
      </ul>
    ),
  },
];

export function NowPage() {
  return (
    <>
      <SEO
        title="Now"
        description={`What Shubham Singh is working on, learning, and reading in ${NOW_DATE}.`}
      />
      <section className={styles.page} aria-labelledby="now-title">
        <div className="container">
          <header className={styles.header}>
            <div className={styles.eyebrow}>Now</div>
            <h1 id="now-title" className={styles.title}>
              What I'm <span className={styles.accent}>working on</span>
            </h1>
            <div className={styles.date}>{NOW_DATE}</div>
            <p className={styles.lede}>
              A snapshot of what's holding my attention right now: current work, what I'm reading,
              what I'm trying to learn. Inspired by{' '}
              <a href="https://nownownow.com/about" target="_blank" rel="noreferrer">
                Derek Sivers' /now page
              </a>{' '}
              convention.
            </p>
          </header>

          <div className={styles.list}>
            {entries.map((entry) => (
              <div key={entry.label} className={styles.entry}>
                <div className={styles.label}>{entry.label}</div>
                <div className={styles.body}>{entry.value}</div>
              </div>
            ))}
          </div>

          <p className={styles.footer}>Last updated {NOW_DATE.split(' · ')[0]}</p>
        </div>
      </section>
    </>
  );
}
