import React from 'react';
import styled from 'styled-components';
import { EXPERIENCE_SECTION_TEXT } from '@/constants/textConstants';
import { Card } from '@/components/Card/Card';

const ExperienceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Experience = () => {
  return (
    <ExperienceContainer>
      {Object.values(EXPERIENCE_SECTION_TEXT).map((exp, index) => (
        <Card
          key={index}
          timeline={exp.JOB_DURATION}
          title={exp.COMPANY_NAME}
          description={exp.JOB_DESCRIPTION}
          skills={exp.SKILLS}
          link={exp.COMPANY_LINK}
        />
      ))}
    </ExperienceContainer>
  );
};
