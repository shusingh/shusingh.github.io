import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

interface SectionIndicatorProps {
  sections: {
    id: string;
    title: string;
  }[];
}

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
  gap: 0.5rem;
  font-size: ${(props) => (props.isActive ? '1.1rem' : '0.9rem')};
  color: ${(props) => (props.isActive ? 'var(--text-primary)' : 'var(--color-whiteAlpha-700)')};
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 0.25rem 0;
  width: fit-content;

  &:hover {
    color: var(--text-primary);
  }
`;

const IndicatorLine = styled.div<{ isActive: boolean }>`
  width: ${(props) => (props.isActive ? '1.5rem' : '0.5rem')};
  height: 1px;
  background-color: ${(props) => (props.isActive ? 'var(--text-primary)' : 'var(--color-whiteAlpha-700)')};
  transition: all 0.3s ease;
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
          <IndicatorLine isActive={activeSection === id} />
          {title}
        </IndicatorItem>
      ))}
    </IndicatorContainer>
  );
};
