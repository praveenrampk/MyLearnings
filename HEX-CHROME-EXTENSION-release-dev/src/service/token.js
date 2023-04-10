import {
  Hbar,
  TokenInfoQuery,
  TokenAssociateTransaction,
  TokenDissociateTransaction,
  TokenCreateTransaction,
  TransferTransaction,
  TokenMintTransaction,
  TokenBurnTransaction,
  TokenWipeTransaction,
  TokenDeleteTransaction,
  TokenGrantKycTransaction,
  TokenRevokeKycTransaction,
  TokenFreezeTransaction,
  TokenUnfreezeTransaction,
} from "@hashgraph/sdk";
import { get, groupBy, isEmpty, some, sumBy, toArray } from "lodash";

import hederaClient from "./hederaClient";
import { fileCreate } from "./files";
import { updateTokenDetails } from "./accounts/info";

import { setStateAlertData, setStateLoading, getAccDetails } from "../store";
import { tokenCreatingFee, tradingFee, tokenTypes } from "../utils/constants";
import {
  formatAccountID,
  getErrorMessage,
  getKeysByNetwork,
  sendResponseToBrowser,
  transactionReadableResponse,
} from "../utils/helpers";

export const tokenGetInfo = async ({ client, tokenId }) => {
  try {
    const info = await new TokenInfoQuery().setTokenId(tokenId).execute(client);
    return info;
  } catch (err) {
    console.log("Error in tokenGetInfo", err);
  }
};

export const tokenAssociate = async ({ tokenId }) => {
  try {
    setStateLoading(true);

    const { accountId, privateKey, network, walletType } = getAccDetails();

    const { status, transactionId } = await tokenAssociateLocal({
      tokenId,
      accountId,
      privateKey,
      network,
      walletType,
    });

    await updateTokenDetails({ tokenId });

    const readableTxnDetails = await transactionReadableResponse({
      status,
      transactionId,
    });

    setStateAlertData({
      title: "Add Token",
      type: "success",
      message: `Added token with id <b>${tokenId}</b> to account successfully !`,
    });
    sendResponseToBrowser(true, {
      message: "Token added Successfully",
      type: "onTransaction",
      data: {
        ...readableTxnDetails,
        params: {
          tokenId,
        },
      },
    });
    setStateLoading(false);
  } catch (err) {
    console.log("Error in associating token", err);
    setStateAlertData({
      title: "Add Token",
      type: "error",
      message: getErrorMessage(err.message),
    });
    sendResponseToBrowser(false, {
      message: "Error Associating Token",
      type: "onTransaction",
      data: err.message,
    });
    setStateLoading(false);
  }
};

export const tokenAssociateLocal = async ({
  tokenId,
  accountId,
  privateKey,
  network,
  walletType,
}) => {
  const client = await hederaClient({
    accountId,
    privateKey,
    network,
    walletType,
  });

  const response = await new TokenAssociateTransaction()
    .setTokenIds([tokenId])
    .setAccountId(accountId)
    .execute(client);

  const { status } = await response.getReceipt(client);
  const { transactionId } = response;
  return { status, transactionId };
};

export const tokenDissociate = async ({ tokenId }) => {
  try {
    setStateLoading(true);

    const { accountId, privateKey, network, walletType } = getAccDetails();

    const client = await hederaClient({
      accountId,
      privateKey,
      network,
      walletType,
    });

    const response = await new TokenDissociateTransaction()
      .setTokenIds([tokenId])
      .setAccountId(accountId)
      .execute(client);
    const { status } = await response.getReceipt(client);
    const { transactionId } = response;

    await updateTokenDetails({ tokenId, isRemove: true });

    const readableTxnDetails = await transactionReadableResponse({
      status,
      transactionId,
    });

    setStateAlertData({
      title: "Remove Token",
      type: "success",
      message: `Removed token with id <b>${tokenId}</b> from account successfully !`,
    });
    sendResponseToBrowser(true, {
      message: "Token removed Successfully",
      type: "onTransaction",
      data: {
        ...readableTxnDetails,
        params: {
          tokenId,
        },
      },
    });
    setStateLoading(false);
  } catch (err) {
    console.log("Error in dissociate token", err);
    setStateAlertData({
      title: "Remove Token",
      type: "error",
      message: getErrorMessage(err.message),
    });
    sendResponseToBrowser(false, {
      message: "Error Dissociating Token",
      type: "onTransaction",
      data: err.message,
    });
    setStateLoading(false);
  }
};

