import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import styled from 'styled-components';
import HeroSection from './components/HeroSection';

const LandingPageWrapper = styled.div`
  max-width: 1480px;
  padding: 0 3rem;
  scroll-behavior: smooth;
  margin: 0 auto;
`;

const LandingPageContainer = styled.div`
  display: flex;
  gap: 10rem;
  max-width: 75rem;
  margin: 0 auto;
  position: relative;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const LeftSectionContainer = styled.div`
  position: sticky;
  top: 0;
  height: fit-content;
  width: 20rem;
  align-self: flex-start;

  @media (max-width: 1024px) {
    position: relative;
    top: 0;
    width: 100%;
  }
`;

const RightSectionContainer = styled.div`
  flex: 1;
  min-width: 0;
  padding-top: 6rem;

  @media (max-width: 1024px) {
    padding-top: 0;
  }
`;

const SectionWrapper = styled.div`
  margin-bottom: 6rem;

  @media (max-width: 1024px) {
    margin-bottom: 4rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  display: none;

  @media (max-width: 1024px) {
    display: block;
  }
`;

export const LandingPage = () => {
  return (
    <LandingPageWrapper>
      <LandingPageContainer>
        <LeftSectionContainer>
          <HeroSection />
        </LeftSectionContainer>
        <RightSectionContainer>
          <SectionWrapper id="about" aria-labelledby="about-title">
            <SectionTitle id="about-title">About</SectionTitle>
            <About />
          </SectionWrapper>
          <SectionWrapper id="experience" aria-labelledby="experience-title">
            <SectionTitle id="experience-title">Experience</SectionTitle>
            <Experience />
          </SectionWrapper>
          <SectionWrapper id="projects" aria-labelledby="projects-title">
            <SectionTitle id="projects-title">Projects</SectionTitle>
            <Projects />
          </SectionWrapper>
        </RightSectionContainer>
      </LandingPageContainer>
    </LandingPageWrapper>
  );
};
