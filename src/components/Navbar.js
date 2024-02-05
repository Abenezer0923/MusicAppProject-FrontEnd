import React from 'react';
import styled from '@emotion/styled/macro';
import { useNavigate } from 'react-router-dom';


const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 40px;
  z-index: 1; /* Ensure the navbar stays on top */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background: linear-gradient(
    to right,
    #d7a022,
    #152138
  );

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Logo = styled.img`
  width: 95px;
  height: 70px;
`;

const AppTitle = styled.h1`
  font-size: 20px;
  margin: 0;
  color:#fff
`;

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <NavbarContainer>
      <LogoContainer onClick={() => { navigate('/') }}>
        <AppTitle>Music App</AppTitle>
      </LogoContainer>
    </NavbarContainer>
  );
};

export default Navbar;
