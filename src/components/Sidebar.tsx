import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.nav`
  width: 250px;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 2rem;
  height: 100vh;
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

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <SidebarContainer>
      <h2>Caravan Guide</h2>
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
  );
};

export default Sidebar;
