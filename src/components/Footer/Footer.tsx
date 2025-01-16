import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { SOCIAL_LINKS } from '@/constants/textConstants';

const FooterContainer = styled.footer`
  padding: 2rem 1rem;
  background-color: var(--color-background-dark);
  color: var(--color-whiteAlpha-700);
  text-align: center;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem; /* Space between links */
`;

const SocialLink = styled.a`
  color: var(--color-whiteAlpha-700);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: var(--text-primary);
  }
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer id="links">
      <LinksContainer>
        <SocialLink href={SOCIAL_LINKS.Github} target="_blank" rel="noopener noreferrer">
          <FaGithub /> GitHub
        </SocialLink>
        <SocialLink href={SOCIAL_LINKS.LinkedIn} target="_blank" rel="noopener noreferrer">
          <FaLinkedin /> LinkedIn
        </SocialLink>
        <SocialLink href={SOCIAL_LINKS.Gmail}>
          <MdEmail /> Gmail
        </SocialLink>
      </LinksContainer>
    </FooterContainer>
  );
};