export const tokenCreate = async (data) => {
  try {
    setStateLoading(true);

    const { accountId, privateKey, network, walletType } = getAccDetails();

    const client = await hederaClient({
      accountId,
      privateKey,
      network,
      walletType,
    });

    const { tokenId, status, transactionId } = await createTokenLocal({
      data,
      accountId,
      client,
      network,
      walletType,
    });

    const token = tokenId.toString();

    const readableTxnDetails = await transactionReadableResponse({
      status,
      transactionId,
    });

    setTimeout(async () => {
      await updateTokenDetails({ tokenId: token });

      setStateAlertData({
        title: "Create Token",
        type: "success",
        message: `Created token with id <b>${token}</b> successfully !`,
      });
      setStateLoading(false);
    }, 6000);
    sendResponseToBrowser(true, {
      message: "Token Created Successfully",
      type: "onTransaction",
      data: {
        ...readableTxnDetails,
        tokenId: token,
        params: { ...data },
      },
    });
  } catch (err) {
    console.log("Error in create token", err);
    setStateAlertData({
      title: "Create Token",
      type: "error",
      message: getErrorMessage(err.message),
    });
    sendResponseToBrowser(false, {
      message: "Error Creating Token",
      type: "onTransaction",
      data: err.message,
    });
    setStateLoading(false);
  }
};

export const createTokenLocal = async ({
  data,
  accountId,
  client,
  network,
  walletType,
}) => {
  const { operatorId, hexTokenId } = getKeysByNetwork({ network });

  const autoRenewPeriod = 7776000; // set to default 3 months

  const publicKey = client.operatorPublicKey;

  const transaction = new TransferTransaction();

  if (walletType === "hardware") {
    transaction
      .addHbarTransfer(accountId, new Hbar(-5))
      .addHbarTransfer(operatorId, new Hbar(5));
  } else if (operatorId !== accountId) {
    transaction
      .addTokenTransfer(hexTokenId, accountId, -tokenCreatingFee)
      .addTokenTransfer(hexTokenId, operatorId, tokenCreatingFee);
  }

  const txResponse = await transaction.freezeWith(client).execute(client);
  await txResponse.getReceipt(client);

  const tx = new TokenCreateTransaction();
  tx.setTokenName(data.name);
  tx.setTokenSymbol(data.symbol.toUpperCase());
  tx.setDecimals(data.decimal);
  tx.setInitialSupply(data.initialSupply);
  tx.setTreasuryAccountId(accountId);
  tx.setAutoRenewAccountId(accountId);
  tx.setAutoRenewPeriod(autoRenewPeriod);
  tx.setFreezeDefault(data.defaultFreeze);

  if (data.admin) tx.setAdminKey(publicKey);
  if (data.kyc) tx.setKycKey(publicKey);
  if (data.freeze) tx.setFreezeKey(publicKey);
  if (data.wipe) tx.setWipeKey(publicKey);
  if (data.supply) tx.setSupplyKey(publicKey);

  await tx.signWithOperator(client);

  const response = await tx.execute(client);
  const { status, tokenId } = await response.getReceipt(client);
  const { transactionId } = response;

  return { status, transactionId, tokenId };
};

