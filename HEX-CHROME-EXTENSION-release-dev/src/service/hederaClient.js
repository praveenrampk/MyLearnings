import { Client } from "@hashgraph/sdk";
import { signTransaction, getPublicKey } from "./ledger";
import { getStatePublicKey, setStatePublicKey } from "../store";
import { isEmpty, isNull, isUndefined } from "lodash";

const hederaClient = async ({
  accountId,
  privateKey,
  network = "testnet",
  walletType,
}) => {
  let client;
  switch (network.toUpperCase()) {
    case "TESTNET":
      client = Client.forTestnet();
      break;
    case "MAINNET":
      client = Client.forMainnet();
      break;
    default:
      throw new Error('Network must be "testnet" or "mainnet"');
  }

  if (walletType === "hardware") {
    let publicKey = getStatePublicKey();

    if (isUndefined(publicKey) || isNull(publicKey) || isEmpty(publicKey)) {
      publicKey = await getPublicKey();
      setStatePublicKey(publicKey);
    }

    const signer = signTransaction;
    client.setOperatorWith(accountId, publicKey, signer);
  } else client.setOperator(accountId, privateKey);

  return client;
};

export default hederaClient;
