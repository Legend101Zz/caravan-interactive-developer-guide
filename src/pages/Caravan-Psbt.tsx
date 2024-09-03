import React, { useState } from "react";
import { PsbtV2, autoLoadPSBT, getUnsignedMultisigPsbtV0 } from "@caravan/psbt";
import { Network, P2SH } from "@caravan/bitcoin";
import styled from "styled-components";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";

const StyledPsbtGuide = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

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
    <StyledPsbtGuide>
      <Title>PSBT Guide</Title>

      <Card>
        <h2>Create PSBT</h2>
        <Select
          value={network}
          onChange={(e) => setNetwork(e.target.value as Network)}
        >
          <option value={Network.TESTNET}>Testnet</option>
          <option value={Network.MAINNET}>Mainnet</option>
        </Select>

        <h3>Inputs</h3>
        {inputs.map((input, index) => (
          <div key={index}>
            <Input
              placeholder="TXID"
              value={input.txid}
              onChange={(e) => {
                const newInputs = [...inputs];
                newInputs[index].txid = e.target.value;
                setInputs(newInputs);
              }}
            />
            <Input
              type="number"
              placeholder="Index"
              value={input.index}
              onChange={(e) => {
                const newInputs = [...inputs];
                newInputs[index].index = parseInt(e.target.value);
                setInputs(newInputs);
              }}
            />
            <Input
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
        <Button
          onClick={() =>
            setInputs([...inputs, { txid: "", index: 0, amountSats: "" }])
          }
        >
          Add Input
        </Button>

        <h3>Outputs</h3>
        {outputs.map((output, index) => (
          <div key={index}>
            <Input
              placeholder="Address"
              value={output.address}
              onChange={(e) => {
                const newOutputs = [...outputs];
                newOutputs[index].address = e.target.value;
                setOutputs(newOutputs);
              }}
            />
            <Input
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
        <Button
          onClick={() =>
            setOutputs([...outputs, { address: "", amountSats: "" }])
          }
        >
          Add Output
        </Button>

        <Button onClick={handleCreatePsbt}>Create PSBT</Button>
      </Card>

      <Card>
        <h2>Parse/Edit PSBT</h2>
        <TextArea
          value={psbtBase64}
          onChange={(e) => setPsbtBase64(e.target.value)}
          placeholder="Enter PSBT (Base64)"
        />
        <Button onClick={handleParsePsbt}>Parse PSBT</Button>

        {psbt && (
          <div>
            <h3>Edit PSBT Fields</h3>
            <Input
              type="number"
              value={psbt.PSBT_GLOBAL_TX_VERSION}
              onChange={(e) =>
                handleUpdatePsbtField("PSBT_GLOBAL_TX_VERSION", e.target.value)
              }
              placeholder="PSBT_GLOBAL_TX_VERSION"
            />
          </div>
        )}
      </Card>

      {psbtJson && (
        <Card>
          <h2>PSBT JSON</h2>
          <pre>{psbtJson}</pre>
        </Card>
      )}
    </StyledPsbtGuide>
  );
};

export default PsbtGuide;
