import styled from 'styled-components';
import { LeftSection } from './LeftSection';
import { RightSection } from './RightSection';

const LandingPageWrapper = styled.div`
  max-width: 1480px;
  padding: 0 3rem;
  scroll-behavior: smooth;
  margin: 0 auto;
`;

const LandingPageContainer = styled.div`
  display: flex;
  gap: clamp(3rem, 5vw, 10rem);
  max-width: 75rem;
  margin: 0 auto;
  position: relative;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const LandingPage = () => {
  return (
    <LandingPageWrapper>
      <LandingPageContainer>
        <LeftSection />
        <RightSection />
      </LandingPageContainer>
    </LandingPageWrapper>
  );
};
