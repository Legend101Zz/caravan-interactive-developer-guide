import React, { useState } from "react";
import { PsbtV2, autoLoadPSBT, getUnsignedMultisigPsbtV0 } from "@caravan/psbt";
import { Network, P2SH } from "@caravan/bitcoin";

const PsbtGuide: React.FC = () => {
  const [psbt, setPsbt] = useState<PsbtV2 | null>(null);
  const [psbtBase64, setPsbtBase64] = useState("");
  const [psbtJson, setPsbtJson] = useState("");
  const [network, setNetwork] = useState<Network>(Network.TESTNET);
  const [inputs, setInputs] = useState([
    { txid: "", index: 0, amountSats: "" },
  ]);
  const [outputs, setOutputs] = useState([{ address: "", amountSats: "" }]);

  const handleCreatePsbt = () => {
    try {
      const unsignedPsbt = getUnsignedMultisigPsbtV0({
        network,
        inputs: inputs.map((input) => ({
          hash: input.txid,
          index: input.index,
          witnessUtxo: {
            amount: parseInt(input.amountSats),
            script: Buffer.alloc(0),
          },
          transactionHex: "", // Add a dummy transaction hex
          spendingWallet: {
            addressType: P2SH,
            network,
            extendedPublicKeys: [],
            requiredSigners: 2,
            totalSigners: 2,
          },
        })),
        outputs: outputs.map((output) => ({
          address: output.address,
          value: parseInt(output.amountSats),
        })),
      });

      const psbtV2 = PsbtV2.FromV0(unsignedPsbt.toBase64());
      setPsbt(psbtV2);
      setPsbtBase64(psbtV2.serialize());
      setPsbtJson(JSON.stringify(psbtV2, null, 2));
    } catch (error) {
      console.error("Error creating PSBT:", error);
    }
  };

  const handleParsePsbt = () => {
    try {
      const parsedPsbt = new PsbtV2(psbtBase64);
      setPsbt(parsedPsbt);
      setPsbtJson(JSON.stringify(parsedPsbt, null, 2));
    } catch (error) {
      console.error("Error parsing PSBT:", error);
    }
  };

  const handleUpdatePsbtField = (field: string, value: string) => {
    if (psbt) {
      try {
        const updatedPsbt = new PsbtV2(psbt.serialize());
        (updatedPsbt as any)[field] = value;
        setPsbt(updatedPsbt);
        setPsbtBase64(updatedPsbt.serialize());
        setPsbtJson(JSON.stringify(updatedPsbt, null, 2));
      } catch (error) {
        console.error("Error updating PSBT field:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">PSBT Guide</h1>

      <section className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Create PSBT</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Network
          </label>
          <select
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={network}
            onChange={(e) => setNetwork(e.target.value as Network)}
          >
            <option value={Network.TESTNET}>Testnet</option>
            <option value={Network.MAINNET}>Mainnet</option>
          </select>
        </div>

        <h3 className="text-xl font-semibold mb-2">Inputs</h3>
        {inputs.map((input, index) => (
          <div key={index} className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              placeholder="TXID"
              value={input.txid}
              onChange={(e) => {
                const newInputs = [...inputs];
                newInputs[index].txid = e.target.value;
                setInputs(newInputs);
              }}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              type="number"
              placeholder="Index"
              value={input.index}
              onChange={(e) => {
                const newInputs = [...inputs];
                newInputs[index].index = parseInt(e.target.value);
                setInputs(newInputs);
              }}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Amount (sats)"
              value={input.amountSats}
              onChange={(e) => {
                const newInputs = [...inputs];
                newInputs[index].amountSats = e.target.value;
                setInputs(newInputs);
              }}
            />
          </div>
        ))}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() =>
            setInputs([...inputs, { txid: "", index: 0, amountSats: "" }])
          }
        >
          Add Input
        </button>

        <h3 className="text-xl font-semibold mb-2 mt-4">Outputs</h3>
        {outputs.map((output, index) => (
          <div key={index} className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              placeholder="Address"
              value={output.address}
              onChange={(e) => {
                const newOutputs = [...outputs];
                newOutputs[index].address = e.target.value;
                setOutputs(newOutputs);
              }}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Amount (sats)"
              value={output.amountSats}
              onChange={(e) => {
                const newOutputs = [...outputs];
                newOutputs[index].amountSats = e.target.value;
                setOutputs(newOutputs);
              }}
            />
          </div>
        ))}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() =>
            setOutputs([...outputs, { address: "", amountSats: "" }])
          }
        >
          Add Output
        </button>

        <div className="mt-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleCreatePsbt}
          >
            Create PSBT
          </button>
        </div>
      </section>

      <section className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Parse/Edit PSBT</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            PSBT (Base64)
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            value={psbtBase64}
            onChange={(e) => setPsbtBase64(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleParsePsbt}
        >
          Parse PSBT
        </button>

        {psbt && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Edit PSBT Fields</h3>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                PSBT_GLOBAL_TX_VERSION
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                value={psbt.PSBT_GLOBAL_TX_VERSION}
                onChange={(e) =>
                  handleUpdatePsbtField(
                    "PSBT_GLOBAL_TX_VERSION",
                    e.target.value,
                  )
                }
              />
            </div>
          </div>
        )}
      </section>

      {psbtJson && (
        <section className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-semibold mb-4">PSBT JSON</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            {psbtJson}
          </pre>
        </section>
      )}
    </div>
  );
};

export default PsbtGuide;
