import { TransferTransaction, Hbar, Transaction } from "@hashgraph/sdk";
import { get, groupBy, isEmpty, some, sumBy, toArray } from "lodash";
import Web3 from "web3";

import hederaClient from "./hederaClient";
import { updateTokenDetails, updateHbarBalance } from "./accounts/info";
import { setStateLoading, setStateAlertData, getAccDetails } from "../store";

import {
  postData,
  getErrorMessage,
  getKeysByNetwork,
  getBackendUrl,
  sendResponseToBrowser,
  transactionReadableResponse,
} from "../utils/helpers";
import { backendRoutes } from "../utils/routes";
import { ethAddress, tokenTypes, tradingFee } from "../utils/constants";
import { connectMetamask } from "./metamask";

export const transferBatch = async ({ hbars, tokens, memo }) => {
  try {
    setStateLoading(true);

    let totalAmount = sumBy(hbars, function (hbar) {
      return Number(hbar.amount);
    });

    const { accountId, privateKey, network, walletType } = getAccDetails();

    const client = await hederaClient({
      accountId,
      privateKey,
      network,
      walletType,
    });
    const { operatorId, hexTokenId } = getKeysByNetwork({ network });

    const transaction = new TransferTransaction();
    transaction.addHbarTransfer(accountId, new Hbar(-totalAmount));

    hbars.forEach((data) => {
      transaction.addHbarTransfer(
        data.transferTo,
        new Hbar(Number(data.amount))
      );
    });

    let amountForOperator = tradingFee;

    if (!isEmpty(tokens)) {
      const groupedTokens = toArray(groupBy(tokens, "tokenId"));

      const calculateDecimal = (decimals = 0, amountToCal) =>
        Number(amountToCal) * parseInt("1".padEnd(decimals + 1, "0"));

      groupedTokens.forEach((tokenGroup) => {
        let tokenAmount = sumBy(tokenGroup, function (token) {
          return Number(get(token, "amount", 0));
        });
        const tokenId = get(tokenGroup[0], "tokenId", "");
        const serialNo = get(tokenGroup[0], "serialNo", "");
        const decimals = Number(get(tokenGroup[0], "decimals", 0));
        tokenAmount = calculateDecimal(decimals, tokenAmount);
        const totalTokenAmount = tokenAmount + tradingFee;

        if (tokenId === hexTokenId) {
          const amountToSend =
            operatorId === accountId ? tokenAmount : totalTokenAmount;
          transaction.addTokenTransfer(hexTokenId, accountId, -amountToSend);
          tokenGroup.forEach((eachTransaction) => {
            const transferTo = get(eachTransaction, "transferTo", "");

            const amount = Number(get(eachTransaction, "amount", 0));
            const transferAmount = calculateDecimal(decimals, amount);

            operatorId !== accountId && operatorId === transferTo
              ? (amountForOperator += transferAmount)
              : transaction.addTokenTransfer(
                hexTokenId,
                transferTo,
                transferAmount
              );
          });
        } else {
          switch (get(tokenGroup[0].tokenType, "type", "")) {
            case tokenTypes[0].type:
            case tokenTypes[1].type:
              transaction.addTokenTransfer(tokenId, accountId, -tokenAmount);
              tokenGroup.forEach((eachTransaction) => {
                const transferTo = get(eachTransaction, "transferTo", "");

                const transferAmount = calculateDecimal(
                  decimals,
                  get(eachTransaction, "amount", 0)
                );

                transaction.addTokenTransfer(tokenId, transferTo, transferAmount);
              });
              break;
            case tokenTypes[2].type:
              tokenGroup.forEach((eachTransaction) => {
                const transferTo = get(eachTransaction, "transferTo", "");
                transaction.addNftTransfer(tokenId, serialNo, accountId, transferTo)
              });
              break;
            default:
          }
        }
      });
    }

    if (operatorId !== accountId && walletType !== "hardware") {
      if (
        isEmpty(tokens) ||
        (!isEmpty(tokens) &&
          !some(tokens, (eachTransfer) => eachTransfer.tokenId === hexTokenId))
      ) {
        transaction.addTokenTransfer(hexTokenId, accountId, -amountForOperator);
      }
      transaction.addTokenTransfer(hexTokenId, operatorId, amountForOperator);
    }

    !isEmpty(memo) && transaction.setTransactionMemo(memo);

    const txResponse = await transaction.execute(client);
    const { status } = await txResponse.getReceipt(client);
    const { transactionId } = txResponse;

    await updateHbarBalance();

    tokens.forEach((token) => {
      setTimeout(
        async () => await updateTokenDetails({ tokenId: token.tokenId }),
        5000
      );
    });

    const readableTxnDetails = await transactionReadableResponse({
      status,
      transactionId,
    });

    setStateAlertData(
      {
        title: "Send Batch",
        type: "success",
        message:
          [...hbars, ...tokens].length > 1
            ? [...hbars, ...tokens]
            : !isEmpty(tokens)
              ? `Transferred <b>${tokens[0].amount}</b> of ${tokens[0].tokenId} to account <b>${tokens[0].transferTo}</b> successfully !`
              : `Transferred <b>${hbars[0].amount}</b> of Hbars to account <b>${hbars[0].transferTo}</b> successfully !`,
      },
      [...hbars, ...tokens].length > 1 ? "transaction" : "default"
    );
    await sendResponseToBrowser(true, {
      message: "Batch Transfer Successfull",
      type: "onTransaction",
      data: {
        ...readableTxnDetails,
        params: {
          hbars: { ...hbars },
          tokens: { ...tokens },
        },
      },
    });
    setStateLoading(false);
  } catch (err) {
    console.log("Error in send batch", err);
    setStateAlertData({
      title: "Send Batch",
      type: "error",
      message: getErrorMessage(err.message),
    });
    await sendResponseToBrowser(false, {
      message: "Batch Transfer Failed",
      type: "onTransaction",
      data: err.message,
    });
    setStateLoading(false);
  }
};

