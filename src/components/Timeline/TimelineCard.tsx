import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineTitle,
} from '@/components/ui/timeline';
import { Link, Text, Flex } from '@chakra-ui/react';
import styled from 'styled-components';
import React from 'react';
import { LuExternalLink } from 'react-icons/lu';
import { FaGithub } from 'react-icons/fa';

interface ExperienceCardProps {
  timelineTitle: string;
  timelineTitleLink?: string;
  timelineContentTitle: string;
  timelineContentSubTitle: string;
  timelineContentDescription: string;
  timelineLogo: React.ReactNode;
  githubLink?: string;
}

const StyledText = styled(Text)`
  color: var(--color-whiteAlpha-700);
`;

const LinkContainer = styled(Flex)`
  align-items: center;
  gap: 8px;
`;

export const TimelineCard: React.FC<ExperienceCardProps> = ({
  timelineTitle,
  timelineTitleLink,
  timelineContentTitle,
  timelineContentSubTitle,
  timelineContentDescription,
  timelineLogo,
  githubLink,
}) => {
  return (
    <TimelineItem>
      <TimelineContent alignItems='end' width="auto" minW="25rem">
        <TimelineTitle>
          <LinkContainer>
            {timelineTitleLink ? (
              <Link href={timelineTitleLink} variant="plain" target="_blank">
                {timelineTitle}
                <LuExternalLink />
              </Link>
            ) : (
              timelineTitle
            )}
            {githubLink && (
              <Link href={githubLink} variant="plain" target="_blank" ml={2}>
                <FaGithub />
              </Link>
            )}
          </LinkContainer>
        </TimelineTitle>
      </TimelineContent>
      <TimelineConnector>{timelineLogo}</TimelineConnector>
      <TimelineContent width="auto" minW="25rem">
        <TimelineTitle>{timelineContentTitle}</TimelineTitle>
        <TimelineDescription>{timelineContentSubTitle}</TimelineDescription>
        <StyledText textStyle="sm" dangerouslySetInnerHTML={{ __html: timelineContentDescription }} />
      </TimelineContent>
    </TimelineItem>
  );
};
