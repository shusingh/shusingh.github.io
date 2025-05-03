import { ABOUT_SECTION_TEXT, SECTION_HEADINGS } from '@/constants/textConstants';
import { Image } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';

const AboutSectionContainer = styled.section`
  padding: 3rem 1rem;
  margin: 0 auto;
`;

const HeroSectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AvatarContainer = styled.div`
  flex-shrink: 0;
`;

const HeroTextContainer = styled.div`
  h1 {
    font-size: 2rem;
    margin: 0;
  }
  p {
    color: var(--color-whiteAlpha-700);
  }
`;

const AboutContainer = styled.div`
  text-align: left;
  p {
    color: var(--color-whiteAlpha-700);
  }
  h2 {
    margin-bottom: 1rem;
  }
`;

export const About: React.FC = () => {
  return (
    <AboutSectionContainer id="about">
      <HeroSectionContainer>
        <AvatarContainer>
          <Image src="/avatar.gif" boxSize="90px" borderRadius="full" fit="cover" alt="Adventurer" />
        </AvatarContainer>
        <HeroTextContainer>
          <h1>{ABOUT_SECTION_TEXT.TITLE}</h1>
          <p>{ABOUT_SECTION_TEXT.SUB_TITLE}</p>
        </HeroTextContainer>
      </HeroSectionContainer>

      <AboutContainer>
        <h2>{SECTION_HEADINGS.ABOUT}</h2>
        <p dangerouslySetInnerHTML={{ __html: ABOUT_SECTION_TEXT.DESCRIPTION }} />
      </AboutContainer>
    </AboutSectionContainer>
  );
};