const swapFromUsdc = async ({
  amount,
  network,
  memo,
  from,
  client,
  to,
  accountId,
  exchangeAmount,
}) => {
  let chainId, address, transactionHash, transactionId;

  const response = await postData(backendRoutes.buySellHex, {
    network,
    accountId,
    amount,
    memo,
    from,
    to,
    chainId,
    address,
    transactionHash,
    exchangeAmount,
  });

  if (get(response, "code", "") !== 200)
    throw new Error(get(response, "message", ""));


  const transaction = Transaction.fromBytes(
    Uint8Array.from(get(response, "data.transactionBytes.data", []))
  );

  const signedTx = await transaction.signWithOperator(client);
  const txResponse = await signedTx.execute(client);
  await txResponse.getReceipt(client);
  transactionId = txResponse.transactionId.toString();

  return {
    status: "SUCCESS",
    transactionId,
    params: {
      address,
      from,
      to,
      amount,
      accountId,
      exchangeAmount,
    },
  };
};

const swapFromEth = async ({
  amount,
  network,
  memo,
  from,
  to,
  accountId,
  exchangeAmount,
}) => {
  const { provider, accounts, chainId } = await connectMetamask();
  const address = accounts[0];

  const gas = await provider.request({
    method: "eth_estimateGas",
    params: [
      {
        from: address,
        to: ethAddress,
      },
    ],
  });

  const transactionHash = await provider.request({
    method: "eth_sendTransaction",
    params: [
      {
        from: address,
        to: ethAddress,
        value: Web3.utils.toHex(Web3.utils.toWei(amount.toString(), "ether")),
        gas,
        gasPrice: "0x3b9aca00", //"0x9184e72a000"
      },
    ],
  });

  const response = await postData(backendRoutes.buySellHex, {
    network,
    accountId,
    amount,
    memo,
    from,
    to,
    chainId,
    address,
    transactionHash,
    exchangeAmount,
  });

  if (get(response, "code", "") !== 200)
    throw new Error(get(response, "message", ""));

  return {
    status: "SUCCESS",
    params: {
      address,
      from,
      to,
      amount,
      accountId,
      exchangeAmount,
    },
  };
};

