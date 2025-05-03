import { TimelineCard } from '@/components/Timeline/TimelineCard';
import { TimelineRoot } from '@chakra-ui/react';
import styled from 'styled-components';
import React from 'react';
import { EXPERIENCE_SECTION_TEXT, SECTION_HEADINGS } from '@/constants/textConstants';
import { FaAmazon, FaUniversity } from 'react-icons/fa';
import { FcBiotech } from 'react-icons/fc';

const ExperienceSectionContainer = styled.section`
  padding: 3rem 1rem;
`;

const ExperienceTimelineContainer = styled.div`
  width: 100%;
`;

const StyledTimelineRoot = styled(TimelineRoot)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const Heading = styled.h2`
  text-align: left;
  margin-bottom: 1rem;
`;

export const Experience: React.FC = () => {
  return (
    <ExperienceSectionContainer id="experience">
      <Heading>{SECTION_HEADINGS.EXPERIENCE}</Heading>
      <ExperienceTimelineContainer>
        <StyledTimelineRoot maxW="600px">
          <TimelineCard
            timelineTitle={EXPERIENCE_SECTION_TEXT.AMAZON.COMPANY_NAME}
            timelineTitleLink={EXPERIENCE_SECTION_TEXT.AMAZON.COMPANY_LINK}
            timelineContentTitle={EXPERIENCE_SECTION_TEXT.AMAZON.JOB_TITLE}
            timelineContentSubTitle={EXPERIENCE_SECTION_TEXT.AMAZON.JOB_DURATION}
            timelineContentDescription={EXPERIENCE_SECTION_TEXT.AMAZON.JOB_DESCRIPTION}
            timelineLogo={<FaAmazon />}
          />
          <TimelineCard
            timelineTitle={EXPERIENCE_SECTION_TEXT.INDIANA_UNIVERSITY.COMPANY_NAME}
            timelineTitleLink={EXPERIENCE_SECTION_TEXT.INDIANA_UNIVERSITY.COMPANY_LINK}
            timelineContentTitle={EXPERIENCE_SECTION_TEXT.INDIANA_UNIVERSITY.JOB_TITLE}
            timelineContentSubTitle={EXPERIENCE_SECTION_TEXT.INDIANA_UNIVERSITY.JOB_DURATION}
            timelineContentDescription={EXPERIENCE_SECTION_TEXT.INDIANA_UNIVERSITY.JOB_DESCRIPTION}
            timelineLogo={<FaUniversity />}
          />
          <TimelineCard
            timelineTitle={EXPERIENCE_SECTION_TEXT.ELI_LILLY.COMPANY_NAME}
            timelineTitleLink={EXPERIENCE_SECTION_TEXT.ELI_LILLY.COMPANY_LINK}
            timelineContentTitle={EXPERIENCE_SECTION_TEXT.ELI_LILLY.JOB_TITLE}
            timelineContentSubTitle={EXPERIENCE_SECTION_TEXT.ELI_LILLY.JOB_DURATION}
            timelineContentDescription={EXPERIENCE_SECTION_TEXT.ELI_LILLY.JOB_DESCRIPTION}
            timelineLogo={<FcBiotech />}
          />
        </StyledTimelineRoot>
      </ExperienceTimelineContainer>
    </ExperienceSectionContainer>
  );
};
