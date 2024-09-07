import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Card } from "../components/Card";

const StyledHome = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Home: React.FC = () => {
  return (
    <StyledHome>
      <Title>Welcome to the Caravan Interactive Guide</Title>
      <Card>
        <p>
          This guide provides hands-on examples and explanations for using the
          Caravan packages to work with Bitcoin transactions, multisig wallets,
          and more.
        </p>
        <h2>Getting Started</h2>
        <p>
          Choose a topic from the sidebar to begin exploring Caravan's features:
        </p>
        <ul>
          <li>
            <Link to="/bitcoin">Bitcoin Guide</Link>: Learn about basic Bitcoin
            operations, address generation, and transaction handling.
          </li>
          <li>
            <Link to="/psbt">PSBT Guide</Link>: Understand Partially Signed
            Bitcoin Transactions and how to work with them.
          </li>
        </ul>
        <p>
          Each guide provides interactive examples that allow you to experiment
          with Caravan's functionality directly in your browser.
        </p>
      </Card>
    </StyledHome>
  );
};

export default Home;
