export const networkOptions = [
  {
    id: "testnet",
    label: "HEDERA TESTNET",
  },
  {
    id: "mainnet",
    label: "HEDERA MAINNET",
  },
];

export const tokenTypes = [
  {
    id: "ft",
    label: "Fungible Token",
    type: "FUNGIBLE_COMMON",
  },
  {
    id: "nftv1",
    label: "Non Fungible Token v1",
    type: "NON_FUNGIBLE",
  },
  {
    id: "nft",
    label: "Non Fungible Token",
    type: "NON_FUNGIBLE_UNIQUE",
  },
];

export const nftStorageTypes = [
  {
    id: "hedera",
    label: "Hedera",
    description:
      "The file is entirely on chain but costs more and the process is time consuming. File size should not exceed 1MB",
  },
  {
    id: "filecoin",
    label: "Filecoin",
    description:
      "The files is stored off chain in an decentralized storage service and only the hash is included on chain. Recommended file size <70MB",
  },
];

// export const tfaMethods = [
//   {
//     id: "google",
//     label: "Google Authentication",
//   },
//   {
//     id: "email",
//     label: "Email Authentication",
//   },
// ];

// export const authorizedEmailProviders = [
//   "gmail",
//   "yahoo",
//   "aol",
//   "hotmail",
//   "outlook",
// ];

// export const tfaInfoMessages = {
//   google:
//     "Scan QR code using Google Authenticator app to get the Email Confirmation Code. Make sure you enter a fresh code.",
//   email:
//     "Kindly check your email for Email Confirmation Code. The code will be valid for 5 minutes.",
// };

export const arbitraryMessage =
  "By signing this, you give access to your accountId to the requested origin";

export const emailRegex =
  // eslint-disable-next-line
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const urlRegex = /^[a-z][a-z0-9+.-]*:/;

export const tradingFee = 10000;

export const hexAssociateFee = 0.214499;

export const tradingFeeForHardware = 0.1;

export const tokenCreatingFee = 500000;

export const minHederaFileSize = 100000; //100kb

export const onlyNumberRegexPattern = /^\d+$/;

export const defaultQueryParams = {
  sortBy: "desc",
  from: 0,
  sortOn: "consensusTime",
  size: 10,
};


export const hexTokenIdMainnet = "0.0.148698";
export const hexTokenIdTestnet = "0.0.447200";
export const usdcTokenIdTestnet = "0.0.2276691";
export const usdcTokenIdMainnet = "0.0.456858";

export const errorMessages = {
  insufficientBalance:
    "You don't have enough Hbars. Kindly purchase some at your earliest convenience.",
  insufficientTokenBalance: "You don't have enough tokens.",
  invalidId: "Invalid Account or Token ID.",
  invalidTokenId: "Invalid Token ID.",
  invalidAccountId: "Invalid Account ID.",
  tokenAlreadyAssociated: "Token is already associated to account.",
  tokenNotAssociated: "Token is not associated to account.",
  requireZeroBalance:
    "Token Balance must be zero for transaction to go thorugh.",
  accountDeleted: "Account does not exist.",
  treasuryAccount: "Account is treasury.",
  claNotSupport: "Invalid Operation.",
  invalidPrivateKey: "Invalid Private Key.",
  invalidMnemonic: "Invalid Seed Phrase.",
  immutaleSupply: "Token Supply is immutable.",
  immutableToken: "Token is immutable.",
  invalidBurnAmount: "Invalid Token Burn Amount.",
  kycNotGranted: "KYC not granted for Account.",
  accountsRepeated: "Accounts repeated in Transaction.",
  invalidAmounts: "Invalid amounts.",
  ownNftSerial: "You do not own this token. Check your serial number and try again.",
  cannotGetPrices:
    "Cannot retrieve exchange prices at the moment. Please try again after sometime.",
  ipfsGatewayError: "IPFS Gateway error, please try again later."
};

export const ethereumNetworks = {
  "0x1": "Ethereum Mainnet",
  "0x2": "Morden Test Network",
  "0x3": "Ropsten Test Network",
  "0x4": "Rinkeby Test Network",
  "0x5": "Goerli Test Network",
  "0x2a": "Kovan Test Network",
  default: "Unknown/Private Network",
};

export const tokenOperationsList = [
  { id: "add", label: "Add Token" },
  { id: "remove", label: "Remove Token" },
  { id: "create", label: "Create Token" },
  { id: "send", label: "Send Token" },
  { id: "grantKYC", label: "Grant KYC" },
  { id: "revokeKYC", label: "Revoke KYC" },
  { id: "freeze", label: "Freeze Token" },
  { id: "unfreeze", label: "Unfreeze Token" },
  { id: "mint", label: "Mint Token" },
  { id: "burn", label: "Burn Token" },
  { id: "wipe", label: "Wipe Token" },
  { id: "delete", label: "Delete Token" },
];

