import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Card } from "../components/Card";

const StyledHome = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  color: ${(props) => props.theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const Home: React.FC = () => {
  return (
    <StyledHome
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Welcome to the Caravan Interactive Guide
      </Title>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
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
