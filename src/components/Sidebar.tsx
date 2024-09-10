import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const SidebarWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  z-index: 1000;
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SidebarContainer = styled(motion.nav)`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 2rem;
  height: 100%;
  width: 100%;
`;

const SidebarLink = styled(Link)<{ active: boolean }>`
  display: block;
  color: white;
  text-decoration: none;
  padding: 0.5rem 0;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};

  &:hover {
    text-decoration: underline;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 100px;
  margin-bottom: 1rem;
`;

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <>
      <ToggleButton onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </ToggleButton>
      <SidebarWrapper isOpen={isOpen}>
        <SidebarContainer>
          <Logo src="/caravan-logo-transparent.png" alt="Caravan Logo" />
          <SidebarLink to="/" active={location.pathname === "/"}>
            Home
          </SidebarLink>
          <SidebarLink to="/bitcoin" active={location.pathname === "/bitcoin"}>
            Bitcoin Guide
          </SidebarLink>
          <SidebarLink to="/psbt" active={location.pathname === "/psbt"}>
            PSBT Guide
          </SidebarLink>
        </SidebarContainer>
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;
