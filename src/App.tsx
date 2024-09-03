// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
            <AnimatePresence exitBeforeEnter>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/bitcoin" component={BitcoinGuide} />
                <Route path="/psbt" component={PsbtGuide} />
              </Switch>
            </AnimatePresence>
          </Content>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
};

export default App;
