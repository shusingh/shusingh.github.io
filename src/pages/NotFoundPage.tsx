import { Link } from 'react-router-dom';

import { SEO } from '@/components/SEO/SEO';

import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <section className={styles.page}>
      <SEO title="Not found" noIndex />
      <div className="container">
        <div className={styles.inkblot} aria-hidden="true">
          墨
        </div>
        <p className={styles.eyebrow}>404 · page not found</p>
        <h1 className={styles.title}>The ink ran dry.</h1>
        <p className={styles.subtitle}>
          Whatever was here has washed off the paper. It may have moved, or it may never have
          existed; the ink keeps no records.
        </p>
        <div className={styles.actions}>
          <Link className={styles.link} to="/">
            Return home <span aria-hidden="true">→</span>
          </Link>
          <Link className={styles.link} to="/writing">
            Browse the essays <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