export const createNFTToken = async ({
  fileData,
  name,
  setProgressPercent,
  storageType
}) => {
  try {
    setStateLoading(true, storageType === "hedera");

    const { accountId, privateKey, network, walletType } = getAccDetails();

    const client = await hederaClient({
      accountId,
      privateKey,
      network,
      walletType,
    });

    const fileId = await fileCreate({
      client,
      privateKey,
      fileData: JSON.stringify(fileData),
      setProgressPercent,
      storageType
    });

    const symbol = storageType === "hedera" ? `hedera://${fileId}` : `ipfs://${fileId}`;

    const { tokenId, status, transactionId } = await createTokenLocal({
      data: {
        name,
        symbol: symbol,
        decimal: 0,
        initialSupply: 1,
        defaultFreeze: false,
      },
      accountId,
      client,
      network,
      walletType,
    });

    const token = tokenId.toString();

    setTimeout(async () => {
      await updateTokenDetails({ tokenId: token });
      setStateAlertData({
        title: "Create Token",
        type: "success",
        message: `Created token with id <b>${token}</b> successfully !`,
      });
      setStateLoading(false);
    }, 6000);

    const readableTxnDetails = await transactionReadableResponse({
      status,
      transactionId,
    });

    sendResponseToBrowser(true, {
      message: "NFT Created Successfully",
      type: "onTransaction",
      data: {
        ...readableTxnDetails,
        tokenId: token,
        params: {
          name,
          symbol: symbol,
          decimal: 0,
          initialSupply: 1,
          defaultFreeze: false,
        },
      },
    });
  } catch (err) {
    console.log("Error in create token", err);
    setStateAlertData({
      title: "Create Token",
      type: "error",
      message: getErrorMessage(err.message),
    });
    sendResponseToBrowser(false, {
      message: "Error Creating NFT",
      type: "onTransaction",
      data: err.message,
    });
    setStateLoading(false);
  }
};

