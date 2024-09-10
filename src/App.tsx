import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { AnimatePresence } from "framer-motion";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import BitcoinGuide from "./pages/Caravan-Bitcoin";
import PsbtGuide from "./pages/Caravan-Psbt";

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.main<{ isSidebarOpen: boolean }>`
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

function App() {
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
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AppContainer>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <Content isSidebarOpen={isSidebarOpen}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bitcoin" element={<BitcoinGuide />} />
                <Route path="/psbt" element={<PsbtGuide />} />
              </Routes>
            </AnimatePresence>
          </Content>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
