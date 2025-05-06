import styled from 'styled-components';
import HeroSection from './components/HeroSection';

const LeftSectionContainer = styled.div`
  position: sticky;
  top: 0;
  height: fit-content;
  width: 20rem;
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
