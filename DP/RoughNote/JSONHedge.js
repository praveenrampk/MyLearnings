const stateLogs = {
  hedgeHogg: {
    isInitialized: Boolean,
    isUnlocked: Boolean,
    isAccountMenuOpen: Boolean,
    isNetworkMenuOpen: Boolean,
    identities: {
      calib1: {
        address: "calib1",
        lastSelected: "timestamp",
        name: "Account 1",
      },
      calib2: {
        address: "calib2",
        lastSelected: "timestamp",
        name: "Account 2",
      },
    },
    contacts: {
      address: {
        address: "calib1",
        name: "Praveen",
        memo: "some message",
      },
    },
    networkConfigurations: {
      cosmoshub: {
        name: string,
        prettyName: string,
        rpc: string,
        rest: string,
        chainID: string,
        addressPrefix: string,
        nativeDenom: string,
        coinType: number,
        decimals: number,
        symbol: string,
        blockExplorerURL: string,
        imageURL: string,
      },
    },
  },
  featureFlags: {
    sendHexData: Boolean,
  },
  currentLocale: "language",
  preferences: {
    autoLockTimeLimit: 0,
    hideZeroBalanceTokens: Boolean,
    showFiatInTestNets: Boolean,
    showTestNetworks: Boolean,
    useNativeCurrencyAsPrimaryCurrency: Boolean,
  },
  firstTimeFlowType: "create or Import",
  completedOnboarding: Boolean,
  nativeCurrency: "USD or EUR ...",
  defaultHomeActiveTabName: "Assets",
  browserEnvironment: {
    os: "linux or windows or max",
    browser: "chrome",
  },
  recoveryPhraseReminderHasBeenShown: Boolean,
  recoveryPhraseReminderLastShown: "timestamp",
  usedNetworks: {
    cosmoshub: Boolean,
    regen: Boolean,
  },
  defaultPath: "m/0/...",
  history: {
    account1: {
      hstrys: {
        h1: {
          type: string,
          timestamp: number,
          txHash: string,
          amount: number,
          asset: string,
          price: string,
        },
      },
    },
  },
};
