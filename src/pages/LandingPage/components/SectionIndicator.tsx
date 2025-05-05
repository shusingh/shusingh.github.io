import React, { useEffect, useState } from 'react';
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

export const SectionIndicator: React.FC<SectionIndicatorProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('about');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-10% 0px -80% 0px',
        threshold: 0,
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
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
          {title}
        </IndicatorItem>
      ))}
    </IndicatorContainer>
  );
};
