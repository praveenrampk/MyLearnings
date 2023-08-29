import { NetworksProps } from '@src/interfaces-and-types/onboarding-flow';

export const MENU = {
  ASSETS: 'assets',
  TRANSACTIONS: 'transactions',
};

export const test = {
  assets: [
    {
      icon: 'hedge',
      name: 'Hedge',
      ticker: 'HEDGE',
      balance: '0',
    },
  ],
};

export const inputFieldsName = [
  'Chain ID',
  'Chain name',
  'New RPC URL',
  'New REST URL',
  'Address Prefix',
  'Native Denom',
  'Coin Type',
  'Decimals',
  'Block explorer URL (Optional)',
];

export const mainNetInputPlaceholders = [
  `Chain name (Ex: Juno)`,
  `Chain ID (Ex: juno-1)`,
  `New RPC URL (Without Trailing Slash)`,
  `New REST URL (Without Trailing Slash)`,
  `Address Prefix (Ex: juno)`,
  `Native Denom (Ex: ujuno)`,
  `Coin Type (Ex: 118)`,
  `Decimals (Ex: 6)`,
  `Block explorer URL (Optional)`,
];

export const testNetInputPlaceholders = [
  `Chain name (Ex: junotestnet)`,
  `Chain ID (Ex: uni-6)`,
  `New RPC URL (Without Trailing Slash)`,
  `New REST URL (Without Trailing Slash)`,
  `Address Prefix (Ex: juno)`,
  `Native Denom (Ex: ujunox)`,
  `Coin Type (Ex: 118)`,
  `Decimals (Ex: 6)`,
  `Block explorer URL (Optional)`,
];

export const HEDGE_CHAIN: NetworksProps = {
  name: 'hedgechain',
  prettyName: 'Hedge chain',
  rpc: 'http://localhost:26657',
  rest: 'http://localhost:1317',
  chainID: 'calibchain',
  addressPrefix: 'calib',
  nativeDenom: 'hogg',
  coinType: 118,
  decimals: 8,
  symbol: 'HEDGE',
  isUsed: true,
};
