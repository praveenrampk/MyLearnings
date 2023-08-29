import { NetworksProps } from '../onboarding-flow';
import {
  ContentsInAdvanced,
  ContentsInGeneral,
  SecurityPrivacyContents,
} from '../pages/settings';

export interface CryptocurrencyWalletSettings {
  general: ContentsInGeneral[];
  advanced: ContentsInAdvanced[];
  securityPrivacy: SecurityPrivacyContents;
  networks: {
    mainNets: NetworksProps[] | undefined;
    testNets: NetworksProps[] | undefined;
    activeNet: NetworksProps | undefined;
  };
}

export interface AddCosmosNet {
  network: NetworksProps;
  status: string;
}

export interface DeleteCosmosNet {
  networks: NetworksProps[];
  status: string;
}

export enum NetworksStatus {
  MAIN_NETS = 'mainNets',
  TEST_NETS = 'testNets',
}
