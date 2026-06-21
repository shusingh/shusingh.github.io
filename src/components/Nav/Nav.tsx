import type { MouseEvent } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { Seal } from '@/components/Seal/Seal';

import styles from './Nav.module.css';

const navItems = [
  { to: '/work', label: 'Work' },
  { to: '/projects', label: 'Projects' },
  { to: '/writing', label: 'Writing' },
  { to: '/about', label: 'About' },
  { to: '/now', label: 'Now' },
] as const;

function isPlainLeftClick(event: MouseEvent<HTMLAnchorElement>): boolean {
  return (
    event.button === 0 &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.shiftKey
  );
}

function scrollToPageTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}

export function Nav() {
  const location = useLocation();

  function handleSamePageClick(event: MouseEvent<HTMLAnchorElement>, to: string) {
    if (!isPlainLeftClick(event)) return;
    if (location.pathname !== to || location.search || location.hash) return;
    event.preventDefault();
    scrollToPageTop();
  }

  return (
    <nav className={styles.nav} aria-label="Primary navigation">
      <div className={styles.inner}>
        <Link
          className={styles.logo}
          to="/"
          aria-label="Shubham Singh home"
          onClick={(event) => handleSamePageClick(event, '/')}
        >
          <Seal char="墨" className={styles.logoSeal} />
          <span>Shubham Singh</span>
        </Link>
        <div className={styles.right}>
          <ul className={styles.links}>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
                  to={item.to}
                  onClick={(event) => handleSamePageClick(event, item.to)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <a
                className={styles.resume}
                href="/Shubham_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                aria-label="Resume (opens in new tab)"
              >
                Resume
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
