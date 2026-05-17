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

function CursorSpotlight() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');

    if (reducedMotion.matches || coarsePointer.matches) {
      root.style.setProperty('--cursor-spotlight-opacity', '0');
      return undefined;
    }

    let animationFrame = 0;
    let nextX = window.innerWidth / 2;
    let nextY = window.innerHeight * 0.22;
    let followerX = nextX;
    let followerY = nextY;
    let followerFrame = 0;

    function writeCursorPosition() {
      root.style.setProperty('--cursor-x', `${nextX}px`);
      root.style.setProperty('--cursor-y', `${nextY}px`);
      root.style.setProperty('--cursor-spotlight-opacity', '1');
      root.style.setProperty('--cursor-follower-opacity', '1');
      animationFrame = 0;
    }

    function animateFollower() {
      followerX += (nextX - followerX) * 0.2;
      followerY += (nextY - followerY) * 0.2;
      root.style.setProperty('--cursor-follower-x', `${followerX}px`);
      root.style.setProperty('--cursor-follower-y', `${followerY}px`);
      followerFrame = window.requestAnimationFrame(animateFollower);
    }

    function setFollowerState(target: EventTarget | null) {
      const element = target instanceof Element ? target : null;
      const isInteractive = Boolean(
        element?.closest('a, button, input, textarea, select, [role="button"]')
      );
      root.style.setProperty('--cursor-follower-size', isInteractive ? '34px' : '18px');
      root.style.setProperty('--interactive-cursor', isInteractive ? 'none' : 'auto');
    }

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType !== 'mouse') return;
      nextX = event.clientX;
      nextY = event.clientY;
      setFollowerState(event.target);
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(writeCursorPosition);
      }
      if (followerFrame === 0) {
        followerFrame = window.requestAnimationFrame(animateFollower);
      }
    }

    function hideSpotlight() {
      root.style.setProperty('--cursor-spotlight-opacity', '0');
      root.style.setProperty('--cursor-follower-opacity', '0');
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', hideSpotlight);
    window.addEventListener('blur', hideSpotlight);

    return () => {
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }
      if (followerFrame !== 0) {
        window.cancelAnimationFrame(followerFrame);
      }
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', hideSpotlight);
      window.removeEventListener('blur', hideSpotlight);
      root.style.removeProperty('--cursor-x');
      root.style.removeProperty('--cursor-y');
      root.style.removeProperty('--cursor-spotlight-opacity');
      root.style.removeProperty('--cursor-follower-x');
      root.style.removeProperty('--cursor-follower-y');
      root.style.removeProperty('--cursor-follower-size');
      root.style.removeProperty('--cursor-follower-opacity');
      root.style.removeProperty('--interactive-cursor');
    };
  }, []);

  return null;
}

export function SiteLayout() {
  return (
    <>
      <ScrollToTop />
      <CursorSpotlight />
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
