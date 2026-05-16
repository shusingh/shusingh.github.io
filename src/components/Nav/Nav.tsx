import { Link, NavLink } from 'react-router-dom';

import { useTheme } from '@/lib/theme';

import styles from './Nav.module.css';

const navItems = [
  { to: '/work', label: 'Work' },
  { to: '/writing', label: 'Writing' },
  { to: '/about', label: 'About' },
  { to: '/now', label: 'Now' },
] as const;

function SunIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function Nav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={styles.nav} aria-label="Primary navigation">
      <div className={styles.inner}>
        <Link className={styles.logo} to="/" aria-label="Shubham Singh home">
          Shubham Singh
        </Link>
        <div className={styles.right}>
          <ul className={styles.links}>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
                  to={item.to}
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
          <button
            className={styles.themeToggle}
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <span className={styles.sun}>
              <SunIcon />
            </span>
            <span className={styles.moon}>
              <MoonIcon />
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
