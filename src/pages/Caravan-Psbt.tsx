import React, { useState } from "react";
import { PsbtV2 } from "@caravan/psbt";
import { Network, satoshisToBitcoins } from "@caravan/bitcoin";
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
  const [psbtDetails, setPsbtDetails] = useState("");
  const [network, setNetwork] = useState<Network>(Network.TESTNET);
  const [inputTxid, setInputTxid] = useState("");
  const [inputIndex, setInputIndex] = useState("0");
  const [outputAddress, setOutputAddress] = useState("");
  const [outputAmount, setOutputAmount] = useState("");
  const [createdPsbt, setCreatedPsbt] = useState("");
  const [signaturePubkey, setSignaturePubkey] = useState("");
  const [signatureHex, setSignatureHex] = useState("");

  const handleParsePsbt = () => {
    try {
      const parsedPsbt = new PsbtV2(psbtBase64);
      const details = {
        version: parsedPsbt.PSBT_GLOBAL_VERSION,
        txVersion: parsedPsbt.PSBT_GLOBAL_TX_VERSION,
        inputCount: parsedPsbt.PSBT_GLOBAL_INPUT_COUNT,
        outputCount: parsedPsbt.PSBT_GLOBAL_OUTPUT_COUNT,
        inputs: parsedPsbt.PSBT_IN_PREVIOUS_TXID.map((txid, index) => ({
          txid,
          vout: parsedPsbt.PSBT_IN_OUTPUT_INDEX[index],
          witnessUtxo: parsedPsbt.PSBT_IN_WITNESS_UTXO[index],
          nonWitnessUtxo: parsedPsbt.PSBT_IN_NON_WITNESS_UTXO[index],
          partialSigs: parsedPsbt.PSBT_IN_PARTIAL_SIG[index],
          sighashType: parsedPsbt.PSBT_IN_SIGHASH_TYPE[index],
          redeemScript: parsedPsbt.PSBT_IN_REDEEM_SCRIPT[index],
          witnessScript: parsedPsbt.PSBT_IN_WITNESS_SCRIPT[index],
        })),
        outputs: parsedPsbt.PSBT_OUT_AMOUNT.map((amount, index) => ({
          amount: satoshisToBitcoins(amount.toString()),
          script: parsedPsbt.PSBT_OUT_SCRIPT[index],
        })),
      };
      setPsbtDetails(JSON.stringify(details, null, 2));
    } catch (error) {
      console.error("Error parsing PSBT:", error);
      setPsbtDetails(JSON.stringify({ error: "Invalid PSBT" }, null, 2));
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
        amount: parseInt(outputAmount),
      });
      setCreatedPsbt(psbt.serialize());
    } catch (error) {
      console.error("Error creating PSBT:", error);
      setCreatedPsbt(
        JSON.stringify({ error: "Invalid PSBT creation" }, null, 2),
      );
    }
  };

  const handleAddSignature = () => {
    try {
      const psbt = new PsbtV2(createdPsbt);
      psbt.addPartialSig(
        0,
        Buffer.from(signaturePubkey, "hex"),
        Buffer.from(signatureHex, "hex"),
      );
      setCreatedPsbt(psbt.serialize());
    } catch (error) {
      console.error("Error adding signature:", error);
      setCreatedPsbt(
        JSON.stringify({ error: "Invalid signature addition" }, null, 2),
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

      <SectionTitle>Add a Signature to PSBT</SectionTitle>
      <Card title="Add a partial signature to PSBT">
        <p>
          This example shows how to add a partial signature to an input in the
          PSBT. This is typically done by each signer in a multi-signature
          setup.
        </p>
        <ExampleWrapper>
          <CodeWrapper>
            <CodeBlock language="typescript">
              {`
        import { PsbtV2 } from '@caravan/psbt';

        const psbt = new PsbtV2('${createdPsbt}');
        psbt.addPartialSig(0,
          Buffer.from('${signaturePubkey}', 'hex'),
          Buffer.from('${signatureHex}', 'hex')
        );

        console.log(psbt.serialize());
                      `}
            </CodeBlock>
            <Input
              value={signaturePubkey}
              onChange={(e) => setSignaturePubkey(e.target.value)}
              placeholder="Pubkey (hex)"
            />
            <Input
              value={signatureHex}
              onChange={(e) => setSignatureHex(e.target.value)}
              placeholder="Signature (hex)"
            />
            <Button onClick={handleAddSignature}>Add Signature</Button>
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
          representation and extract detailed information about its contents.
        </p>
        <ExampleWrapper>
          <CodeWrapper>
            <CodeBlock language="typescript">
              {`
       import { PsbtV2 } from '@caravan/psbt';

       const psbtBase64 = '${psbtBase64}';

       try {
         const parsedPsbt = new PsbtV2(psbtBase64);
         console.log(JSON.stringify({
           version: parsedPsbt.PSBT_GLOBAL_VERSION,
           txVersion: parsedPsbt.PSBT_GLOBAL_TX_VERSION,
           inputCount: parsedPsbt.PSBT_GLOBAL_INPUT_COUNT,
           outputCount: parsedPsbt.PSBT_GLOBAL_OUTPUT_COUNT,
           inputs: parsedPsbt.PSBT_IN_PREVIOUS_TXID.map((txid, index) => ({
             txid,
             vout: parsedPsbt.PSBT_IN_OUTPUT_INDEX[index],
             witnessUtxo: parsedPsbt.PSBT_IN_WITNESS_UTXO[index],
             nonWitnessUtxo: parsedPsbt.PSBT_IN_NON_WITNESS_UTXO[index],
             partialSigs: parsedPsbt.PSBT_IN_PARTIAL_SIG[index],
             sighashType: parsedPsbt.PSBT_IN_SIGHASH_TYPE[index],
             redeemScript: parsedPsbt.PSBT_IN_REDEEM_SCRIPT[index],
             witnessScript: parsedPsbt.PSBT_IN_WITNESS_SCRIPT[index],
           })),
           outputs: parsedPsbt.PSBT_OUT_AMOUNT.map((amount, index) => ({
             amount: satoshisToBitcoins(amount.toString()),
             script: parsedPsbt.PSBT_OUT_SCRIPT[index],
           })),
         }, null, 2));
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
            <Console output={psbtDetails} />
          </ConsoleWrapper>
        </ExampleWrapper>
      </Card>
      <SectionTitle>Working with PSBTs</SectionTitle>
      <Card title="Common PSBT operations">
        <p>Here are some common operations you might perform with PSBTs:</p>
        <ul>
          <li>
            <strong>Adding inputs and outputs:</strong> Use `addInput()` and
            `addOutput()` methods to build your transaction structure.
          </li>
          <li>
            <strong>Signing inputs:</strong> Use `addPartialSig()` to add
            signatures for specific inputs. This is typically done by each
            signer in a multi-signature setup.
          </li>
          <li>
            <strong>Combining partially signed PSBTs:</strong> When multiple
            parties need to sign, use `combine()` to merge their partially
            signed PSBTs.
          </li>
          <li>
            <strong>Finalizing a PSBT:</strong> Once all required signatures are
            collected, use `finalizeAllInputs()` to prepare the PSBT for
            extraction.
          </li>
          <li>
            <strong>Extracting a final transaction:</strong> After finalization,
            use `extractTransaction()` to get the final, signed Bitcoin
            transaction.
          </li>
        </ul>
        <p>
          These operations are typically performed by different parties in a
          multi-signature setup or when using hardware wallets.
        </p>
      </Card>

      <SectionTitle>Advanced PSBT Features</SectionTitle>
      <Card title="Advanced PSBT operations">
        <p>PSBTs support several advanced features:</p>
        <ul>
          <li>
            <strong>BIP32 Derivation Paths:</strong> Use `addBip32Derivation()`
            to add key derivation information, crucial for HD wallets.
          </li>
          <li>
            <strong>Proprietary Fields:</strong> Use `setProprietaryValue()` to
            add custom data to PSBTs, allowing for wallet-specific extensions.
          </li>
          <li>
            <strong>Taproot Support:</strong> PSBTv2 includes methods like
            `addTapKeySig()` and `addTapBip32Derivation()` for working with
            Taproot transactions.
          </li>
          <li>
            <strong>Input Finalization:</strong> Use `finalizeInput()` to
            finalize individual inputs, giving more control over the
            finalization process.
          </li>
        </ul>
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
          <li>Use version control for PSBTs in complex signing workflows</li>
          <li>
            Implement secure methods for transferring PSBTs between signers
          </li>
          <li>
            Always verify the final transaction details before broadcasting
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default PsbtGuide;
