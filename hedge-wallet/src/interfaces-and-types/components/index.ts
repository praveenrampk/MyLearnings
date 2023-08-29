import { Dispatch, SetStateAction } from 'react';

import { TxDetails } from '../home-state';
import { NetworksProps } from '../onboarding-flow';

export interface NetworkStatusProps {
  toggleNetwork: React.Dispatch<React.SetStateAction<boolean>>;
  isNetworkEnabled: boolean;
}

export interface NetworkToBeDeletedProps {
  network: NetworksProps;
  status: string;
}

export interface DeleteNetworkProps {
  toggleNetwork: Dispatch<SetStateAction<boolean>>;
  showNetwork: React.Dispatch<SetStateAction<boolean>>;
  networkData: NetworkToBeDeletedProps;
  status: string;
}

export interface ListingNetworksProps {
  handleNetClick: (network: NetworksProps) => void;
  networks: NetworksProps[];
  activeNet: NetworksProps;
}

export interface ListingNetsOnDropdownProps {
  pickNetwork: (network: NetworksProps) => void;
  deleteNetwork: (network: NetworkToBeDeletedProps) => void;
  networks: NetworksProps[];
  activeNet: NetworksProps;
  toggleNetwork: Dispatch<SetStateAction<boolean>>;
  toggleDeleteNet: Dispatch<SetStateAction<boolean>>;
  status: string;
}

export interface AccountDetailsModalClose {
  closeModal: Dispatch<SetStateAction<boolean>>;
}

export interface PrivateKeyModalClose {
  closeModal: Dispatch<SetStateAction<boolean>>;
  back: React.Dispatch<SetStateAction<boolean>>;
}

export interface TxModalProps {
  txDetails: TxDetails;
  closeTxModal: Dispatch<SetStateAction<TxDetails | null>>;
}

export interface ApproveNetworkCloseProps {
  closeModal: Dispatch<SetStateAction<boolean>>;
  networkData: string;
}

export interface NetworkListSubComponentProps {
  fullyViewed: boolean;
}
