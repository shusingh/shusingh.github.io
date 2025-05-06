import { ABOUT_SECTION_TEXT } from '@/constants';
import styled from 'styled-components';

const AboutContainer = styled.div`
  color: var(--color-whiteAlpha-700);
  line-height: 1.6;
  font-size: 0.9rem;
`;

export const About = () => {
  return <AboutContainer dangerouslySetInnerHTML={{ __html: ABOUT_SECTION_TEXT.DESCRIPTION }} />;
};
