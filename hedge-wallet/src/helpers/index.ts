import { ReturnTypeForAddContacts } from '@src/interfaces-and-types/contacts';
import { Account, ContactDetails } from '@src/interfaces-and-types/home-state';
import {
  NetworksProps,
  OnboardingState,
} from '@src/interfaces-and-types/onboarding-flow';
import {
  ContentsInAdvanced,
  ContentsInGeneral,
} from '@src/interfaces-and-types/pages/settings';
import { ADDED_NETWORKS } from '@src/services/constants';
import {
  getPubAddressImportedByPrivateKey,
  getPubAddressImptByMnemonics,
  getPublicAddress,
} from '@src/services/utils';

export const validatePassword = (password: string): boolean => {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
    password
  );
};

export const checkChainExistInWallet = (
  addedChains: NetworksProps[]
): string[] => {
  const addedChainIDS = addedChains.map((element: NetworksProps) =>
    element.name.replaceAll(/[- ]/g, '').toLowerCase()
  );

  return ADDED_NETWORKS.filter(
    (chainId: string) => !addedChainIDS.includes(chainId)
  );
};

type ConvertAccountAddressesResult = {
  alteredAccounts: Account[];
  alteredActiveAccount: Account;
};

export const convertAccountAddresses = async (
  accounts: Account[],
  masterKey: string,
  activeAccount: Account,
  DENOM: string
): Promise<ConvertAccountAddressesResult> => {
  const alteredActiveAccount = { ...activeAccount };

  const alteredAccounts: Account[] = await Promise.all(
    accounts.map(async (account: Account) => {
      const alteredAccount = { ...account };

      if (account.privateKeyOrPhrase?.split(' ').length === 1) {
        alteredAccount.publicKey = await getPubAddressImportedByPrivateKey(
          account.privateKeyOrPhrase,
          DENOM
        );
      } else if (account.privateKeyOrPhrase?.split(' ').length > 1) {
        alteredAccount.publicKey = await getPubAddressImptByMnemonics(
          account.privateKeyOrPhrase,
          DENOM
        );
      } else {
        alteredAccount.publicKey = await getPublicAddress(
          masterKey,
          account.pathIndex,
          DENOM
        );
      }

      activeAccount.publicKey === account.publicKey &&
        (alteredActiveAccount.publicKey = alteredAccount.publicKey);

      return alteredAccount;
    })
  );

  return { alteredAccounts, alteredActiveAccount };
};

export const removeOneChain = (
  chains: NetworksProps[],
  chainTobeRemoved: NetworksProps
) => {
  return chains.filter((chain) => chain.chainID !== chainTobeRemoved.chainID);
};

export const validateChainBeforeManualAdd = (
  name: string,
  chainsAdded: NetworksProps[]
) => {
  return chainsAdded.find((chain: NetworksProps) => chain.name === name);
};

export const updateOneFromGeneralContents = (
  contents: ContentsInGeneral[],
  index: number,
  toBeUnShifted: string
): ContentsInGeneral[] => {
  const newContents: ContentsInGeneral[] = [...contents];
  const contentToBeEdited: ContentsInGeneral = newContents[index];

  const dropdownIndex = contentToBeEdited.dropdown.indexOf(toBeUnShifted);

  if (dropdownIndex !== -1) {
    const newDropdown = [
      toBeUnShifted,
      ...contentToBeEdited.dropdown.filter(
        (value, idx) => idx !== dropdownIndex
      ),
    ];
    newContents[index] = { ...contentToBeEdited, dropdown: newDropdown };
  }

  return newContents;
};

export const changePrimaryCurrency = (
  primary: boolean,
  fiat: boolean,
  contents: ContentsInGeneral[],
  index: number
): ContentsInGeneral[] => {
  return contents.map((content: ContentsInGeneral, idx: number) =>
    idx === index
      ? { ...content, radio: { primary: !primary, fiat: !fiat } }
      : content
  );
};

export const updateOneFromAdvancedContents = (
  contents: ContentsInAdvanced[],
  heading: string
): ContentsInAdvanced[] => {
  return contents.map((content: ContentsInAdvanced) => {
    if (content.heading === heading) {
      const newContent = { ...content };
      newContent.toggleSwitch = !content.toggleSwitch;

      return newContent;
    }

    return content;
  });
};

export const updatePasswordInOnboardingState = (
  onboardingState: OnboardingState,
  newPassword: string
): OnboardingState => {
  return {
    ...onboardingState,
    password: { ...onboardingState.password, password: newPassword },
  };
};

export const checkContactExistOrNot = (
  contacts: Record<string, ContactDetails>,
  username: string
): boolean => {
  for (const key in contacts) {
    if (contacts[key].username === username) {
      return false;
    }
  }

  return true;
};

export const addContactAtIndex = (
  accounts: Account[],
  activeAccount: Account,
  contacts: Record<string, ContactDetails>
): ReturnTypeForAddContacts => {
  const index = accounts.findIndex(
    (account) => account.publicKey === activeAccount.publicKey
  );
  const newAccounts: Account[] = [...accounts];

  const newActiveAccount: Account = {
    ...newAccounts.splice(index, 1).pop(),
    contacts,
  };
  newAccounts.splice(index, 0, newActiveAccount);

  return { accounts: newAccounts, account: newActiveAccount };
};
