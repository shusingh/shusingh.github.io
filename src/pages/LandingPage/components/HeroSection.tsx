import { ABOUT_SECTION_TEXT, SOCIAL_LINKS } from '@/constants';
import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FiDownload } from 'react-icons/fi';
import { SectionIndicator } from './SectionIndicator';

const sections = [
  { id: 'about', title: 'About' },
  { id: 'skills', title: 'Skills' },
  { id: 'experience', title: 'Experience' },
  { id: 'education', title: 'Education' },
  { id: 'projects', title: 'Projects' },
];

const HeroSectionContainer = styled.div`
  padding-top: 6rem;
  text-align: left;
  width: 43%;
  min-width: 24rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  opacity: 0;
  animation: fadeIn 1s ease forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 1024px) {
    width: 100%;
    min-height: auto;
    padding: 2rem 0;
  }

  h1 {
    font-family: var(--font-mono);
    font-size: 3rem;
    font-weight: 600;
    margin: 0;
    color: var(--text-primary);

    @media (max-width: 1024px) {
      font-size: 2.5rem;
    }
  }
  p {
    color: var(--color-whiteAlpha-700);
    margin: 0.5rem 0;
    font-family: var(--font-mono);
    font-size: 0.9rem;
  }
  p:first-of-type {
    color: var(--text-primary);
  }
`;

const Tagline = styled.p`
  color: var(--color-whiteAlpha-700);
  font-style: italic;
  margin-top: 0.5rem;
`;

const SocialLinksContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  padding-bottom: 2rem;

  @media (max-width: 1024px) {
    margin-top: 1.5rem;
    padding-bottom: 1rem;
  }
`;

const SocialLink = styled.a`
  color: var(--color-whiteAlpha-700);
  text-decoration: none;
  font-size: 1.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: var(--text-primary);
  }
`;

const HeroSection: React.FC = () => {
  return (
    <HeroSectionContainer>
      <div>
        <h1>{ABOUT_SECTION_TEXT.TITLE}</h1>
        <p>{ABOUT_SECTION_TEXT.SUB_TITLE}</p>
        <Tagline>{ABOUT_SECTION_TEXT.TAGLINE}</Tagline>
      </div>
      <SectionIndicator sections={sections} />
      <SocialLinksContainer>
        <SocialLink
          href={SOCIAL_LINKS.Github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit my GitHub profile"
        >
          <FaGithub />
        </SocialLink>
        <SocialLink
          href={SOCIAL_LINKS.LinkedIn}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit my LinkedIn profile"
        >
          <FaLinkedin />
        </SocialLink>
        <SocialLink href={SOCIAL_LINKS.Gmail} aria-label="Send me an email">
          <MdEmail />
        </SocialLink>
        <SocialLink
          href="/Shubham_Resume.pdf"
          download
          aria-label="Download resume"
        >
          <FiDownload />
        </SocialLink>
      </SocialLinksContainer>
    </HeroSectionContainer>
  );
};

export default HeroSection;
