import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/Footer/Footer';
import { LoadingIntro } from '@/components/LoadingIntro/LoadingIntro';
import { Nav } from '@/components/Nav/Nav';

import styles from './SiteLayout.module.css';

export function SiteLayout() {
  return (
    <>
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