const swapFromHexHbar = async ({
  operatorId,
  hexTokenId,
  amount,
  client,
  network,
  accountId,
  memo,
  from,
  to,
  exchangeAmount,
}) => {
  let chainId, address, transactionHash, transactionId;

  if (to === "eth") {
    const metamaskDetails = await connectMetamask();

    address = get(metamaskDetails, "accounts[0]", "");
    chainId = get(metamaskDetails, "chainId", "");

    let balanceData = await fetch(
      getBackendUrl() + `/eth-balance?chainId=${chainId}`
    );
    balanceData = await balanceData.json();

    if (get(balanceData, "data.balance", 0) <= exchangeAmount)
      throw new Error("Ethereum Treasury out of funds !");

    const transaction = new TransferTransaction();

    if (from === "hbar")
      transaction
        .addHbarTransfer(accountId, new Hbar(-amount))
        .addHbarTransfer(operatorId, new Hbar(amount));
    if (from === "hex") {
      const tokenAmount = Math.floor(amount * 100000);
      transaction
        .addTokenTransfer(hexTokenId, accountId, -tokenAmount)
        .addTokenTransfer(hexTokenId, operatorId, tokenAmount);
    }

    if (!isEmpty(memo)) transaction.setTransactionMemo(memo);

    const txResponse = await transaction.execute(client);
    await txResponse.getReceipt(client);

    const txId = txResponse.transactionId.toString().split(".");

    transactionHash = `${txId[0]}.${txId[1]}.${txId[2]}-${txId[3]}`;
  }

  const response = await postData(backendRoutes.buySellHex, {
    network,
    accountId,
    amount,
    memo,
    from,
    to,
    chainId,
    address,
    transactionHash,
    exchangeAmount,
  });

  if (get(response, "code", "") !== 200)
    throw new Error(get(response, "message", ""));

  if (to !== "eth") {
    const transaction = Transaction.fromBytes(
      Uint8Array.from(get(response, "data.transactionBytes.data", []))
    );

    const signedTx = await transaction.signWithOperator(client);
    const txResponse = await signedTx.execute(client);
    await txResponse.getReceipt(client);
    transactionId = txResponse.transactionId.toString();
  }
  return {
    status: "SUCCESS",
    transactionId,
    params: {
      address,
      from,
      to,
      amount,
      accountId,
      exchangeAmount,
    },
  };
};

export const swap = async ({ amount, memo, from, to, exchangeAmount }) => {
  try {
    setStateLoading(true);

    const { accountId, privateKey, network, walletType } = getAccDetails();
    const { operatorId, hexTokenId } = getKeysByNetwork({ network });

    const client = await hederaClient({
      accountId,
      privateKey,
      network,
      walletType,
    });

    let response;

    switch (from) {
      case "eth":
        response = await swapFromEth({
          network,
          accountId,
          from,
          to,
          amount,
          exchangeAmount,
          memo,
        });
        break;
      case "usdc":
        response = await swapFromUsdc({
          network,
          accountId,
          from,
          to,
          amount,
          client,
          exchangeAmount,
          memo,
        });
        break;
      case "hbar":
      case "hex":
        response = await swapFromHexHbar({
          amount,
          client,
          network,
          accountId,
          memo,
          from,
          to,
          exchangeAmount,
          operatorId,
          hexTokenId,
        });
        break;
      default:
    }

    setTimeout(
      async () => await updateTokenDetails({ tokenId: hexTokenId }),
      5000
    );
    if (from === "eth") {
      setStateAlertData({
        title: "Swap",
        type: "pending",
        message: `Your Transactoin is Pending. Please Check in Activities Tab`,
      });
    } else {
      setStateAlertData({
        title: "Swap",
        type: "success",
        message: `Deposited ${exchangeAmount} ${to} to account successfully !`,
      });
    }
    await sendResponseToBrowser(true, {
      message:
        from !== "eth"
          ? "Swapping Done Successfully"
          : "Your Transaction for ETH is started.",
      type: "onTransaction",
      data: {
        ...response,
      },
    });
    setStateLoading(false);
  } catch (err) {
    console.log("Error in Buy or Sell HEX", err);
    setStateAlertData({
      title: "Swap",
      type: "error",
      message: getErrorMessage(err.message),
    });
    await sendResponseToBrowser(false, {
      message: "Error Swapping",
      type: "onTransaction",
      data: err.message,
    });
    setStateLoading(false);
  }
};
