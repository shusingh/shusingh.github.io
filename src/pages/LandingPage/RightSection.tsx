import styled from 'styled-components';
import { About } from './components/About';
import { ResumeCard } from './components/ResumeCard';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Projects } from './components/Projects';

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
  font-family: var(--font-mono);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  display: none;

  @media (max-width: 1024px) {
    display: block;
  }
`;

export const RightSection = () => {
  return (
    <RightSectionContainer>
      <SectionWrapper id="about" aria-labelledby="about-title">
        <SectionTitle id="about-title">About</SectionTitle>
        <About />
        <ResumeCard />
      </SectionWrapper>
      <SectionWrapper id="skills" aria-labelledby="skills-title">
        <SectionTitle id="skills-title">Skills</SectionTitle>
        <Skills />
      </SectionWrapper>
      <SectionWrapper id="experience" aria-labelledby="experience-title">
        <SectionTitle id="experience-title">Experience</SectionTitle>
        <Experience />
      </SectionWrapper>
      <SectionWrapper id="education" aria-labelledby="education-title">
        <SectionTitle id="education-title">Education</SectionTitle>
        <Education />
      </SectionWrapper>
      <SectionWrapper id="projects" aria-labelledby="projects-title">
        <SectionTitle id="projects-title">Projects</SectionTitle>
        <Projects />
      </SectionWrapper>
    </RightSectionContainer>
  );
};
