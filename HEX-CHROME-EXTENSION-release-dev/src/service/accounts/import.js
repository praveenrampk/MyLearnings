import { PrivateKey, TransferTransaction } from "@hashgraph/sdk";
import { get } from "lodash";

import { setStateAlertData, setStateLoading } from "../../store";
import { lock } from "../crypto";
import { getAccountInfo } from "./info";
import { getErrorMessage } from "../../utils/helpers";
import hederaClient from "../hederaClient";

const testClient = async (data) => {
  const client = await hederaClient({
    ...data,
  });

  const tx = await new TransferTransaction()
    .addHbarTransfer(get(data, "accountId", ""), 0)
    .setMaxTransactionFee(1)
    .execute(client);

  await tx.getReceipt(client);

  return true;
};

const importUsingSeedPhraseHandler = async (data) => {
  let privateKey = "";
  let error = false;

  const key = await PrivateKey.fromMnemonic(get(data, "secretKey", ""));
  const possibleKeys = [key];

  if (key.isDerivable()) possibleKeys.push(await key.derive(0));

  for (let i = 0; i < possibleKeys.length; i++) {
    try {
      const result = await testClient({
        accountId: get(data, "accountId", ""),
        privateKey: possibleKeys[i].toString(),
        network: get(data, "network", ""),
      });

      if (result) {
        error = false;
        privateKey = possibleKeys[i].toString();
        break;
      }
    } catch (err) {
      error = err;
    }
  }

  if (error) throw new Error(error.message);
  else {
    await lock({
      ...data,
      secretKey: privateKey,
    });
    await getAccountInfo({
      ...data,
      privateKey: privateKey,
    });
  }
};

const importUsingPrivateKeyHandler = async (data) => {
  let privateKey = "";

  if (get(data, "walletType", "") !== "hardware") {
    privateKey = get(data, "secretKey", "");

    // eslint-disable-next-line
    const checkSigKey = PrivateKey.fromString(privateKey);
  }

  await lock({
    ...data,
    secretKey: privateKey,
  });
  await getAccountInfo({
    ...data,
    privateKey,
  });
};

const importAccount = async (data) => {
  try {
    setStateLoading(true);
    const walletType =
      get(data, "keyType", "") !== "hardware"
        ? "software"
        : get(data, "keyType", "");

    switch (get(data, "keyType", "")) {
      case "seed-phrase":
        await importUsingSeedPhraseHandler({
          ...data,
          walletType,
        });
        break;
      case "private-key":
      default:
        await importUsingPrivateKeyHandler({
          ...data,
          walletType,
        });
    }

    setStateLoading(false);
  } catch (err) {
    console.log("Error in import account", err);
    setStateAlertData({
      title: "Import Wallet",
      type: "error",
      message: getErrorMessage(err.message),
    });
    setStateLoading(false);
  }
};

export default importAccount;
