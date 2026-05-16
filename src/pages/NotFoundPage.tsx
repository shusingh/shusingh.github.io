import { Link } from 'react-router-dom';

import { SEO } from '@/components/SEO/SEO';

import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <section className={styles.page}>
      <SEO title="Not found" noIndex />
      <div className="container">
        <p className={styles.eyebrow}>404</p>
        <h1 className={styles.title}>That page does not exist.</h1>
        <Link className={styles.link} to="/">
          Return home →
        </Link>
      </div>
    </section>
  );
}
