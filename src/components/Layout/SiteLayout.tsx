import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/Footer/Footer';
import { Nav } from '@/components/Nav/Nav';

import styles from './SiteLayout.module.css';

export function SiteLayout() {
  return (
    <>
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