export const tokenTransfer = async ({ transfers, memo }) => {
  try {
    setStateLoading(true);

    const { accountId, privateKey, network, walletType } = getAccDetails();

    const client = await hederaClient({
      accountId,
      privateKey,
      network,
      walletType,
    });

    const { operatorId, hexTokenId } = getKeysByNetwork({ network });
    const transaction = new TransferTransaction();

    const groupedTokens = toArray(groupBy(transfers, "tokenId"));

    const calculateDecimal = (decimals, amountToCal) => {
      if (decimals)
        return Number(amountToCal) * parseInt("1".padEnd(decimals + 1, "0"));
      else return Number(amountToCal);
    };

    let amountForOperator = tradingFee;

    groupedTokens.forEach((tokenGroup) => {
      let amount = sumBy(tokenGroup, function (token) {
        return Number(get(token, "amount", 0));
      });
      const tokenId = formatAccountID(get(tokenGroup[0], "tokenId", ""));
      const serialNo = get(tokenGroup[0], "serialNo", "");
      const decimals = Number(get(tokenGroup[0], "decimals", 0));
      amount = calculateDecimal(decimals, amount);
      const totalAmount = amount + tradingFee;

      if (tokenId === hexTokenId) {
        const amountToSend = operatorId === accountId ? amount : totalAmount;
        transaction.addTokenTransfer(hexTokenId, accountId, -amountToSend);
        tokenGroup.forEach((eachTransaction) => {
          const transferTo = formatAccountID(
            get(eachTransaction, "transferTo", "")
          );
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
            transaction.addTokenTransfer(tokenId, accountId, -amount);
            tokenGroup.forEach((eachTransaction) => {
              const transferTo = formatAccountID(
                get(eachTransaction, "transferTo", 0)
              );
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

    if (operatorId !== accountId && walletType !== "hardware") {
      if (
        !some(transfers, function (eachTransfer) {
          return eachTransfer.tokenId === hexTokenId;
        })
      )
        transaction.addTokenTransfer(hexTokenId, accountId, -amountForOperator);
      transaction.addTokenTransfer(hexTokenId, operatorId, amountForOperator);
    }
    !isEmpty(memo) && transaction.setTransactionMemo(memo);

    transaction.freezeWith(client);

    const signTx = await transaction.signWithOperator(client);
    const txResponse = await signTx.execute(client);
    const { status } = await txResponse.getReceipt(client);
    const { transactionId } = txResponse;

    transfers.forEach((token) => {
      setTimeout(
        async () => await updateTokenDetails({ tokenId: token.tokenId }),
        5000
      );
    });

    setStateAlertData(
      {
        title: "Send Token",
        type: "success",
        message:
          transfers.length > 1
            ? transfers
            : `Transferred <b>${transfers[0].amount}</b> of ${transfers[0].tokenId} to account <b>${transfers[0].transferTo}</b> successfully !`,
      },
      transfers.length > 1 ? "transaction" : "default"
    );

    const readableTxnDetails = await transactionReadableResponse({
      status,
      transactionId,
    });

    sendResponseToBrowser(true, {
      message: "Token Transfer Successful",
      type: "onTransaction",
      data: {
        ...readableTxnDetails,
        params: {
          ...transfers,
        },
      },
    });
    setStateLoading(false);
  } catch (err) {
    console.log("Error in send token", err);
    setStateAlertData({
      title: "Send Token",
      type: "error",
      message: getErrorMessage(err.message),
    });
    sendResponseToBrowser(false, {
      message: "Error Sending Token",
      type: "onTransaction",
      data: err.message,
    });
    setStateLoading(false);
  }
};

export const tokenMint = async ({ tokenId, amount, memo }) => {
  try {
    setStateLoading(true);

    const { accountId, privateKey, network, walletType } = getAccDetails();

    const client = await hederaClient({
      accountId,
      privateKey,
      network,
      walletType,
    });

    const transaction = new TokenMintTransaction()
      .setTokenId(tokenId)
      .setAmount(amount);

    if (!isEmpty(memo)) transaction.setTransactionMemo(memo);

    const response = await transaction.execute(client);
    const { status } = await response.getReceipt(client);

    const { transactionId } = response;

    setTimeout(async () => await updateTokenDetails({ tokenId }), 5000);

    const readableTxnDetails = await transactionReadableResponse({
      status,
      transactionId,
    });

    setStateAlertData({
      title: "Mint Token",
      type: "success",
      message: `Minted <b>${amount}</b> new tokens for <b>${tokenId}</b> successfully !`,
    });
    sendResponseToBrowser(true, {
      message: "Token Minted Successfully",
      type: "onTransaction",
      data: {
        ...readableTxnDetails,
        params: {
          tokenId,
          amount,
        },
      },
    });
    setStateLoading(false);
  } catch (err) {
    console.log("Error in mint token", err);
    setStateAlertData({
      title: "Mint Token",
      type: "error",
      message: getErrorMessage(err.message),
    });
    sendResponseToBrowser(false, {
      message: "Error Minting Token",
      type: "onTransaction",
      data: err.message,
    });
    setStateLoading(false);
  }
};

export const tokenBurn = async ({ tokenId, amount, memo }) => {
  try {
    setStateLoading(true);

    const { accountId, privateKey, network, walletType } = getAccDetails();

    const client = await hederaClient({
      accountId,
      privateKey,
      network,
      walletType,
    });

    const transaction = new TokenBurnTransaction()
      .setTokenId(tokenId)
      .setAmount(amount);

    if (!isEmpty(memo)) transaction.setTransactionMemo(memo);

    const response = await transaction.execute(client);
    const { status } = await response.getReceipt(client);

    const { transactionId } = response;

    setTimeout(async () => await updateTokenDetails({ tokenId }), 5000);

    const readableTxnDetails = await transactionReadableResponse({
      status,
      transactionId,
    });

    setStateAlertData({
      title: "Burn Token",
      type: "success",
      message: `Burned <b>${amount}</b> tokens for <b>${tokenId}</b> successfully !`,
    });
    sendResponseToBrowser(true, {
      message: "Token Burned Successfully",
      type: "onTransaction",
      data: {
        ...readableTxnDetails,
        params: {
          tokenId,
          amount,
        },
      },
    });
    setStateLoading(false);
  } catch (err) {
    console.log("Error in burn token", err);
    setStateAlertData({
      title: "Burn Token",
      type: "error",
      message: getErrorMessage(err.message),
    });
    sendResponseToBrowser(false, {
      message: "Error Burning Token",
      type: "onTransaction",
      data: err.message,
    });
    setStateLoading(false);
  }
};

export const tokenWipe = async ({ tokenId, amount, memo, account }) => {
  try {
    setStateLoading(true);

    const { accountId, privateKey, network, walletType } = getAccDetails();

    const client = await hederaClient({
      accountId,
      privateKey,
      network,
      walletType,
    });

    const transaction = new TokenWipeTransaction()
      .setAccountId(account)
      .setTokenId(tokenId)
      .setAmount(amount);

    if (!isEmpty(memo)) transaction.setTransactionMemo(memo);

    const response = await transaction.execute(client);
    const { status } = await response.getReceipt(client);
    const { transactionId } = response;

    setTimeout(async () => await updateTokenDetails({ tokenId }), 5000);

    const readableTxnDetails = await transactionReadableResponse({
      status,
      transactionId,
    });

    setStateAlertData({
      title: "Wipe Token",
      type: "success",
      message: `Wiped <b>${amount}</b> tokens with id <b>${tokenId}</b> from account <b>${account}</b> successfully !`,
    });
    sendResponseToBrowser(true, {
      message: "Token Wiped Successfully",
      type: "onTransaction",
      data: {
        ...readableTxnDetails,
        params: {
          tokenId,
          amount,
          account,
        },
      },
    });

    setStateLoading(false);
  } catch (err) {
    console.log("Error in wipe token", err);
    setStateAlertData({
      title: "Wipe Token",
      type: "error",
      message: getErrorMessage(err.message),
    });
    sendResponseToBrowser(false, {
      message: "Error Wiping Token",
      type: "onTransaction",
      data: err.message,
    });
    setStateLoading(false);
  }
};

export const tokenDelete = async ({ tokenId, memo }) => {
  try {
    setStateLoading(true);

    const { accountId, privateKey, network, walletType } = getAccDetails();

    const client = await hederaClient({
      accountId,
      privateKey,
      network,
      walletType,
    });

    const transaction = new TokenDeleteTransaction().setTokenId(tokenId);

    if (!isEmpty(memo)) transaction.setTransactionMemo(memo);

    const response = await transaction.execute(client);
    const { status } = await response.getReceipt(client);
    const { transactionId } = response;

    setTimeout(async () => await updateTokenDetails({ tokenId }), 5000);

    const readableTxnDetails = await transactionReadableResponse({
      status,
      transactionId,
    });

    setStateAlertData({
      title: "Delete Token",
      type: "success",
      message: `Deleted token with id <b>${tokenId}</b> successfully !`,
    });
    sendResponseToBrowser(true, {
      message: "Token Deleted Successfully",
      type: "onTransaction",
      data: {
        ...readableTxnDetails,
        params: {
          tokenId,
        },
      },
    });
    setStateLoading(false);
  } catch (err) {
    console.log("Error in delete token", err);
    setStateAlertData({
      title: "Delete Token",
      type: "error",
      message: getErrorMessage(err.message),
    });
    sendResponseToBrowser(false, {
      message: "Error Deleting Token",
      type: "onTransaction",
      data: err.message,
    });
    setStateLoading(false);
  }
};

export const tokenGrantKYC = async ({ tokenId, account, memo }) => {
  try {
    setStateLoading(true);

    const { accountId, privateKey, network, walletType } = getAccDetails();

    const client = await hederaClient({
      accountId,
      privateKey,
      network,
      walletType,
    });

    const transaction = new TokenGrantKycTransaction()
      .setAccountId(account)
      .setTokenId(tokenId);

    if (!isEmpty(memo)) transaction.setTransactionMemo(memo);

    const response = await transaction.execute(client);
    const { status } = await response.getReceipt(client);
    const { transactionId } = response;

    const readableTxnDetails = await transactionReadableResponse({
      status,
      transactionId,
    });

    setStateAlertData({
      title: "Grant KYC",
      type: "success",
      message: `Granted KYC for token <b>${tokenId}</b> to account <b>${account}</b> successfully !`,
    });
    sendResponseToBrowser(true, {
      message: "Granted KYC Successfully",
      type: "onTransaction",
      data: {
        ...readableTxnDetails,
        params: {
          tokenId,
          account,
        },
      },
    });
    setStateLoading(false);
  } catch (err) {
    console.log("Error in grant KYC", err);
    setStateAlertData({
      title: "Grant KYC",
      type: "error",
      message: getErrorMessage(err.message),
    });
    sendResponseToBrowser(false, {
      message: "Error Granting KYC for Token",
      type: "onTransaction",
      data: err.message,
    });
    setStateLoading(false);
  }
};

export const tokenRevokeKYC = async ({ tokenId, account, memo }) => {
  try {
    setStateLoading(true);

    const { accountId, privateKey, network, walletType } = getAccDetails();

    const client = await hederaClient({
      accountId,
      privateKey,
      network,
      walletType,
    });

    const transaction = new TokenRevokeKycTransaction()
      .setAccountId(account)
      .setTokenId(tokenId);

    if (!isEmpty(memo)) transaction.setTransactionMemo(memo);

    const response = await transaction.execute(client);
    const { status } = await response.getReceipt(client);
    const { transactionId } = response;

    const readableTxnDetails = await transactionReadableResponse({
      status,
      transactionId,
    });

    setStateAlertData({
      title: "Revoke KYC",
      type: "success",
      message: `Revoked KYC for token <b>${tokenId}</b> to account <b>${account}</b> successfully !`,
    });
    sendResponseToBrowser(true, {
      message: "Revoked KYC Successfully",
      type: "onTransaction",
      data: {
        ...readableTxnDetails,
        params: {
          tokenId,
          account,
        },
      },
    });
    setStateLoading(false);
  } catch (err) {
    console.log("Error in revoke KYC", err);
    setStateAlertData({
      title: "Revoke KYC",
      type: "error",
      message: getErrorMessage(err.message),
    });
    sendResponseToBrowser(false, {
      message: "Error Revoking Token",
      type: "onTransaction",
      data: err.message,
    });
    setStateLoading(false);
  }
};

export const tokenFreeze = async ({ tokenId, account, memo }) => {
  try {
    setStateLoading(true);

    const { accountId, privateKey, network, walletType } = getAccDetails();

    const client = await hederaClient({
      accountId,
      privateKey,
      network,
      walletType,
    });

    const transaction = new TokenFreezeTransaction()
      .setAccountId(account)
      .setTokenId(tokenId);

    if (!isEmpty(memo)) transaction.setTransactionMemo(memo);

    const response = await transaction.execute(client);
    const { status } = await response.getReceipt(client);
    const { transactionId } = response;

    const readableTxnDetails = await transactionReadableResponse({
      status,
      transactionId,
    });

    setStateAlertData({
      title: "Token Freeze",
      type: "success",
      message: `Freezed token <b>${tokenId}</b> for account <b>${account}</b> successfully !`,
    });
    sendResponseToBrowser(true, {
      message: "Token Freezed Successfully",
      type: "onTransaction",
      data: {
        ...readableTxnDetails,
        prams: {
          tokenId,
          account,
        },
      },
    });
    setStateLoading(false);
  } catch (err) {
    console.log("Error in token freeze", err);
    setStateAlertData({
      title: "Token Freeze",
      type: "error",
      message: getErrorMessage(err.message),
    });
    sendResponseToBrowser(false, {
      message: "Error Freezing Token",
      type: "onTransaction",
      data: err.message,
    });
    setStateLoading(false);
  }
};

export const tokenUnfreeze = async ({ tokenId, account, memo }) => {
  try {
    setStateLoading(true);

    const { accountId, privateKey, network, walletType } = getAccDetails();

    const client = await hederaClient({
      accountId,
      privateKey,
      network,
      walletType,
    });

    const transaction = new TokenUnfreezeTransaction()
      .setAccountId(account)
      .setTokenId(tokenId);

    if (!isEmpty(memo)) transaction.setTransactionMemo(memo);

    const response = await transaction.execute(client);
    const { status } = await response.getReceipt(client);
    const { transactionId } = response;

    const readableTxnDetails = await transactionReadableResponse({
      status,
      transactionId,
    });

    setStateAlertData({
      title: "Token Unfreeze",
      type: "success",
      message: `Unfreezed token <b>${tokenId}</b> for account <b>${account}</b> successfully !`,
    });
    sendResponseToBrowser(true, {
      message: "Token UnFreezed Successfully",
      type: "onTransaction",
      data: {
        ...readableTxnDetails,
        params: {
          tokenId,
          account,
        },
      },
    });
    setStateLoading(false);
  } catch (err) {
    console.log("Error in token Unfreeze", err);
    setStateAlertData({
      title: "Token Unfreeze",
      type: "error",
      message: getErrorMessage(err.message),
    });
    sendResponseToBrowser(false, {
      message: "Error UnFreezing Token",
      type: "onTransaction",
      data: err.message,
    });
    setStateLoading(false);
  }
};
