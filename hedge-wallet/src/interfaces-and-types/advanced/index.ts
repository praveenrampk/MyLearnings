import { Dispatch, SetStateAction } from 'react';

import { ContactDetails, TxDetails } from '../home-state';
import { NetworksProps } from '../onboarding-flow';

export interface Identity {
  address: string;
  lastSelected: number;
  name: string;
}

export interface StateLogsProps {
  isInitialized: boolean;
  isUnlocked: boolean;
  isAccountMenuOpen: boolean;
  isNetworkMenuOpen: boolean;
  identities: Record<string, Identity>;
  contacts: Record<string, ContactDetails>;
  networkConfigurations: Record<string, NetworksProps>;
  featureFlags: {
    sendHexData: boolean;
  };
  currentLocale: string;
  preferences: {
    autoLockTimeLimit: number;
    hideZeroBalanceTokens: boolean;
    showFiatInTestNets: boolean;
    showTestNetworks: boolean;
    useNativeCurrencyAsPrimaryCurrency: boolean;
    firstTimeFlowType: string;
    completedOnboarding: boolean;
    nativeCurrency: string;
    defaultHomeActiveTabName: string;
    browserEnvironment: {
      os: string;
      browser: string;
    };
    usedNetworks: Record<string, boolean>;
    defaultPath: string;
    history: Record<string, TxDetails[]>;
  };
}

export interface ClearTransactionHistoryProps {
  showPopups: Dispatch<SetStateAction<boolean>>;
}

export type CloseSiteProps = ClearTransactionHistoryProps;

export type ChangePasswordProps = ClearTransactionHistoryProps;

export type RevealSecretPhraseProps = ClearTransactionHistoryProps;

export interface BackupDataProps {
  identities: Record<string, Identity>;
  contacts: Record<string, ContactDetails>;
  networkConfigurations: Record<string, NetworksProps>;
  featureFlags: {
    sendHexData: boolean;
  };
  currentLocale: string;
  preferences: {
    autoLockTimeLimit: number;
    hideZeroBalanceTokens: boolean;
    showFiatInTestNets: boolean;
    showTestNetworks: boolean;
    useNativeCurrencyAsPrimaryCurrency: boolean;
    firstTimeFlowType: string;
    completedOnboarding: boolean;
    nativeCurrency: string;
    defaultHomeActiveTabName: string;
    browserEnvironment: {
      os: string;
      browser: string;
    };
  };
}
