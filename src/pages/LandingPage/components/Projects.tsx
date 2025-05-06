import styled from 'styled-components';
import { PROJECT_SECTION_TEXT } from '@/constants';
import { Card } from '@/components/Card/Card';

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Projects = () => {
  return (
    <ProjectsContainer>
      {Object.values(PROJECT_SECTION_TEXT).map((project, index) => (
        <Card
          key={index}
          timeline={project.TIMELINE}
          title={project.PROJECT_TITLE}
          description={project.PROJECT_DESCRIPTION}
          skills={project.TECH_STACK}
          link={project.PROJECT_LINK || project.GITHUB_LINK || ''}
          imageSrc={project.IMAGE_SRC}
        />
      ))}
    </ProjectsContainer>
  );
};
