import type { FallbackProps } from 'react-error-boundary';

import styles from './ErrorFallback.module.css';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message = error instanceof Error ? error.message : 'Something unexpected happened.';

  return (
    <main className={styles.shell}>
      <section className={styles.card} role="alert" aria-labelledby="error-title">
        <p className={styles.eyebrow}>Runtime error</p>
        <h1 id="error-title" className={styles.title}>
          This page failed to render.
        </h1>
        <p className={styles.message}>{message}</p>
        <button className={styles.button} type="button" onClick={resetErrorBoundary}>
          Try again
        </button>
      </section>
    </main>
  );
}
