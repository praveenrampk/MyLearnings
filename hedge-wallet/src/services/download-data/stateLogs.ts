import { detectBrowser, detectOS } from '@src/detectBrowser';
import { ACCOUNT_PATH } from '@src/helpers/constants';
import {
  BackupDataProps,
  StateLogsProps,
} from '@src/interfaces-and-types/advanced';
import {
  Account,
  HomeState,
  TxDetails,
} from '@src/interfaces-and-types/home-state';
import {
  NetworksProps,
  OnboardingState,
} from '@src/interfaces-and-types/onboarding-flow';
import { CryptocurrencyWalletSettings } from '@src/interfaces-and-types/settings-state';

import { downloadFile } from '../utils';

export const makeStateLogData = (
  onboardingState: OnboardingState,
  homeState: HomeState,
  settingsState: CryptocurrencyWalletSettings
) => {
  const identities = {};
  const contacts = {};
  const networkConfigurations = {};
  const usedNetworks = {};
  const history = {};

  homeState.accounts.forEach((account: Account) => {
    identities[account.publicKey] = {
      address: account.publicKey,
      lastSelected: account.lastSelected ? account.lastSelected : null,
      name: account.name,
    };
  });

  homeState.accounts.forEach((account: Account) => {
    if (account.contacts) {
      contacts[account.publicKey] = {};

      account.contacts.map((contact) => {
        contacts[account.publicKey][contact.address] = {
          name: contact.name,
          address: contact.address,
          memo: contact.memo ? contact.memo : '',
        };
      });
    }
  });

  [
    ...settingsState.networks.mainNets,
    ...settingsState.networks.testNets,
  ].forEach((network: NetworksProps) => {
    networkConfigurations[network.chainID] = {
      ...network,
    };
    usedNetworks[network.name.replaceAll(' ', '')] = network.isUsed;
  });

  homeState.accounts.forEach((account: Account) => {
    for (const chainId in account.txHistory) {
      if (chainId) {
        history[chainId] = {};

        account.txHistory[chainId].forEach((txs: TxDetails) => {
          history[chainId][txs.txHash] = { ...txs };
        });
      }
    }
  });

  const stateLogData: StateLogsProps = {
    isInitialized: true,
    isUnlocked: homeState.isLogedIn,
    isAccountMenuOpen: false,
    isNetworkMenuOpen: false,
    identities,
    contacts,
    networkConfigurations,
    featureFlags: {
      sendHexData: settingsState.advanced[2].toggleSwitch,
    },
    currentLocale: 'en',
    preferences: {
      autoLockTimeLimit: 0,
      hideZeroBalanceTokens: true,
      showFiatInTestNets: settingsState.general[1].radio.fiat,
      showTestNetworks: settingsState.advanced[4].toggleSwitch,
      useNativeCurrencyAsPrimaryCurrency:
        settingsState.general[1].radio.primary,
      firstTimeFlowType: onboardingState.onboardType,
      completedOnboarding: onboardingState.onboardingStatus === 'COMPLETED',
      nativeCurrency: settingsState.networks.activeNet.symbol,
      defaultHomeActiveTabName: 'Assets',
      browserEnvironment: {
        os: detectOS(),
        browser: detectBrowser(),
      },
      usedNetworks,
      defaultPath: ACCOUNT_PATH,
      history,
    },
  };

  downloadFile(stateLogData, 'Hedge Hogg state-logs.json');
};

export const clearActivity = (account: Account): Account => {
  const alteredAccount = { ...account };

  if (alteredAccount.txHistory) {
    delete alteredAccount.txHistory;
  }

  return alteredAccount;
};

export const backupWalletData = (
  onboardingState: OnboardingState,
  homeState: HomeState,
  settingsState: CryptocurrencyWalletSettings
) => {
  const identities = {};
  const contacts = {};
  const networkConfigurations = {};

  homeState.accounts.forEach((account: Account) => {
    identities[account.publicKey] = {
      address: account.publicKey,
      lastSelected: account.lastSelected ? account.lastSelected : null,
      name: account.name,
    };
  });

  homeState.accounts.forEach((account: Account) => {
    if (account.contacts) {
      contacts[account.publicKey] = {};

      account.contacts.map((contact) => {
        contacts[account.publicKey][contact.address] = {
          name: contact.name,
          address: contact.address,
          memo: contact.memo ? contact.memo : '',
        };
      });
    }
  });

  const BackupData: BackupDataProps = {
    identities,
    contacts,
    networkConfigurations,
    featureFlags: {
      sendHexData: settingsState.advanced[2].toggleSwitch,
    },
    currentLocale: 'en',
    preferences: {
      autoLockTimeLimit: 0,
      hideZeroBalanceTokens: true,
      showFiatInTestNets: settingsState.general[1].radio.fiat,
      showTestNetworks: settingsState.advanced[4].toggleSwitch,
      useNativeCurrencyAsPrimaryCurrency:
        settingsState.general[1].radio.primary,
      firstTimeFlowType: onboardingState.onboardType,
      completedOnboarding: onboardingState.onboardingStatus === 'COMPLETED',
      nativeCurrency: settingsState.networks.activeNet.symbol,
      defaultHomeActiveTabName: 'Assets',
      browserEnvironment: {
        os: detectOS(),
        browser: detectBrowser(),
      },
    },
  };

  downloadFile(
    BackupData,
    `HedgeHoggUserData.${new Date().toDateString().split(' ').join('-')}.json`
  );
};
