import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineTitle,
} from '@/components/ui/timeline';
import { Link, Text } from '@chakra-ui/react';
import styled from 'styled-components';
import React from 'react';
import { LuExternalLink } from 'react-icons/lu';

interface ExperienceCardProps {
  timelineTitle: string;
  timelineTitleLink?: string;
  timelineContentTitle: string;
  timelineContentSubTitle: string;
  timelineContentDescription: string;
  timelineLogo: React.ReactNode;
}

const StyledText = styled(Text)`
  color: var(--color-whiteAlpha-700);
`;

export const TimelineCard: React.FC<ExperienceCardProps> = ({
  timelineTitle,
  timelineTitleLink,
  timelineContentTitle,
  timelineContentSubTitle,
  timelineContentDescription,
  timelineLogo,
}) => {
  return (
    <TimelineItem>
      <TimelineContent width="auto" minW="200px">
        <TimelineTitle>
          {timelineTitleLink ? (
            <Link href={timelineTitleLink} variant="plain" target="__blank">
              {timelineTitle}
              <LuExternalLink />
            </Link>
          ) : (
            timelineTitle
          )}
        </TimelineTitle>
      </TimelineContent>
      <TimelineConnector>{timelineLogo}</TimelineConnector>
      <TimelineContent>
        <TimelineTitle>{timelineContentTitle}</TimelineTitle>
        <TimelineDescription>{timelineContentSubTitle}</TimelineDescription>
        <StyledText textStyle="sm" dangerouslySetInnerHTML={{ __html: timelineContentDescription }} />
      </TimelineContent>
    </TimelineItem>
  );
};
