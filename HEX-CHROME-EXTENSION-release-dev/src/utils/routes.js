export const frontendRoutes = {
  home: "/",
  dashboard: "/dashboard",
  sendBatch: "/send-batch",
  import: "/import/:keyType",
  createWallet: "/create-wallet/:walletType",
  swap: "/swap",
  login: "/login",
  comingSoon: "/coming-soon",
  hiddenTokens: "/token/hidden",
  export: "/export",
  hardwareWallet: "/hardware-wallet",
  connectMetamask: "/metamask/connect",
  token: "/token",
  approve: "/approve",
  signHex: "/sign",
};

export const backendRoutes = {
  accountCreate: "/account/create",
  tokenITO: "/token/ito",
  buySellHex: "/hex",
  tfa: "/tfa",
  prices: "/prices",
  createCaptcha: "/captcha/create",
  verifyCaptcha: "/captcha/verify",
  ethTransaction: "/eth-transactions",
  mirrorNodeData: "/mirrornode-data"
};
