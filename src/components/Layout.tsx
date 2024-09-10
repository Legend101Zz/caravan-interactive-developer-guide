import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main<{ isSidebarOpen: boolean }>`
  flex: 1;
  padding: ${(props) => props.theme.spacing.medium};
  padding-top: 60px; // Space for the toggle button
  transition: margin-left 0.3s ease;
  width: 100%;

  @media (min-width: 769px) {
    margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? "250px" : "0")};
    width: ${({ isSidebarOpen }) =>
      isSidebarOpen ? "calc(100% - 250px)" : "100%"};
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LayoutContainer>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MainContent isSidebarOpen={isSidebarOpen}>
        <ContentWrapper>{children}</ContentWrapper>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
