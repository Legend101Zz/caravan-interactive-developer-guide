import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="prose max-w-none">
      <h1>Welcome to the Caravan Interactive Guide</h1>
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
          <Link to="/multisig">Multisig Guide</Link>: Explore how to create and
          manage multi-signature wallets.
        </li>
        <li>
          <Link to="/psbt">PSBT Guide</Link>: Understand Partially Signed
          Bitcoin Transactions and how to work with them.
        </li>
        <li>
          <Link to="/fees">Fees Guide</Link>: Learn about fee estimation and
          validation for Bitcoin transactions.
        </li>
      </ul>
      <p>
        Each guide provides interactive examples that allow you to experiment
        with Caravan's functionality directly in your browser.
      </p>
    </div>
  );
};

export default Home;
