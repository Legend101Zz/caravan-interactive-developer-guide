import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${(props) => props.theme.spacing.medium};
  overflow-y: auto;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LayoutContainer>
    <Sidebar />
    <MainContent>{children}</MainContent>
  </LayoutContainer>
);

export default Layout;
