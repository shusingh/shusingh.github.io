import { Separator, Stack } from '@chakra-ui/react';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Footer } from '@/components/Footer/Footer';
import { Navbar } from '@/components/Header/Navbar';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

export const LandingPage = () => {
  return (
    <PageContainer>
      <Stack>
        <Navbar />
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
    </PageContainer>
  );
};