export const ethAddress = "0x19F864033578F2E1e12abcB7a0f705FbFb9543f9";

export const activitiesFilters = [
  {
    id: "all",
    title: "All",
    route: "/hedera/api/accounts/{accountId}/transactions?",
  },
  {
    id: "transfers",
    title: "Only Transfers",
    route: "/hedera/api/accounts/{accountId}/transfers?",
  },
  {
    id: "hexTransfers",
    tokenName: "HEX",
    title: "HEX Transfers",
    route: "/hedera/api/hts/tokens/{tokenId}/transfers?",
    params: {
      accountId: "{accountId}",
      sortOn: "transferTime",
    },
  },
  {
    id: "swaps",
    title: "Swaps",
  },
  {
    id: "cryptoCreateAccount",
    title: "Crypto Create Account",
    route: "/hedera/api/transactions?",
    params: {
      query: "{accountId}",
      transactionTypes: "CRYPTO_CREATE_ACCOUNT",
    },
  },
  {
    id: "cryptoUpdateAccount",
    title: "Crypto Update Account",
    route: "/hedera/api/transactions?",
    params: {
      query: "{accountId}",
      transactionTypes: "CRYPTO_UPDATE_ACCOUNT",
    },
  },
  {
    id: "cryptoDeleteAccount",
    title: "Crypto Delete Account",
    route: "/hedera/api/transactions?",
    params: {
      query: "{accountId}",
      transactionTypes: "CRYPTO_DELETE_ACCOUNT",
    },
  },
  {
    id: "cryptoTransfer",
    title: "Crypto Transfer",
    route: "/hedera/api/transactions?",
    params: {
      query: "{accountId}",
      transactionTypes: "CRYPTO_TRANSFER",
    },
  },
  {
    id: "contractCreate",
    title: "Contract Create",
    route: "/hedera/api/transactions?",
    params: {
      query: "{accountId}",
      transactionTypes: "CONTRACT_CREATE",
    },
  },
  {
    id: "contractCall",
    title: "Contract Call",
    route: "/hedera/api/transactions?",
    params: {
      query: "{accountId}",
      transactionTypes: "CONTRACT_CALL",
    },
  },
  {
    id: "contractUpdate",
    title: "Contract Update",
    route: "/hedera/api/transactions?",
    params: {
      query: "{accountId}",
      transactionTypes: "CONTRACT_UPDATE",
    },
  },
  {
    id: "contractDelete",
    title: "Contract Delete",
    route: "/hedera/api/transactions?",
    params: {
      query: "{accountId}",
      transactionTypes: "CONTRACT_DELETE",
    },
  },
  {
    id: "fileCreate",
    title: "File Create",
    route: "/hedera/api/transactions?",
    params: {
      query: "{accountId}",
      transactionTypes: "FILE_CREATE",
    },
  },
  {
    id: "fileAppend",
    title: "File Append",
    route: "/hedera/api/transactions?",
    params: {
      query: "{accountId}",
      transactionTypes: "FILE_APPEND",
    },
  },
  {
    id: "fileUpdate",
    title: "File Update",
    route: "/hedera/api/transactions?",
    params: {
      query: "{accountId}",
      transactionTypes: "FILE_UPDATE",
    },
  },
  {
    id: "fileDelete",
    title: "File Delete",
    route: "/hedera/api/transactions?",
    params: {
      query: "{accountId}",
      transactionTypes: "FILE_DELETE",
    },
  },
  {
    id: "cryptoAddClaim",
    title: "Crypto Add Claim",
    route: "/hedera/api/transactions?",
    params: {
      query: "{accountId}",
      transactionTypes: "CRYPTO_ADD_CLAIM",
    },
  },
  {
    id: "cryptoDeleteClaim",
    title: "Crypto Delete Claim",
    route: "/hedera/api/transactions?",
    params: {
      query: "{accountId}",
      transactionTypes: "CRYPTO_DELETE_CLAIM",
    },
  },
  {
    id: "systemDelete",
    title: "System Delete",
    route: "/hedera/api/transactions?",
    params: {
      query: "{accountId}",
      transactionTypes: "SYSTEM_DELETE",
    },
  },
];

export const version = "0.0.32";

export const mirrorNodeType = ["hedera", "dragonglass"];

export const gateways = [
  "https://dweb.link",
  "https://ipfs.io",
  "https://cloudflare-ipfs.com",
  "https://ipfs.azurewebsites.net",
  "https://ipfs.infura.io",
  "https://gateway.ipfs.io",
  "https://gateway.pinata.cloud",
];
