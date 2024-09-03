import React, { useState } from "react";
import * as Bitcoin from "@caravan/bitcoin";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";

const StyledBitcoinGuide = styled(motion.div)`
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
  const [bip32Path, setBip32Path] = useState("m/44'/0'/0'/0/0");
  const [derivedPublicKey, setDerivedPublicKey] = useState("");

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
      const childPublicKey = Bitcoin.deriveChildPublicKey(
        extendedPublicKey,
        bip32Path,
        network,
      );
      setDerivedPublicKey(childPublicKey);
    } catch (error) {
      setDerivedPublicKey(
        `Error: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  };

  return (
    <StyledBitcoinGuide
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
        Bitcoin Guide
      </Title>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <h2>Network Selection</h2>
          <Select
            value={network}
            onChange={(e) => setNetwork(e.target.value as Bitcoin.Network)}
          >
            <option value={Bitcoin.Network.MAINNET}>Mainnet</option>
            <option value={Bitcoin.Network.TESTNET}>Testnet</option>
          </Select>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <h2>Address Validation</h2>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Bitcoin address"
          />
          <Button onClick={handleValidateAddress}>Validate Address</Button>
          {addressValidationResult && <p>{addressValidationResult}</p>}
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <h2>Public Key Validation</h2>
          <Input
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
            placeholder="Enter public key in hex format"
          />
          <Button onClick={handleValidatePublicKey}>Validate Public Key</Button>
          {publicKeyValidationResult && <p>{publicKeyValidationResult}</p>}
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <h2>BIP32 Key Derivation</h2>
          <Input
            value={extendedPublicKey}
            onChange={(e) => setExtendedPublicKey(e.target.value)}
            placeholder="Enter extended public key"
          />
          <Input
            value={bip32Path}
            onChange={(e) => setBip32Path(e.target.value)}
            placeholder="Enter BIP32 derivation path"
          />
          <Button onClick={handleDeriveChildPublicKey}>
            Derive Child Public Key
          </Button>
          {derivedPublicKey && (
            <div>
              <h3>Derived Public Key:</h3>
              <p>{derivedPublicKey}</p>
            </div>
          )}
        </Card>
      </motion.div>
    </StyledBitcoinGuide>
  );
};

export default BitcoinGuide;
