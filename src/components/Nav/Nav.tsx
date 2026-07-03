import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { InkMark } from '@/components/InkMark/InkMark';
import { projectEntries } from '@/content/load';

import styles from './Nav.module.css';

/* Projects sits between Work and Writing as a dropdown, not a plain link. */
const navItemsBeforeProjects = [{ to: '/work', label: 'Work' }] as const;
const navItemsAfterProjects = [
  { to: '/writing', label: 'Writing' },
  { to: '/about', label: 'About' },
  { to: '/now', label: 'Now' },
] as const;

/* One Line leads the menu; the rest keep the projects-page order. */
const liveProjects = projectEntries
  .filter((entry) => entry.frontmatter.liveUrl)
  .sort(
    (a, b) =>
      Number(b.frontmatter.slug === 'one-line') - Number(a.frontmatter.slug === 'one-line')
  );

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

function ProjectsDropdown() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLLIElement>(null);

  // Navigating anywhere closes the menu.
  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const onProjectsPage = location.pathname.startsWith('/projects');

  return (
    <li className={styles.dropdownRoot} ref={rootRef}>
      <button
        type="button"
        className={
          onProjectsPage || open ? `${styles.link} ${styles.active}` : styles.link
        }
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        Projects
        <span aria-hidden="true" className={open ? `${styles.chev} ${styles.chevOpen}` : styles.chev}>
          ▾
        </span>
      </button>
      {open ? (
        <ul className={styles.dropdown} role="menu" aria-label="Projects">
          <li role="none">
            <Link role="menuitem" className={styles.dropdownItem} to="/projects">
              All projects
              <span aria-hidden="true">→</span>
            </Link>
          </li>
          <li role="none" aria-hidden="true" className={styles.dropdownRule} />
          <li role="none" className={styles.dropdownLabel}>
            Live
          </li>
          {liveProjects.map((entry) => (
            <li role="none" key={entry.frontmatter.slug}>
              <a
                role="menuitem"
                className={styles.dropdownItem}
                href={entry.frontmatter.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                {entry.frontmatter.title}
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
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
          <InkMark className={styles.logoMark} />
          <span>Shubham Singh</span>
        </Link>
        <div className={styles.right}>
          <ul className={styles.links}>
            {navItemsBeforeProjects.map((item) => (
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
            <ProjectsDropdown />
            {navItemsAfterProjects.map((item) => (
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
