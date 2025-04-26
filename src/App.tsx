import { Navbar } from '@/components/Header/Navbar';
import { About } from '@/sections/About/About';
import styled from 'styled-components';
import { Experience } from './sections/Experience/Experience';
import { Separator, Stack } from '@chakra-ui/react';
import { Projects } from './sections/Projects/Projects';
import { Skills } from './sections/Skills/Skills';
import { Footer } from './components/Footer/Footer';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

function App() {
  return (
    <AppContainer>
      <Stack>
        <Navbar /> {/* Navbar already has a separator  */}
        <About />
        <Separator variant="dotted" />
        <Experience />
        <Separator variant="dotted" />
        <Projects />
        <Separator variant="dotted" />
        <Skills />
        <Separator variant="dotted" />
        <Footer />
      </Stack>
    </AppContainer>
  );
}

export default App;
