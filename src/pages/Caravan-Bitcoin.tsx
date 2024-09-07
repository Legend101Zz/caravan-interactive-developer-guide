import React, { useState } from "react";
import * as Bitcoin from "@caravan/bitcoin";
import styled from "styled-components";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import CodeBlock from "../components/CodeBlock";
import Console from "../components/Console";

const SectionTitle = styled.h2`
  color: ${(props) => props.theme.colors.primary};
  margin-top: ${(props) => props.theme.spacing.large};
`;

const ExampleWrapper = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.medium};
`;

const CodeWrapper = styled.div`
  flex: 1;
`;

const ConsoleWrapper = styled.div`
  flex: 1;
`;

const BitcoinGuide: React.FC = () => {
  const [network, setNetwork] = useState<Bitcoin.Network>(
    Bitcoin.Network.TESTNET,
  );
  const [address, setAddress] = useState("");
  const [addressValidationResult, setAddressValidationResult] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [publicKeyValidationResult, setPublicKeyValidationResult] =
    useState("");

  const handleValidateAddress = () => {
    const result = Bitcoin.validateAddress(address, network);
    setAddressValidationResult(result || "Address is valid");
  };

  const handleValidatePublicKey = () => {
    const result = Bitcoin.validatePublicKey(publicKey);
    setPublicKeyValidationResult(result || "Public key is valid");
  };

  return (
    <div>
      <h1>Bitcoin Guide</h1>

      <SectionTitle>Address Validation</SectionTitle>
      <p>
        Address validation is crucial in Bitcoin to ensure that transactions are
        sent to the correct destination. Different networks (Mainnet, Testnet)
        have different address formats.
      </p>
      <ExampleWrapper>
        <CodeWrapper>
          <CodeBlock language="typescript">
            {`
import { validateAddress, Network } from '@caravan/bitcoin';

const address = '${address}';
const network = Network.${network};

const result = validateAddress(address, network);
console.log(result || 'Address is valid');
            `}
          </CodeBlock>
          <Card>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Bitcoin address"
            />
            <Select
              value={network}
              onChange={(e) => setNetwork(e.target.value as Bitcoin.Network)}
            >
              <option value={Bitcoin.Network.MAINNET}>Mainnet</option>
              <option value={Bitcoin.Network.TESTNET}>Testnet</option>
            </Select>
            <Button onClick={handleValidateAddress}>Validate Address</Button>
          </Card>
        </CodeWrapper>
        <ConsoleWrapper>
          <Console output={addressValidationResult} />
        </ConsoleWrapper>
      </ExampleWrapper>

      <SectionTitle>Public Key Validation</SectionTitle>
      <p>
        Public keys are used to derive Bitcoin addresses and verify signatures.
        Validating public keys ensures they are in the correct format.
      </p>
      <ExampleWrapper>
        <CodeWrapper>
          <CodeBlock language="typescript">
            {`
import { validatePublicKey } from '@caravan/bitcoin';

const publicKey = '${publicKey}';

const result = validatePublicKey(publicKey);
console.log(result || 'Public key is valid');
            `}
          </CodeBlock>
          <Card>
            <Input
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              placeholder="Enter public key in hex format"
            />
            <Button onClick={handleValidatePublicKey}>
              Validate Public Key
            </Button>
          </Card>
        </CodeWrapper>
        <ConsoleWrapper>
          <Console output={publicKeyValidationResult} />
        </ConsoleWrapper>
      </ExampleWrapper>
    </div>
  );
};

export default BitcoinGuide;
