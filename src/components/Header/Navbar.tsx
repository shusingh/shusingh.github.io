import React from 'react';
import styled from 'styled-components';
import { PiCodeLight } from 'react-icons/pi';
import { SECTION_HEADINGS } from '@/constants/textConstants';
import { Link } from '@chakra-ui/react';

const NavbarContainer = styled.nav`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  z-index: 1000;
  background: rgba(31, 35, 40, 0.95);
  backdrop-filter: blur(6px);
  border-bottom: 1px dotted rgba(255, 255, 255, 0.1);
`;

const Logo = styled(PiCodeLight)`
  font-size: 2rem;
  color: #fff;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 1.5rem;

  a {
    color: var(--text-primary);
    text-decoration: none;
    position: relative;

    span {
      color: var(--color-whiteAlpha-700);
    }

    &:hover {
    }

    &:hover::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -1px;
      width: 100%;
      height: 1px;
      background-color: #fff;
      transition: width 0.3s ease-in-out;
    }
  }
`;
export const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <Logo />
      <LinksContainer>
        <Link href="#about">
          <span>#</span>
          {SECTION_HEADINGS.ABOUT}
        </Link>
        <Link href="#experience">
          <span>#</span>
          {SECTION_HEADINGS.EXPERIENCE}
        </Link>
        <Link href="#projects">
          <span>#</span>
          {SECTION_HEADINGS.PROJECTS}
        </Link>
        <Link href="#skills">
          <span>#</span>
          {SECTION_HEADINGS.SKILLS}
        </Link>
        <Link href="#links">
          <span>#</span>
          {SECTION_HEADINGS.LINKS}
        </Link>
      </LinksContainer>
    </NavbarContainer>
  );
};
