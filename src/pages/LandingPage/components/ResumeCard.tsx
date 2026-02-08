import styled from 'styled-components';
import { FiFileText, FiDownload } from 'react-icons/fi';

const CardContainer = styled.a`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--card-hover-border);
  background-color: transparent;
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: var(--card-hover-bg);
    box-shadow: 0 8px 16px var(--card-hover-shadow);
    text-decoration: none;
  }
`;

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FileIcon = styled(FiFileText)`
  color: var(--text-primary);
  font-size: 1.25rem;
  flex-shrink: 0;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.3;
`;

const Subtitle = styled.span`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-whiteAlpha-700);
  line-height: 1.4;
`;

const DownloadIcon = styled(FiDownload)`
  color: var(--color-whiteAlpha-700);
  font-size: 1.1rem;
  flex-shrink: 0;
  transition: color 0.2s ease;

  ${CardContainer}:hover & {
    color: var(--text-primary);
  }
`;

export const ResumeCard = () => {
  return (
    <CardContainer
      href="/Shubham_Resume.pdf"
      download
      aria-label="Download resume"
    >
      <LeftContent>
        <FileIcon />
        <TextContent>
          <Title>Resume</Title>
          <Subtitle>PDF &middot; Shubham_Resume.pdf</Subtitle>
        </TextContent>
      </LeftContent>
      <DownloadIcon />
    </CardContainer>
  );
};
