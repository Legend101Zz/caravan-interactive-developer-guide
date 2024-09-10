import React, { useState } from "react";
import * as Bitcoin from "@caravan/bitcoin";
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

const BitcoinGuide: React.FC = () => {
  const [network, setNetwork] = useState<Bitcoin.Network>(
    Bitcoin.Network.TESTNET,
  );
  const [address, setAddress] = useState("");
  const [addressValidationResult, setAddressValidationResult] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [publicKeyValidationResult, setPublicKeyValidationResult] =
    useState("");
  const [extendedPublicKey, setExtendedPublicKey] = useState("");
  const [derivationPath, setDerivationPath] = useState("m/0/0");
  const [childPublicKey, setChildPublicKey] = useState("");
  const [fee, setFee] = useState("");
  const [feeRate, setFeeRate] = useState("");
  const [feeValidationResult, setFeeValidationResult] = useState("");
  const [publicKeys, setPublicKeys] = useState(["", "", ""]);
  const [requiredSigners, setRequiredSigners] = useState(2);
  const [multisigAddress, setMultisigAddress] = useState("");
  const [bip32Path, setBip32Path] = useState("m/0'/0'/0'");
  const [bip32ValidationResult, setBip32ValidationResult] = useState("");
  const [btcAmount, setBtcAmount] = useState("");
  const [satoshiAmount, setSatoshiAmount] = useState("");
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [signatureValidationResult, setSignatureValidationResult] =
    useState("");
  const [txHex, setTxHex] = useState("");
  const [signedTxHex, setSignedTxHex] = useState("");

  const handleValidateAddress = () => {
    const result = Bitcoin.validateAddress(address, network);
    setAddressValidationResult(result || "Address is valid");
  };

  const handleValidatePublicKey = () => {
    const result = Bitcoin.validatePublicKey(publicKey);
    setPublicKeyValidationResult(result || "Public key is valid");
  };

  const handleDeriveChildPublicKey = () => {
    try {
      const result = Bitcoin.deriveChildPublicKey(
        extendedPublicKey,
        derivationPath,
        network,
      );
      setChildPublicKey(result);
    } catch (error) {
      setChildPublicKey(`Error: ${error.message}`);
    }
  };

  const handleValidateFee = () => {
    const inputsTotalSats = "1000000"; // Example total input amount (10,000 satoshis)
    const result = Bitcoin.validateFee(fee, inputsTotalSats);
    setFeeValidationResult(result || "Fee is valid");
  };

  const handleMultisigAddressGeneration = () => {
    try {
      const address = Bitcoin.generateMultisigFromPublicKeys(
        network,
        Bitcoin.P2SH,
        requiredSigners,
        ...publicKeys.filter((pk) => pk !== ""),
      );
      setMultisigAddress(address.address);
    } catch (error) {
      setMultisigAddress(`Error: ${error.message}`);
    }
  };

  const handleBIP32PathValidation = () => {
    const result = Bitcoin.validateBIP32Path(bip32Path);
    setBip32ValidationResult(result || "BIP32 path is valid");
  };

  const handleBtcToSatoshiConversion = () => {
    const sats = Bitcoin.bitcoinsToSatoshis(btcAmount);
    setSatoshiAmount(sats);
  };

  const handleSatoshiToBtcConversion = () => {
    const btc = Bitcoin.satoshisToBitcoins(satoshiAmount);
    setBtcAmount(btc);
  };

  const handleSignatureValidation = () => {
    try {
      const isValid = Bitcoin.isValidSignature(publicKey, message, signature);
      setSignatureValidationResult(
        isValid ? "Signature is valid" : "Signature is invalid",
      );
    } catch (error) {
      setSignatureValidationResult(`Error: ${error.message}`);
    }
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
      <SectionTitle>Extended Public Key Derivation</SectionTitle>
      <p>
        Extended public keys (xpubs) allow us to derive child public keys
        without knowing the private key. This is crucial for generating multiple
        addresses from a single seed in HD wallets.
      </p>
      <ExampleWrapper>
        <CodeWrapper>
          <CodeBlock language="typescript">
            {`
       import { deriveChildPublicKey, Network } from '@caravan/bitcoin';

       const xpub = '${extendedPublicKey}';
       const path = '${derivationPath}';
       const network = Network.${network};

       const childPubKey = deriveChildPublicKey(xpub, path, network);
       console.log('Child Public Key:', childPubKey);
                   `}
          </CodeBlock>
          <Card>
            <Input
              value={extendedPublicKey}
              onChange={(e) => setExtendedPublicKey(e.target.value)}
              placeholder="Enter extended public key (xpub)"
            />
            <Input
              value={derivationPath}
              onChange={(e) => setDerivationPath(e.target.value)}
              placeholder="Enter derivation path (e.g., m/0/0)"
            />
            <Button onClick={handleDeriveChildPublicKey}>
              Derive Child Public Key
            </Button>
          </Card>
        </CodeWrapper>
        <ConsoleWrapper>
          <Console output={childPublicKey} />
        </ConsoleWrapper>
      </ExampleWrapper>

      <SectionTitle>Fee Validation</SectionTitle>
      <p>
        Proper fee calculation is crucial for Bitcoin transactions. Too low, and
        your transaction might not be confirmed; too high, and you're
        overpaying. Let's validate a fee:
      </p>
      <ExampleWrapper>
        <CodeWrapper>
          <CodeBlock language="typescript">
            {`
       import { validateFee } from '@caravan/bitcoin';

       const fee = '${fee}';
       const inputsTotalSats = '1000000'; // Example: 10,000 satoshis

       const result = validateFee(fee, inputsTotalSats);
       console.log(result || 'Fee is valid');
                   `}
          </CodeBlock>
          <Card>
            <Input
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              placeholder="Enter fee in satoshis"
            />
            <Button onClick={handleValidateFee}>Validate Fee</Button>
          </Card>
        </CodeWrapper>
        <ConsoleWrapper>
          <Console output={feeValidationResult} />
        </ConsoleWrapper>
      </ExampleWrapper>

      <SectionTitle>Transaction Fee Estimation</SectionTitle>
      <p>
        Estimating the correct fee for a transaction is important. Let's
        estimate the fee for a multisig transaction:
      </p>
      <ExampleWrapper>
        <CodeWrapper>
          <CodeBlock language="typescript">
            {`
       import { estimateMultisigTransactionFee } from '@caravan/bitcoin';

       const feeEstimate = estimateMultisigTransactionFee({
         addressType: 'P2SH',
         numInputs: 2,
         numOutputs: 2,
         m: 2,
         n: 3,
         feesPerByteInSatoshis: '${feeRate}'
       });

       console.log('Estimated fee:', feeEstimate, 'satoshis');
                   `}
          </CodeBlock>
          <Card>
            <Input
              value={feeRate}
              onChange={(e) => setFeeRate(e.target.value)}
              placeholder="Enter fee rate in satoshis/byte"
            />
            <Button
              onClick={() => {
                const feeEstimate = Bitcoin.estimateMultisigTransactionFee({
                  addressType: "P2SH",
                  numInputs: 2,
                  numOutputs: 2,
                  m: 2,
                  n: 3,
                  feesPerByteInSatoshis: feeRate,
                });
                setFeeValidationResult(
                  `Estimated fee: ${feeEstimate} satoshis`,
                );
              }}
            >
              Estimate Fee
            </Button>
          </Card>
        </CodeWrapper>
        <ConsoleWrapper>
          <Console output={feeValidationResult} />
        </ConsoleWrapper>
      </ExampleWrapper>

      <SectionTitle>Multisig Address Generation</SectionTitle>
      <p>
        Multisig addresses require multiple signatures to spend funds, enhancing
        security. Let's generate a multisig address from public keys:
      </p>
      <ExampleWrapper>
        <CodeWrapper>
          <CodeBlock language="typescript">
            {`
       import { generateMultisigFromPublicKeys, Network, P2SH } from '@caravan/bitcoin';

       const publicKeys = ${JSON.stringify(publicKeys)};
       const requiredSigners = ${requiredSigners};
       const network = Network.${network};

       const multisig = generateMultisigFromPublicKeys(
         network,
         P2SH,
         requiredSigners,
         ...publicKeys.filter(pk => pk !== '')
       );

       console.log('Multisig Address:', multisig.address);
                   `}
          </CodeBlock>
          <Card>
            {publicKeys.map((pk, index) => (
              <Input
                key={index}
                value={pk}
                onChange={(e) => {
                  const newPks = [...publicKeys];
                  newPks[index] = e.target.value;
                  setPublicKeys(newPks);
                }}
                placeholder={`Enter Public Key ${index + 1}`}
              />
            ))}
            <Input
              value={requiredSigners}
              onChange={(e) => setRequiredSigners(Number(e.target.value))}
              placeholder="Required Signers"
              type="number"
            />
            <Button onClick={handleMultisigAddressGeneration}>
              Generate Multisig Address
            </Button>
          </Card>
        </CodeWrapper>
        <ConsoleWrapper>
          <Console output={multisigAddress} />
        </ConsoleWrapper>
      </ExampleWrapper>

      <SectionTitle>BIP32 Path Validation</SectionTitle>
      <p>
        BIP32 paths are used in hierarchical deterministic wallets to derive
        keys. Let's validate a BIP32 path:
      </p>
      <ExampleWrapper>
        <CodeWrapper>
          <CodeBlock language="typescript">
            {`
       import { validateBIP32Path } from '@caravan/bitcoin';

       const path = '${bip32Path}';

       const result = validateBIP32Path(path);
       console.log(result || 'BIP32 path is valid');
                   `}
          </CodeBlock>
          <Card>
            <Input
              value={bip32Path}
              onChange={(e) => setBip32Path(e.target.value)}
              placeholder="Enter BIP32 Path"
            />
            <Button onClick={handleBIP32PathValidation}>
              Validate BIP32 Path
            </Button>
          </Card>
        </CodeWrapper>
        <ConsoleWrapper>
          <Console output={bip32ValidationResult} />
        </ConsoleWrapper>
      </ExampleWrapper>
      <SectionTitle>Converting Between Units</SectionTitle>
      <p>
        Bitcoin amounts are often represented in different units. Let's convert
        between BTC and satoshis:
      </p>
      <ExampleWrapper>
        <CodeWrapper>
          <CodeBlock language="typescript">
            {`
       import { bitcoinsToSatoshis, satoshisToBitcoins } from '@caravan/bitcoin';

       const btcAmount = '${btcAmount}';
       const satoshiAmount = '${satoshiAmount}';

       console.log(btcAmount, 'BTC =', bitcoinsToSatoshis(btcAmount), 'satoshis');
       console.log(satoshiAmount, 'satoshis =', satoshisToBitcoins(satoshiAmount), 'BTC');
                   `}
          </CodeBlock>
          <Card>
            <Input
              value={btcAmount}
              onChange={(e) => setBtcAmount(e.target.value)}
              placeholder="Enter BTC amount"
            />
            <Button onClick={handleBtcToSatoshiConversion}>
              Convert BTC to Satoshis
            </Button>
            <Input
              value={satoshiAmount}
              onChange={(e) => setSatoshiAmount(e.target.value)}
              placeholder="Enter Satoshi amount"
            />
            <Button onClick={handleSatoshiToBtcConversion}>
              Convert Satoshis to BTC
            </Button>
          </Card>
        </CodeWrapper>
        <ConsoleWrapper>
          <Console output={`${btcAmount} BTC = ${satoshiAmount} satoshis`} />
        </ConsoleWrapper>
      </ExampleWrapper>

      <SectionTitle>Signature Validation</SectionTitle>
      <p>
        Signature validation is crucial for verifying transaction authenticity.
        Let's validate a signature:
      </p>
      <ExampleWrapper>
        <CodeWrapper>
          <CodeBlock language="typescript">
            {`
       import { isValidSignature } from '@caravan/bitcoin';

       const publicKey = '${publicKey}';
       const message = '${message}';
       const signature = '${signature}';

       const isValid = isValidSignature(publicKey, message, signature);
       console.log('Signature is', isValid ? 'valid' : 'invalid');
                   `}
          </CodeBlock>
          <Card>
            <Input
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              placeholder="Enter Public Key"
            />
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter Message"
            />
            <Input
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Enter Signature"
            />
            <Button onClick={handleSignatureValidation}>
              Validate Signature
            </Button>
          </Card>
        </CodeWrapper>
        <ConsoleWrapper>
          <Console output={signatureValidationResult} />
        </ConsoleWrapper>
      </ExampleWrapper>
    </div>
  );
};

export default BitcoinGuide;
