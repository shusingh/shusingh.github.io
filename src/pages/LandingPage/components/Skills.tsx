import React from 'react';
import { Text } from '@chakra-ui/react';
import { SECTION_HEADINGS, SKILLS_SECTION_TEXT } from '@/constants/textConstants';
import styled from 'styled-components';
import { Tag } from '@/components/ui/tag';

const SkillsSectionContainer = styled.section`
  padding: 3rem 1rem;
`;

const Heading = styled.h2`
  text-align: left;
  margin-bottom: 2rem;
`;

const SkillsRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 0 2.5rem 0; /* top right botton left */
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TitleBox = styled.div`
  flex: 1;
  text-align: left;
  color: var(--color-whiteAlpha-700);
  margin: 0 0 1rem 0rem; /* top right botton left */
`;

const SkillsBox = styled.div`
  flex: 3;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const StyledTag = styled(Tag)`
  background-color: rgba(42, 47, 54, 0.8);
  color: white;
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(58, 63, 70, 0.8);
  }
`;

export const Skills: React.FC = () => {
  return (
    <SkillsSectionContainer id="skills">
      <Heading>{SECTION_HEADINGS.SKILLS}</Heading>
      {Object.entries(SKILLS_SECTION_TEXT).map(([key, value]) => (
        <SkillsRow key={key}>
          <TitleBox>
            <Text fontSize="xs">{value.TITLE}</Text>
          </TitleBox>
          <SkillsBox>
            {value.SKILLS.map((skill) => (
              <StyledTag size="sm" key={skill.name} startElement={<skill.icon />}>
                {skill.name}
              </StyledTag>
            ))}
          </SkillsBox>
        </SkillsRow>
      ))}
    </SkillsSectionContainer>
  );
};
