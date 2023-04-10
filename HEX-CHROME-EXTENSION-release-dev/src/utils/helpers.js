/* global chrome */
import { Hbar } from "@hashgraph/sdk";
import {
  onlyNumberRegexPattern,
  errorMessages,
  hexTokenIdMainnet,
  hexTokenIdTestnet,
  usdcTokenIdMainnet,
  usdcTokenIdTestnet
} from "./constants";
import { backendRoutes } from "./routes";

export const truncate = (input, length = 25) =>
  input.length > length ? `${input.substring(0, length)}...` : input;

export const copy = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // To avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
};

export const getDateStringFromTimeStamp = (unixTime) =>
  new Date(unixTime * 1000).toUTCString();

export const getHbarValueFromTinyHbars = (tinyHbar) =>
  Hbar.fromTinybars(tinyHbar).toString();

export const getHbarValuefromNumber = (num) => Hbar.from(num).toString();

export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const formatAccountID = (accountId) => {
  let id = "";
  if (onlyNumberRegexPattern.test(accountId)) id = "0.0." + String(accountId);
  else id = accountId;

  return id;
};

export const getBackendUrl = () => {
  switch (process.env.REACT_APP_ENV) {
    case "dev":
    case "develop":
    case "development":
      return process.env.REACT_APP_BACKEND_DEV;
    case "prod":
    case "product":
    case "production":
      return process.env.REACT_APP_BACKEND_PROD;
    default:
      return process.env.REACT_APP_BACKEND_DEV;
  }
};

export const postData = async (url = "", data = {}) => {
  const backendUrl = getBackendUrl();

  const response = await fetch(backendUrl + url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export const getData = async (url = "", params = {}) => {
  const backendUrl = getBackendUrl();
  const response = await fetch(
    backendUrl +
    url +
    new URLSearchParams({
      ...params,
    }),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
};

export const captchaVerifyURL = () =>
  `${getBackendUrl()}${backendRoutes.verifyCaptcha}`;

export const getErrorMessage = (message) => {
  if (message.includes("invalid format for entity ID"))
    return errorMessages.invalidId;

  if (message.includes("CLA_NOT_SUPPORTED")) return errorMessages.claNotSupport;

  if (message.includes("invalid private key"))
    return errorMessages.invalidPrivateKey;

  if (message.includes("invalid mnemonic"))
    return errorMessages.invalidMnemonic;

  if (
    message.includes("connect ENETUNREACH") ||
    message.includes("api.coingecko.com")
  )
    return errorMessages.cannotGetPrices;

  if (
    message.includes("All promises were rejected")
  )
    return errorMessages.ipfsGatewayError;

  const status = message.split("status ").pop();

  switch (status) {
    case "INSUFFICIENT_PAYER_BALANCE":
      return errorMessages.insufficientBalance;
    case "INSUFFICIENT_TOKEN_BALANCE":
      return errorMessages.insufficientTokenBalance;
    case "INVALID_TOKEN_ID":
      return errorMessages.invalidTokenId;
    case "INVALID_ACCOUNT_ID":
      return errorMessages.invalidAccountId;
    case "TOKEN_NOT_ASSOCIATED_TO_ACCOUNT":
      return errorMessages.tokenNotAssociated;
    case "TokenAlreadyAssociatedToAccount":
      return errorMessages.tokenAlreadyAssociated;
    case "TRANSACTION_REQUIRES_ZERO_TOKEN_BALANCES":
      return errorMessages.requireZeroBalance;
    case "INVALID_SIGNATURE":
      return errorMessages.invalidPrivateKey;
    case "ACCOUNT_DELETED":
      return errorMessages.accountDeleted;
    case "ACCOUNT_IS_TREASURY":
      return errorMessages.treasuryAccount;
    case "INSUFFICIENT_ACCOUNT_BALANCE":
      return errorMessages.insufficientBalance;
    case "TOKEN_HAS_NO_SUPPLY_KEY":
      return errorMessages.immutableSupply;
    case "INVALID_TOKEN_BURN_AMOUNT":
      return errorMessages.invalidBurnAmount;
    case "TOKEN_IS_IMMUTABLE":
      return errorMessages.immutableToken;
    case "ACCOUNT_KYC_NOT_GRANTED_FOR_TOKEN":
      return errorMessages.kycNotGranted;
    case "ACCOUNT_REPEATED_IN_ACCOUNT_AMOUNTS":
      return errorMessages.accountsRepeated;
    case "INVALID_ACCOUNT_AMOUNTS":
      return errorMessages.invalidAmounts;
      case "SENDER_DOES_NOT_OWN_NFT_SERIAL_NO":
        return errorMessages.ownNftSerial;
    default:
      return message;
  }
};

export const nftStorageApiKey = process.env.REACT_APP_NFT_STORAGE_API_KEY;

export const getWrappedSymbol = (cid) => {
  const wrappedSymbol = "ipfs://" + cid.substring(0, 5) + "..." + cid.substring(cid.length - 3, cid.length);
  return wrappedSymbol.toUpperCase();
};

export const getKeysByNetwork = ({ network }) => {
  switch (network.toUpperCase()) {
    case "TESTNET":
      return {
        operatorId: process.env.REACT_APP_OPERATOR_ID_TESTNET,
        mirrorNode: process.env.REACT_APP_MIRROR_NODE_TESTNET,
        transactionHistoryHost:
          process.env.REACT_APP_TRANSACTION_HISTORY_HOST_TESTNET,
        hexTokenId: hexTokenIdTestnet,
        usdcTokenId: usdcTokenIdTestnet,
        superUserId: process.env.REACT_APP_SUPER_USER_ID,
      };
    case "MAINNET":
      return {
        operatorId: process.env.REACT_APP_OPERATOR_ID_MAINNET,
        mirrorNode: process.env.REACT_APP_MIRROR_NODE_MAINNET,
        transactionHistoryHost:
          process.env.REACT_APP_TRANSACTION_HISTORY_HOST_MAINNET,
        hexTokenId: hexTokenIdMainnet,
        usdcTokenId: usdcTokenIdMainnet,
        superUserId: process.env.REACT_APP_SUPER_USER_ID,
      };
    default:
  }
};

export const binaryArrayToJson = (arr) => {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str += String.fromCharCode(parseInt(arr[i]));
  }

  return ["[object object]", "[object Object]", "[Object object]"].includes(str)
    ? {}
    : JSON.parse(str);
};

export const downloadURI = (uri, name) => {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  link.remove();
};

export const secondsToTime = (secs) => {
  const hours = Math.floor(secs / (60 * 60));

  const divisor_for_minutes = secs % (60 * 60);
  const minutes = Math.floor(divisor_for_minutes / 60);

  const divisor_for_seconds = divisor_for_minutes % 60;
  const seconds = Math.ceil(divisor_for_seconds);

  return {
    h: hours,
    m: minutes,
    s: seconds,
  };
};

export const transactionReadableResponse = async ({ status, transactionId }) => {
  return {
    status: status.toString(),
    transactionId: transactionId.toString(),
  };
};

export const sendResponseToBrowser = async (status, message) => {
  new Promise((resolve) => {
    chrome.runtime.sendMessage({
      type: "response",
      status: status ? "success" : "error",
      message,
    });
    resolve();
  });
};

export const sendCancelledResponse = async () => {
  await sendResponseToBrowser(false, {
    message: "Action Restricted by User",
    type: "onCancel",
  });
};

export const publishToBrowser = (data) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { ...data }, function () {});
  });
};
