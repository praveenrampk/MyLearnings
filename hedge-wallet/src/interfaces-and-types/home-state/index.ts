import { AccountDetails } from '../onboarding-flow';

export interface TxDetails {
  type: string;
  txHash: string;
  timestamp: number;
  amount: number;
  asset: string;
  price: string;
}

export interface ContactDetails {
  username: string;
  address: string;
  memo?: string;
}

export interface Account {
  privateKeyOrPhrase?: string;
  publicKey: string;
  name: string;
  balance: {
    bal: number | string;
    stake: number | string;
  };
  pathIndex?: number;
  txHistory?: Record<string, TxDetails[]>;
  connectedSites: string[];
  contacts?: Record<string, ContactDetails>;
  lastSelected?: number | null;
}

export interface UpdateActiveAccountProps {
  account: Account;
  networkName: string;
}

export interface UpdateAccountsProps {
  accounts: Account[];
  networkName: string;
}

export type HomeState = AccountDetails;
