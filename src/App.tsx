// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AnimatePresence } from "framer-motion";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import Home from "./pages/Home";
import BitcoinGuide from "./pages/Caravan-Bitcoin";
import PsbtGuide from "./pages/Caravan-Psbt";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
`;

const Content = styled.main`
  flex: 1;
  padding: 2rem;
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AppContainer>
          <Sidebar />
          <Content>
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
};

export default App;
