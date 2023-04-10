import { TransferTransaction, Transaction } from "@hashgraph/sdk";

import hederaClient from "./hederaClient";

import { setStateLoading, setStateAlertData, getAccDetails } from "../store";

import {
  getErrorMessage,
  sendResponseToBrowser,
  transactionReadableResponse,
} from "../utils/helpers";
import { isEmpty, values } from "lodash";

export const createTransactionFromByte = async ({
  transactionByte,
  message,
}) => {
  try {
    const { accountId, privateKey, network, walletType } = getAccDetails();
    const client = await hederaClient({
      accountId,
      privateKey,
      network,
      walletType,
    });

    let createTransaction;

    if (!isEmpty(transactionByte)) {
      createTransaction = Transaction.fromBytes(
        Uint8Array.from(values(transactionByte))
      );
    } else {
      const transaction = new TransferTransaction();
      createTransaction = transaction.setTransactionMemo(message);
      createTransaction = await transaction.freezeWith(client);
    }
    return createTransaction;
  } catch (err) {
    console.log("Error in Transaction Data", err);
    setStateAlertData({
      title: "Error Creating Transaction",
      type: "error",
      message: getErrorMessage(err.message),
    });
    await sendResponseToBrowser(false, {
      message: "Hex Invalid Transaction",
      data: err.message,
    });
    setStateLoading(false);
  }
};

export const signTransaction = async ({ transaction, submit }) => {
  try {
    setStateLoading(true);
    const { accountId, privateKey, network, walletType } = getAccDetails();
    const client = await hederaClient({
      accountId,
      privateKey,
      network,
      walletType,
    });

    const signTransaction = await createTransactionFromByte({
      transactionByte: transaction,
    });

    await signTransaction.signWithOperator(client);

    const txResponse = submit && (await signTransaction.execute(client));

    const { status } = txResponse && (await txResponse.getReceipt(client));
    const id = txResponse && txResponse.transactionId;

    const readableTxnDetails =
      txResponse &&
      (await transactionReadableResponse({
        status,
        transactionId: id,
      }));

    setStateAlertData({
      title: "Sign Hex",
      type: "success",
      message: "Signed the transaction Successfully",
    });
    await sendResponseToBrowser(true, {
      message: "Signed Successfully",
      data: {
        transactionByte: signTransaction.toBytes(),
        transactionReceipt: txResponse && { ...readableTxnDetails },
        accountId,
      },
    });
    setStateLoading(false);
  } catch (err) {
    console.log("Error in signing", err);
    setStateAlertData({
      title: "Error Signing Transaction",
      type: "error",
      message: getErrorMessage(err.message),
    });
    await sendResponseToBrowser(false, {
      message: "Hex Signing Failed",
      data: err.message,
    });
    setStateLoading(false);
  }
};
