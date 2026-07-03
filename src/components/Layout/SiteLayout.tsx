import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { BackToTop } from '@/components/BackToTop/BackToTop';
import { Footer } from '@/components/Footer/Footer';
import { FluidBackground } from '@/components/FluidBackground/FluidBackground';
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

    const BRUSH_SIZE = 10;
    let animationFrame = 0;
    let nextX = window.innerWidth / 2;
    let nextY = window.innerHeight * 0.22;
    let followerX = nextX;
    let followerY = nextY;
    let followerTargetX = nextX;
    let followerTargetY = nextY;
    let followerWidth = BRUSH_SIZE;
    let followerHeight = BRUSH_SIZE;
    let followerRadius = 999;
    let followerTargetWidth = followerWidth;
    let followerTargetHeight = followerHeight;
    let followerTargetRadius = followerRadius;
    let lastFollowerTime = performance.now();
    let lastPointerMove = performance.now();
    let followerIsInteractive = false;
    let followerFrame = 0;

    function writeCursorPosition() {
      root.style.setProperty('--cursor-x', `${nextX}px`);
      root.style.setProperty('--cursor-y', `${nextY}px`);
      root.style.setProperty('--cursor-spotlight-opacity', '1');
      animationFrame = 0;
    }

    function animateFollower(now: number) {
      const dt = Math.min((now - lastFollowerTime) / 1000, 0.05);
      const ease = 1 - Math.exp(-18 * dt);
      lastFollowerTime = now;
      const lagX = followerTargetX - followerX;
      const lagY = followerTargetY - followerY;
      followerX += lagX * ease;
      followerY += lagY * ease;

      if (followerIsInteractive) {
        // Ease into the pill that hugs the hovered element.
        followerWidth += (followerTargetWidth - followerWidth) * ease;
        followerHeight += (followerTargetHeight - followerHeight) * ease;
        followerRadius += (followerTargetRadius - followerRadius) * ease;
        root.style.setProperty('--cursor-follower-rotate', '0rad');
      } else {
        // Brush behaviour: the tip stretches along its direction of travel
        // (the lag distance is a smooth proxy for velocity), and blooms a
        // touch while resting, like ink soaking into the paper.
        const lag = Math.hypot(lagX, lagY);
        const stretch = Math.min(lag / 70, 1);
        const bloom = Math.min(Math.max((now - lastPointerMove - 900) / 2600, 0), 1) * 3;
        const base = BRUSH_SIZE + bloom;
        followerWidth = base * (1 + stretch * 1.2);
        followerHeight = base * Math.max(1 - stretch * 0.4, 0.55);
        followerRadius = 999;
        if (lag > 2) {
          root.style.setProperty('--cursor-follower-rotate', `${Math.atan2(lagY, lagX)}rad`);
        }
      }

      root.style.setProperty('--cursor-follower-x', `${followerX}px`);
      root.style.setProperty('--cursor-follower-y', `${followerY}px`);
      root.style.setProperty('--cursor-follower-width', `${followerWidth}px`);
      root.style.setProperty('--cursor-follower-height', `${followerHeight}px`);
      root.style.setProperty('--cursor-follower-radius', `${followerRadius}px`);
      followerFrame = window.requestAnimationFrame(animateFollower);
    }

    function setFollowerState(target: EventTarget | null) {
      const element = target instanceof Element ? target : null;
      const interactive = element?.closest<HTMLElement>(
        'a, button, input, textarea, select, [role="button"]'
      );
      const isInteractive = Boolean(interactive);

      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        const radius = Number.parseFloat(window.getComputedStyle(interactive).borderRadius);
        followerTargetX = rect.left + rect.width / 2;
        followerTargetY = rect.top + rect.height / 2;
        followerTargetWidth = rect.width + 10;
        followerTargetHeight = rect.height + 10;
        followerTargetRadius = radius || 6;
      } else {
        followerTargetX = nextX;
        followerTargetY = nextY;
      }

      if (isInteractive !== followerIsInteractive) {
        followerIsInteractive = isInteractive;
        root.style.setProperty(
          '--cursor-follower-bg',
          isInteractive ? 'var(--cursor-follower-active-bg)' : 'var(--cursor-follower-ink)'
        );
        root.style.setProperty(
          '--cursor-follower-border',
          isInteractive ? 'var(--accent-dim)' : 'transparent'
        );
      }

      // A reader's cursor parked over prose should not have a loud companion.
      const overProse = !isInteractive && Boolean(element?.closest('p, li, blockquote, pre'));
      root.style.setProperty('--cursor-follower-opacity', overProse ? '0.25' : '1');
      root.style.setProperty('--interactive-cursor', isInteractive ? 'none' : 'auto');
    }

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType !== 'mouse') return;
      nextX = event.clientX;
      nextY = event.clientY;
      lastPointerMove = performance.now();
      setFollowerState(event.target);
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(writeCursorPosition);
      }
      if (followerFrame === 0) {
        lastFollowerTime = performance.now();
        followerFrame = window.requestAnimationFrame(animateFollower);
      }
    }

    function hideSpotlight() {
      root.style.setProperty('--cursor-spotlight-opacity', '0');
      root.style.setProperty('--cursor-follower-opacity', '0');
    }

    function updateFollowerAfterScroll() {
      setFollowerState(document.elementFromPoint(nextX, nextY));
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', hideSpotlight);
    window.addEventListener('blur', hideSpotlight);
    window.addEventListener('scroll', updateFollowerAfterScroll, { passive: true });

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
      window.removeEventListener('scroll', updateFollowerAfterScroll);
      root.style.removeProperty('--cursor-x');
      root.style.removeProperty('--cursor-y');
      root.style.removeProperty('--cursor-spotlight-opacity');
      root.style.removeProperty('--cursor-follower-x');
      root.style.removeProperty('--cursor-follower-y');
      root.style.removeProperty('--cursor-follower-size');
      root.style.removeProperty('--cursor-follower-width');
      root.style.removeProperty('--cursor-follower-height');
      root.style.removeProperty('--cursor-follower-radius');
      root.style.removeProperty('--cursor-follower-rotate');
      root.style.removeProperty('--cursor-follower-bg');
      root.style.removeProperty('--cursor-follower-border');
      root.style.removeProperty('--cursor-follower-opacity');
      root.style.removeProperty('--interactive-cursor');
    };
  }, []);

  return null;
}

export function SiteLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      <ScrollToTop />
      <FluidBackground interactive={isHome} />
      <CursorSpotlight />
      <LoadingIntro />
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>
      <Nav />
      {/* Keyed on the route so each page plays a soft entrance. */}
      <main key={pathname} id="main-content" className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
