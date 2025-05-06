import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

interface SectionIndicatorProps {
  sections: {
    id: string;
    title: string;
  }[];
}

const rippleAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(3);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const IndicatorContainer = styled.div`
  position: sticky;
  top: 8rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 1rem;
  border-left: 1px solid var(--color-whiteAlpha-200);

  @media (max-width: 1024px) {
    display: none;
  }
`;

const IndicatorItem = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: ${(props) => (props.isActive ? '1.1rem' : '0.9rem')};
  color: ${(props) => (props.isActive ? 'var(--text-primary)' : 'var(--color-whiteAlpha-700)')};
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 0.25rem 0;
  width: fit-content;
  position: relative;

  &:hover {
    color: var(--text-primary);
  }
`;

const IndicatorDot = styled.div<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? 'var(--text-primary)' : 'var(--color-whiteAlpha-700)')};
  transition: all 0.3s ease;
  position: relative;

  ${IndicatorItem}:hover & {
    background-color: var(--text-primary);
  }
`;

const RippleWave = styled.div<{ isActive: boolean; delay: number }>`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? 'var(--text-primary)' : 'transparent')};
  animation: ${(props) => (props.isActive ? rippleAnimation : 'none')} 3.5s infinite;
  animation-delay: ${(props) => props.delay}s;
  opacity: 0;
  transform-origin: center;
`;

export const SectionIndicator: React.FC<SectionIndicatorProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('about');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const options = {
      rootMargin: '-30% 0px -30% 0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (isInitialMount.current) {
        const firstVisible = entries.find((entry) => entry.isIntersecting);
        if (firstVisible) {
          setActiveSection(firstVisible.target.id);
          isInitialMount.current = false;
          return;
        }
      }

      const mostVisibleEntry = entries.reduce(
        (mostVisible, entry) => {
          if (!mostVisible) return entry;
          const mostVisibleRatio = mostVisible.intersectionRatio;
          const currentRatio = entry.intersectionRatio;
          return currentRatio > mostVisibleRatio ? entry : mostVisible;
        },
        null as IntersectionObserverEntry | null
      );

      if (mostVisibleEntry && mostVisibleEntry.isIntersecting) {
        setActiveSection(mostVisibleEntry.target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observerRef.current?.observe(element);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <IndicatorContainer>
      {sections.map(({ id, title }) => (
        <IndicatorItem key={id} isActive={activeSection === id} onClick={() => scrollToSection(id)}>
          <IndicatorDot isActive={activeSection === id}>
            <RippleWave isActive={activeSection === id} delay={0} />
            <RippleWave isActive={activeSection === id} delay={1.2} />
            <RippleWave isActive={activeSection === id} delay={2.4} />
          </IndicatorDot>
          {title}
        </IndicatorItem>
      ))}
    </IndicatorContainer>
  );
};
