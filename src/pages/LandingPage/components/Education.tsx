import styled from 'styled-components';
import { EDUCATION_SECTION_TEXT } from '@/constants';
import { Card } from '@/components/Card/Card';

const EducationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Education = () => {
  return (
    <EducationContainer>
      {EDUCATION_SECTION_TEXT.map((edu, index) => (
        <Card
          key={index}
          timeline={edu.DURATION}
          title={edu.INSTITUTION}
          description={`${edu.DEGREE} · ${edu.LOCATION}`}
          skills={[]}
          link={edu.LINK}
        />
      ))}
    </EducationContainer>
  );
};
