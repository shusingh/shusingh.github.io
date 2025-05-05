import { ChakraProvider, createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import { LandingPage } from './pages/LandingPage/LandingPage';
import styled from 'styled-components';
import { useMouseGradient } from './hooks/useMouseGradient';

const AppWrapper = styled.div<{ gradientPosition: { x: number; y: number } }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    600px at ${(props) => props.gradientPosition.x}px ${(props) => props.gradientPosition.y}px,
    rgba(29, 78, 216, 0.15),
    transparent 80%
  );
  pointer-events: none;
  z-index: 0;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

function App() {
  const mousePosition = useMouseGradient();

  const config = defineConfig({
    ...defaultConfig,
    cssVarsPrefix: 'chakra',
  });

  const system = createSystem(config);

  return (
    <ChakraProvider value={system}>
      <AppWrapper gradientPosition={mousePosition} />
      <ContentWrapper>
        <LandingPage />
      </ContentWrapper>
    </ChakraProvider>
  );
}

export default App;
