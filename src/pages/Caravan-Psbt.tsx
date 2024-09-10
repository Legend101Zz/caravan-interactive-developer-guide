import React, { useState } from "react";
import { PsbtV2, autoLoadPSBT } from "@caravan/psbt";
import { Network } from "@caravan/bitcoin";
import styled from "styled-components";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import CodeBlock from "../components/CodeBlock";
import Console from "../components/Console";

const ExampleWrapper = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.medium};
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const CodeWrapper = styled.div`
  flex: 1;
  min-width: 300px;
  width: 100%;
`;

const ConsoleWrapper = styled.div`
  flex: 1;
  min-width: 300px;
  width: 100%;
`;

const SectionTitle = styled.h2`
  color: ${(props) => props.theme.colors.primary};
  margin-top: ${(props) => props.theme.spacing.large};
  font-size: 1.5rem;
`;

const PsbtGuide: React.FC = () => {
  const [psbtBase64, setPsbtBase64] = useState("");
  const [psbtJson, setPsbtJson] = useState("");
  const [network, setNetwork] = useState<Network>(Network.TESTNET);
  const [inputTxid, setInputTxid] = useState("");
  const [inputIndex, setInputIndex] = useState("0");
  const [outputAddress, setOutputAddress] = useState("");
  const [outputAmount, setOutputAmount] = useState("");
  const [createdPsbt, setCreatedPsbt] = useState("");

  const handleParsePsbt = () => {
    try {
      const parsedPsbt = new PsbtV2(psbtBase64);
      setPsbtJson(JSON.stringify(parsedPsbt, null, 2));
    } catch (error) {
      console.error("Error parsing PSBT:", error);
      setPsbtJson(JSON.stringify({ error: "Invalid PSBT" }, null, 2));
    }
  };

  const handleCreatePsbt = () => {
    try {
      const psbt = new PsbtV2();
      psbt.addInput({
        previousTxId: inputTxid,
        outputIndex: parseInt(inputIndex, 10),
      });
      psbt.addOutput({
        address: outputAddress,
        amount: parseInt(outputAmount, 10),
      });
      setCreatedPsbt(psbt.serialize());
    } catch (error) {
      console.error("Error creating PSBT:", error);
      setCreatedPsbt(
        JSON.stringify({ error: "Invalid PSBT creation" }, null, 2),
      );
    }
  };

  return (
    <div>
      <h1>PSBT Guide</h1>

      <SectionTitle>What is a PSBT?</SectionTitle>
      <Card>
        <p>
          Partially Signed Bitcoin Transactions (PSBTs) are a data format that
          allows for the exchange of information about a Bitcoin transaction
          between multiple parties. PSBTs are particularly useful for multisig
          wallets and hardware wallet interactions.
        </p>
        <p>Key features of PSBTs:</p>
        <ul>
          <li>Standardized format for sharing transaction information</li>
          <li>Support for multi-party signing workflows</li>
          <li>
            Separation of transaction construction from transaction signing
          </li>
          <li>Enhanced privacy and security in transaction creation</li>
        </ul>
      </Card>

      <SectionTitle>Create a PSBT</SectionTitle>
      <Card title="Create a simple PSBT">
        <p>
          Let's create a simple PSBT with one input and one output. This example
          demonstrates how to construct a basic transaction using the PSBT
          format.
        </p>
        <ExampleWrapper>
          <CodeWrapper>
            <CodeBlock language="typescript">
              {`
import { PsbtV2 } from '@caravan/psbt';

const psbt = new PsbtV2();
psbt.addInput({
  previousTxId: '${inputTxid}',
  outputIndex: ${inputIndex},
});
psbt.addOutput({
  address: '${outputAddress}',
  amount: ${outputAmount},
});

console.log(psbt.serialize());
              `}
            </CodeBlock>
            <Input
              value={inputTxid}
              onChange={(e) => setInputTxid(e.target.value)}
              placeholder="Input TXID"
            />
            <Input
              value={inputIndex}
              onChange={(e) => setInputIndex(e.target.value)}
              placeholder="Input Index"
              type="number"
            />
            <Input
              value={outputAddress}
              onChange={(e) => setOutputAddress(e.target.value)}
              placeholder="Output Address"
            />
            <Input
              value={outputAmount}
              onChange={(e) => setOutputAmount(e.target.value)}
              placeholder="Output Amount (in satoshis)"
              type="number"
            />
            <Button onClick={handleCreatePsbt}>Create PSBT</Button>
          </CodeWrapper>
          <ConsoleWrapper>
            <Console output={createdPsbt} />
          </ConsoleWrapper>
        </ExampleWrapper>
      </Card>

      <SectionTitle>Parse PSBT</SectionTitle>
      <Card title="Parse an existing PSBT">
        <p>
          This example demonstrates how to parse a PSBT from its Base64
          representation. You can use the PSBT created in the previous step or
          paste any valid PSBT here.
        </p>
        <ExampleWrapper>
          <CodeWrapper>
            <CodeBlock language="typescript">
              {`
import { PsbtV2 } from '@caravan/psbt';

const psbtBase64 = '${psbtBase64}';

try {
  const parsedPsbt = new PsbtV2(psbtBase64);
  console.log(JSON.stringify(parsedPsbt, null, 2));
} catch (error) {
  console.error('Error parsing PSBT:', error);
}
              `}
            </CodeBlock>
            <Input
              value={psbtBase64}
              onChange={(e) => setPsbtBase64(e.target.value)}
              placeholder="Enter PSBT (Base64)"
            />
            <Button onClick={handleParsePsbt}>Parse PSBT</Button>
          </CodeWrapper>
          <ConsoleWrapper>
            <Console output={psbtJson} />
          </ConsoleWrapper>
        </ExampleWrapper>
      </Card>

      <SectionTitle>Working with PSBTs</SectionTitle>
      <Card title="Common PSBT operations">
        <p>Here are some common operations you might perform with PSBTs:</p>
        <ul>
          <li>Adding inputs and outputs</li>
          <li>Signing inputs</li>
          <li>Combining partially signed PSBTs</li>
          <li>Finalizing a PSBT</li>
          <li>Extracting a final transaction</li>
        </ul>
        <p>
          These operations are typically performed by different parties in a
          multi-signature setup or when using hardware wallets.
        </p>
      </Card>

      <SectionTitle>Best Practices</SectionTitle>
      <Card title="PSBT best practices">
        <ul>
          <li>Always validate inputs and outputs before signing a PSBT</li>
          <li>
            Use descriptors to provide additional context for inputs and outputs
          </li>
          <li>Implement proper error handling when working with PSBTs</li>
          <li>Consider using PSBTs for cold storage and multisig setups</li>
          <li>
            Keep your PSBT library up-to-date to ensure compatibility with the
            latest standards
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default PsbtGuide;
