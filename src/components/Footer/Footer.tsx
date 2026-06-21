import { Link } from 'react-router-dom';

import { InkMark } from '@/components/InkMark/InkMark';

import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <p className={styles.statement}>
              Always happy to talk about <span>agentic systems</span>, distributed infra, or AI startups
              doing serious engineering work.
            </p>
          </div>
          <div className={styles.column}>
            <h2>Elsewhere</h2>
            <ul>
              <li>
                <a
                  href="https://github.com/shusingh"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub (opens in new tab)"
                >
                  GitHub <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/shusingh/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn (opens in new tab)"
                >
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a href="mailto:shubh.singh.dev@gmail.com">Email</a>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h2>Navigate</h2>
            <ul>
              <li>
                <Link to="/work">Work</Link>
              </li>
              <li>
                <Link to="/projects">Projects</Link>
              </li>
              <li>
                <Link to="/writing">Writing</Link>
              </li>
              <li>
                <Link to="/now">Now</Link>
              </li>
              <li>
                <a
                  href="/Shubham_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Resume (opens in new tab)"
                >
                  Resume <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© 2026 Shubham Singh · Built with care in Seattle</span>
          <span className={styles.colophon}>
            <InkMark className={styles.footMark} />
            Background: <span className={styles.colophonJp}>墨流し</span> suminagashi, Japanese ink
            marbling
          </span>
        </div>
      </div>
    </footer>
  );
}
