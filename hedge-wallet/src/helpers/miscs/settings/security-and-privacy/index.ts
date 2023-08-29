import {
  PrivacyContent,
  SecurityContent,
  SecurityPrivacyContents,
} from '@src/interfaces-and-types/pages/settings';

export const securityContent: SecurityContent[] = [
  {
    heading: 'Reveal Secret Recovery Phrase',
    button: {
      btnText: 'Reveal Secret Recovery Phrase',
      btnColor: 'red',
    },
  },
  {
    heading: 'Change Wallet Password',
    changePassword: 'Change Hedge Hogg Password',
  },
];

export const privacyContent: PrivacyContent[] = [
  {
    heading1: 'Transactions',
    heading2: 'Show balance and price checker for tokens',
    subHeading:
      'To display your balance and token price, we make use of CoinGecko APIs. Policy on privacy',
    toggle: true,
  },
  {
    heading1: 'Network Provider',
    heading2: 'Select a network',
    subHeading:
      'In order to provide the most secure and private access to Cosmos data as possible, we employ Cosmos directory as our remote procedure call (RPC) provider. You can select your own RPC, but keep in mind that to complete transactions, any RPC will need access to your IP address and Cosmos wallet. To discover more about how Cosmos Directory manages data, read our Privacy policy.',
    buttonText: 'Include a custom network',
  },
  {
    heading1: 'Lock your wallet',
    heading2: 'Timer for auto-lock (in minutes)',
    subHeading:
      'Set the amount of time in minutes that must pass before MetaMask locks.',
    lockWallet: 0,
  },
];

export const securityPrivacyContents: SecurityPrivacyContents = {
  security: [...securityContent],
  privacy: [...privacyContent],
};
