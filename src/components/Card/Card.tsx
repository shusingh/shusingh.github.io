import React, { memo } from 'react';
import { Box, Text, Flex, Link, Badge } from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';
import styled from 'styled-components';

interface CardProps {
  timeline: string;
  title: string;
  description: string;
  skills: readonly string[];
  link: string;
  imageSrc?: string;
}

const CardContainer = styled(Link)`
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: transparent;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
  text-decoration: none;
  width: 100%;
  cursor: pointer;
  border: 1px solid transparent;

  &:hover {
    background-color: var(--card-hover-bg);
    box-shadow: 0 8px 16px var(--card-hover-shadow);
    border-color: var(--card-hover-border);
    text-decoration: none;
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    background-color: var(--card-hover-bg);
    box-shadow: 0 8px 16px var(--card-hover-shadow);
    border-color: var(--card-hover-border);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const TimelineColumn = styled(Box)`
  flex: 0 0 150px;
  color: var(--color-whiteAlpha-700);
  font-size: 0.8rem;

  @media (max-width: 1024px) {
    flex: 0 0 3rem;
  }
`;

const TimelineText = styled.div`
  color: var(--color-whiteAlpha-700);
  font-family: var(--font-mono);
  font-size: 0.75rem;
`;

const ProjectImage = styled.img`
  width: 150px;
  height: 90px;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const ContentColumn = styled(Box)`
  flex: 1;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

const Title = styled(Text)`
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const Description = styled(Text)`
  color: var(--color-whiteAlpha-700);
  margin-bottom: 1rem;
  line-height: 1.6;
  font-size: 0.8rem;
  white-space: pre-line;
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

const ExternalLinkIcon = styled(FiExternalLink)`
  color: var(--color-whiteAlpha-700);
  font-size: 0.8rem;
  transition: transform 0.3s ease;

  ${CardContainer}:hover & {
    transform: translate(2px, -2px);
  }
`;

export const Card: React.FC<CardProps> = memo(({ timeline, title, description, skills, link, imageSrc }) => {
  return (
    <CardContainer href={link} target="_blank" rel="noopener noreferrer" aria-label={`${title} - ${description}`}>
      <TimelineColumn>
        {imageSrc ? <ProjectImage src={imageSrc} alt={title} /> : <TimelineText>{timeline}</TimelineText>}
      </TimelineColumn>
      <ContentColumn>
        <TitleContainer>
          <Title>{title}</Title>
          {link && <ExternalLinkIcon aria-hidden="true" />}
        </TitleContainer>
        <Description>{description}</Description>
        <Flex wrap="wrap" gap="0.5rem" role="list" aria-label="Skills">
          {skills.map((skill, index) => (
            <StyledBadge key={index} role="listitem">
              {skill}
            </StyledBadge>
          ))}
        </Flex>
      </ContentColumn>
    </CardContainer>
  );
});

Card.displayName = 'Card';
