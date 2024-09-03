import React, { useState } from "react";
import * as Bitcoin from "@caravan/bitcoin";

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
    <div className="space-y-6">
      <section className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Network Selection</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Network
          </label>
          <select
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={network}
            onChange={(e) => setNetwork(e.target.value as Bitcoin.Network)}
          >
            <option value={Bitcoin.Network.MAINNET}>Mainnet</option>
            <option value={Bitcoin.Network.TESTNET}>Testnet</option>
          </select>
        </div>
      </section>

      <section className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Address Validation</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Bitcoin Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Bitcoin address"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleValidateAddress}
        >
          Validate Address
        </button>
        {addressValidationResult && (
          <p className="mt-4 text-sm text-gray-600">
            {addressValidationResult}
          </p>
        )}
      </section>

      <section className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Public Key Validation</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="publicKey"
          >
            Public Key (hex)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="publicKey"
            type="text"
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
            placeholder="Enter public key in hex format"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleValidatePublicKey}
        >
          Validate Public Key
        </button>
        {publicKeyValidationResult && (
          <p className="mt-4 text-sm text-gray-600">
            {publicKeyValidationResult}
          </p>
        )}
      </section>

      <section className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-4">BIP32 Key Derivation</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="extendedPublicKey"
          >
            Extended Public Key
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="extendedPublicKey"
            type="text"
            value={extendedPublicKey}
            onChange={(e) => setExtendedPublicKey(e.target.value)}
            placeholder="Enter extended public key"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="bip32Path"
          >
            BIP32 Derivation Path
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bip32Path"
            type="text"
            value={bip32Path}
            onChange={(e) => setBip32Path(e.target.value)}
            placeholder="Enter BIP32 derivation path"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleDeriveChildPublicKey}
        >
          Derive Child Public Key
        </button>
        {derivedPublicKey && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Derived Public Key:</h3>
            <p className="text-sm text-gray-600 break-all">
              {derivedPublicKey}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default BitcoinGuide;
