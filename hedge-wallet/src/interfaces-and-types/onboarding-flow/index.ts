import { Account } from '../home-state';

export enum OnboardingStatus {
  BY_CREATE = 'CREATE',
  BY_IMPORT = 'IMPORT',
  ONBOARD = 'ONBOARD',
  INITIALIZED = 'INITIALIZED',
  CREATE_PASSWORD = 'PASSWORD_CREATED',
  CREATE_PASSWORD_FOR_IMPORT = 'PASSWORD_CREATE_FOR_IMPORT',
  SRP_CREATED = 'SRP_CREATED',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
}

export interface OnboardingTypeAndInitialization {
  status: string;
  type: string;
}

export interface OnboardingState {
  onboardType: string | null;
  onboardingStatus: OnboardingStatus;
  password: {
    isAgreement: boolean;
    password: string | null;
  };
  secretPhrase: {
    isScreenBlur: boolean;
    isSRPViewed: boolean;
    isSRPVerified: boolean;
    phrase: {
      masterKey: string | null;
      mnemonics: string | null;
    };
  };
}

export interface NetworksProps {
  name: string;
  prettyName: string;
  rpc: string;
  rest: string;
  chainID: string;
  addressPrefix: string;
  nativeDenom: string;
  coinType: number;
  decimals: number;
  symbol: string;
  blockExplorerURL?: string;
  imageURL?: string;
  isUsed: boolean;
}

export interface AccountDetails {
  accounts: Account[];
  activeAccount: Account;
  accIndex: number;
  isLogedIn?: boolean;
}

export interface OnboardingPasswordUQuery {
  isAgreement: boolean;
  password: string | null;
}

export interface OnboardCreateOrImport {
  setPassword: OnboardingPasswordUQuery;
  status: boolean;
}

export interface OnboardingSecretPhraseUQuery {
  isScreenBlur: boolean;
  isSRPViewed: boolean;
  isSRPVerified: boolean;
  phrase: {
    masterKey: string | null;
    mnemonics: string | null;
  };
}

export interface PhraseProps {
  phrase: string | null;
  isClicked: boolean;
}
