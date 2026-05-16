import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Footer } from '@/components/Footer/Footer';
import { LoadingIntro } from '@/components/LoadingIntro/LoadingIntro';
import { Nav } from '@/components/Nav/Nav';

import styles from './SiteLayout.module.css';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, search]);

  return null;
}

export function SiteLayout() {
  return (
    <>
      <ScrollToTop />
      <LoadingIntro />
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>
      <Nav />
      <main id="main-content" className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
