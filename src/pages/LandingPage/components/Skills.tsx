import styled from 'styled-components';
import { Badge, Flex } from '@chakra-ui/react';
import { SKILLS_SECTION_TEXT } from '@/constants';

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CategoryBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CategoryLabel = styled.span`
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const StyledBadge = styled(Badge)`
  background-color: var(--badge-bg);
  color: var(--badge-color);
  font-family: var(--font-mono);
  border-radius: 0.375rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 500;
`;

export const Skills = () => {
  return (
    <SkillsContainer>
      {SKILLS_SECTION_TEXT.map((category) => (
        <CategoryBlock key={category.label}>
          <CategoryLabel>{category.label}</CategoryLabel>
          <Flex wrap="wrap" gap="0.5rem">
            {category.skills.map((skill) => (
              <StyledBadge key={skill}>{skill}</StyledBadge>
            ))}
          </Flex>
        </CategoryBlock>
      ))}
    </SkillsContainer>
  );
};
