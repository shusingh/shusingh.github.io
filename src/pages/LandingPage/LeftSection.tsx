import styled from 'styled-components';
import HeroSection from './components/HeroSection';

const LeftSectionContainer = styled.div`
  position: sticky;
  top: 0;
  height: fit-content;
  width: clamp(16rem, 30%, 24rem);
  flex-shrink: 0;
  align-self: flex-start;

  @media (max-width: 1024px) {
    position: relative;
    top: 0;
    width: 100%;
  }
`;

export const LeftSection = () => {
  return (
    <LeftSectionContainer>
      <HeroSection />
    </LeftSectionContainer>
  );
};
