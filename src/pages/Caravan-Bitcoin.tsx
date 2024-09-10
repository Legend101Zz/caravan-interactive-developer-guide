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
  const [totalSigners, setTotalSigners] = useState(2);
  const [multisigAddress, setMultisigAddress] = useState("");
  const [bip32Path, setBip32Path] = useState("m/0'/0'/0'");
  const [bip32ValidationResult, setBip32ValidationResult] = useState("");
  const [btcAmount, setBtcAmount] = useState("");
  const [satoshiAmount, setSatoshiAmount] = useState("");
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [signatureValidationResult, setSignatureValidationResult] =
    useState("");
  const [numInputs, setNumInputs] = useState(2);
  const [numOutputs, setNumOutputs] = useState(2);
  const [addressType, setAddressType] = useState(Bitcoin.P2SH);

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
      setChildPublicKey(
        `Error: ${error instanceof Error ? error.message : String(error)}`,
      );
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
      // @ts-ignore
      setMultisigAddress(address.address);
    } catch (error) {
      setMultisigAddress(
        `Error: ${error instanceof Error ? error.message : String(error)}`,
      );
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
      // @ts-ignore
      const isValid = Bitcoin.isValidSignature(publicKey, message, signature);
      setSignatureValidationResult(
        isValid ? "Signature is valid" : "Signature is invalid",
      );
    } catch (error) {
      setSignatureValidationResult(
        `Error: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  };

  const handleFeeEstimation = () => {
    try {
      const feeEstimate = Bitcoin.estimateMultisigTransactionFee({
        addressType,
        numInputs,
        numOutputs,
        m: requiredSigners,
        n: publicKeys.filter((pk) => pk !== "").length,
        feesPerByteInSatoshis: feeRate,
      });
      setFeeValidationResult(`Estimated fee: ${feeEstimate} satoshis`);
    } catch (error) {
      setFeeValidationResult(
        `Error: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  };

  return (
    <div>
      <h1>Bitcoin Guide</h1>
      <p>
        Welcome to the interactive Bitcoin Guide for Caravan! This guide will
        help you understand the core concepts and functionalities that power
        Caravan's Bitcoin Package provides. By exploring these examples, you'll
        gain practical insights into Bitcoin transactions, address management,
        and security measures.
      </p>

      <SectionTitle>Address Validation</SectionTitle>
      <p>
        In Caravan, ensuring the correctness of Bitcoin addresses is crucial for
        secure transactions. This section demonstrates how Caravan validates
        addresses across different networks.
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
        Public keys are the foundation of Bitcoin's security model. In Caravan,
        we use public keys to create multisig wallets and verify signatures.
        Let's explore how to validate them:
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
        Caravan uses extended public keys (xpubs) to generate multiple addresses
        without exposing private keys. This is essential for maintaining privacy
        and security in a multisig setup. Let's see how child public keys are
        derived:
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
        Accurate fee estimation is crucial for timely transaction confirmation.
        Caravan calculates fees based on transaction complexity, especially for
        multisig setups. Experiment with different parameters to understand how
        they affect the fee:
      </p>
      <ExampleWrapper>
        <CodeWrapper>
          <CodeBlock language="typescript">
            {`
        import { estimateMultisigTransactionFee } from '@caravan/bitcoin';

        const feeEstimate = estimateMultisigTransactionFee({
          addressType: '${addressType}',
          numInputs: ${numInputs},
          numOutputs: ${numOutputs},
          m: ${requiredSigners},
          n: ${totalSigners},
          feesPerByteInSatoshis: '${feeRate}'
        });

        console.log('Estimated fee:', feeEstimate, 'satoshis');
              `}
          </CodeBlock>
          <Card>
            <Select
              value={addressType}
              onChange={(e) =>
                setAddressType(e.target.value as Bitcoin.MultisigAddressType)
              }
            >
              <option value={Bitcoin.P2SH}>P2SH</option>
              <option value={Bitcoin.P2SH_P2WSH}>P2SH-P2WSH</option>
              <option value={Bitcoin.P2WSH}>P2WSH</option>
            </Select>
            <Input
              type="number"
              value={numInputs}
              onChange={(e) => setNumInputs(Number(e.target.value))}
              placeholder="Number of Inputs"
            />
            <Input
              type="number"
              value={numOutputs}
              onChange={(e) => setNumOutputs(Number(e.target.value))}
              placeholder="Number of Outputs"
            />
            <Input
              type="number"
              value={requiredSigners}
              onChange={(e) => {
                const value = Number(e.target.value);
                setRequiredSigners(Math.min(value, totalSigners));
              }}
              placeholder="Required Signers (M)"
            />
            <Input
              type="number"
              value={totalSigners}
              onChange={(e) => {
                const value = Number(e.target.value);
                setTotalSigners(Math.max(value, requiredSigners));
              }}
              placeholder="Total Signers (N)"
            />
            <Input
              value={feeRate}
              onChange={(e) => setFeeRate(e.target.value)}
              placeholder="Fee Rate (satoshis/byte)"
            />
            <Button onClick={handleFeeEstimation}>Estimate Fee</Button>
          </Card>
        </CodeWrapper>
        <ConsoleWrapper>
          <Console output={feeValidationResult} />
        </ConsoleWrapper>
      </ExampleWrapper>

      <SectionTitle>Multisig Address Generation</SectionTitle>
      <p>
        Multisig addresses are at the core of Caravan's security model. They
        require multiple signatures to spend funds, distributing trust and
        reducing single points of failure. Let's create a multisig address:
      </p>
      <ExampleWrapper>
        <CodeWrapper>
          <CodeBlock language="typescript">
            {`
        import { generateMultisigFromPublicKeys, Network } from '@caravan/bitcoin';

        const publicKeys = ${JSON.stringify(publicKeys.slice(0, totalSigners))};
        const requiredSigners = ${requiredSigners};
        const totalSigners = ${totalSigners};
        const network = Network.${network};

        const multisig = generateMultisigFromPublicKeys(
          network,
          '${addressType}',
          requiredSigners,
          ...publicKeys.filter(pk => pk !== '')
        );

        console.log('Multisig Address:', multisig.address);
              `}
          </CodeBlock>
          <Card>
            <Input
              type="number"
              value={totalSigners}
              onChange={(e) => {
                const value = Number(e.target.value);
                setTotalSigners(Math.max(value, requiredSigners));
                if (value > publicKeys.length) {
                  setPublicKeys([
                    ...publicKeys,
                    ...Array(value - publicKeys.length).fill(""),
                  ]);
                } else {
                  setPublicKeys(publicKeys.slice(0, value));
                }
              }}
              placeholder="Total Signers (N)"
            />
            <Input
              type="number"
              value={requiredSigners}
              onChange={(e) => {
                const value = Number(e.target.value);
                setRequiredSigners(Math.min(value, totalSigners));
              }}
              placeholder="Required Signers (M)"
            />
            {publicKeys.slice(0, totalSigners).map((pk, index) => (
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
            <Select
              value={addressType}
              onChange={(e) =>
                setAddressType(e.target.value as Bitcoin.MultisigAddressType)
              }
            >
              <option value={Bitcoin.P2SH}>P2SH</option>
              <option value={Bitcoin.P2SH_P2WSH}>P2SH-P2WSH</option>
              <option value={Bitcoin.P2WSH}>P2WSH</option>
            </Select>
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

      <SectionTitle>Conclusion</SectionTitle>
      <p>
        Congratulations! You've explored the core concepts that power Caravan's
        multisig wallet functionality. Understanding these Bitcoin fundamentals
        is crucial for safely managing your digital assets. Remember, Caravan
        combines these elements to provide a secure, transparent, and
        customizable multisig wallet solution.
      </p>
      <p>
        As you continue to use Caravan, you'll see these concepts in action,
        from address generation to transaction signing. Keep experimenting and
        learning to make the most of your Caravan multisig wallet!
      </p>
    </div>
  );
};

export default BitcoinGuide;
