import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Card } from "../components/Card";
import { Button } from "../components/Button";

const StyledHome = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const LinkList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 1rem;
`;

const Home: React.FC = () => {
  return (
    <StyledHome>
      <Title>Welcome to the Caravan Interactive Guide</Title>
      <Card>
        <Section>
          <h2>What is Caravan?</h2>
          <p>
            Caravan is a powerful set of tools for creating and managing Bitcoin
            multisig wallets. It offers:
          </p>
          <ul>
            <li>Stateless and transparent multisig coordination</li>
            <li>
              Support for various hardware wallets and key management solutions
            </li>
            <li>
              Advanced features like PSBT handling and fee bumping (RBF/CPFP)
            </li>
            <li>A user-friendly interface for complex Bitcoin operations</li>
          </ul>
          <p>
            Learn more about Caravan on the{" "}
            <a
              href="https://github.com/caravan-bitcoin/caravan"
              target="_blank"
              rel="noopener noreferrer"
            >
              official GitHub repository
            </a>
            .
          </p>
        </Section>

        <Section>
          <h2>About This Guide</h2>
          <p>
            This interactive guide provides hands-on examples and explanations
            for using the Caravan packages. You'll learn how to:
          </p>
          <ul>
            <li>Work with Bitcoin transactions and addresses</li>
            <li>Create and manage multisig wallets</li>
            <li>Handle Partially Signed Bitcoin Transactions (PSBTs)</li>
            <li>
              Implement advanced features like Replace-by-Fee (RBF) and
              Child-Pays-for-Parent (CPFP)
            </li>
          </ul>
          <p>
            Each section of the guide offers interactive examples that allow you
            to experiment with Caravan's functionality directly in your browser.
          </p>
        </Section>

        <Section>
          <h2>Getting Started</h2>
          <p>
            Choose a topic from the following list to begin exploring Caravan's
            features:
          </p>
          <LinkList>
            <LinkItem>
              <Link to="/bitcoin">
                <Button>Bitcoin Guide</Button>
              </Link>
              <p>
                Learn about basic Bitcoin operations, address generation, and
                transaction handling.
              </p>
            </LinkItem>
            <LinkItem>
              <Link to="/psbt">
                <Button>PSBT Guide</Button>
              </Link>
              <p>
                Understand Partially Signed Bitcoin Transactions and how to work
                with them.
              </p>
            </LinkItem>
            <LinkItem>
              <Link to="/multisig">
                <Button>Multisig Wallet Guide</Button>
              </Link>
              <p>
                Explore how to create and manage multisig wallets using Caravan.
              </p>
            </LinkItem>
            <LinkItem>
              <Link to="/fee-bumping">
                <Button>Fee Bumping Guide</Button>
              </Link>
              <p>
                Learn about Replace-by-Fee (RBF) and Child-Pays-for-Parent
                (CPFP) techniques.
              </p>
            </LinkItem>
          </LinkList>
        </Section>

        <Section>
          <h2>Additional Resources</h2>
          <ul>
            <li>
              <a
                href="https://caravan-bitcoin.github.io/caravan"
                target="_blank"
                rel="noopener noreferrer"
              >
                Caravan Web Interface
              </a>
              : Try out Caravan's web-based multisig coordinator.
            </li>
            <li>
              <a
                href="https://github.com/caravan-bitcoin/caravan/tree/master/packages"
                target="_blank"
                rel="noopener noreferrer"
              >
                Caravan Packages Documentation
              </a>
              : Caravan's npm packages.
            </li>
            <li>
              <a
                href="https://bitcoinops.org/en/topics/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bitcoin Optech Topics
              </a>
              : Learn more about advanced Bitcoin concepts.
            </li>
          </ul>
        </Section>
      </Card>
    </StyledHome>
  );
};

export default Home;
