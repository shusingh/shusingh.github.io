import { TimelineCard } from '@/components/Timeline/TimelineCard';
import { PERSONAL_PROJECT, PROJECT_SECTION_TEXT, SECTION_HEADINGS } from '@/constants/textConstants';
import { TimelineRoot } from '@chakra-ui/react';
import React from 'react';
import { FaProjectDiagram } from 'react-icons/fa';
import styled from 'styled-components';

const ProjectsSectionContainer = styled.section`
  padding: 3rem 1rem;
`;

const Heading = styled.h2`
  text-align: left;
  margin-bottom: 1rem;
`;

const ProjectTimelineContainer = styled.div`
  width: 100%;
`;

const StyledTimelineRoot = styled(TimelineRoot)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

export const Projects: React.FC = () => {
  return (
    <ProjectsSectionContainer id="projects">
      <Heading>{SECTION_HEADINGS.PROJECTS}</Heading>
      <ProjectTimelineContainer>
        <StyledTimelineRoot maxW="600px">
          {Object.values(PROJECT_SECTION_TEXT).map((project, index) => (
            <TimelineCard
              key={index}
              timelineTitle={project.PROJECT_TITLE}
              timelineContentTitle={PERSONAL_PROJECT}
              timelineContentSubTitle={project.TECH_STACK.join(' • ')}
              timelineContentDescription={project.PROJECT_DESCRIPTION}
              timelineLogo={<FaProjectDiagram />}
            />
          ))}
        </StyledTimelineRoot>
      </ProjectTimelineContainer>
    </ProjectsSectionContainer>
  );
};
