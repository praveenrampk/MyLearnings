import * as bip39 from 'bip39';
import { ExtendedKey, MnemonicPassPhrase, Network } from 'symbol-hd-wallets';

import { HEDGE_CHAIN } from '@src/helpers/misc';
import { AccountDetails } from '@src/interfaces-and-types/onboarding-flow';

import { getPublicAddress } from './utils';

export const createSeedPhrases = (isTrue: boolean): string => {
  if (isTrue) {
    try {
      return MnemonicPassPhrase.createRandom('english', 128).plain;
    } catch (err) {
      return 'one two three four five six seven eight nine ten eleven twelve';
    }
  }

  return 'one two three four five six seven eight nine ten eleven twelve';
};

export const createInitialAccount = (
  address: string,
  masterKey: string
): AccountDetails => {
  return {
    accounts: [
      {
        name: 'Account 1',
        publicKey: address,
        balance: { bal: 0, stake: 0 },
        connectedSites: [],
        pathIndex: 0,
      },
    ],
    activeAccount: {
      name: 'Account 1',
      publicKey: address,
      balance: { bal: 0, stake: 0 },
      connectedSites: [masterKey],
      pathIndex: 0,
    },
    accIndex: 1,
  };
};

export const initialFirstAccount = async (
  words: string,
  walletPassword: string,
  accIndex: number
) => {
  if (!bip39.validateMnemonic(words)) {
    throw new Error('Invalid Mnemonic');
  }

  const masterKey = ExtendedKey.createFromSeed(
    new MnemonicPassPhrase(words).toSeed(walletPassword).toString('hex'),
    Network.SYMBOL
  ).toBase58();

  const address = await getPublicAddress(
    masterKey,
    accIndex,
    HEDGE_CHAIN.addressPrefix
  );

  return createInitialAccount(address, masterKey);
};
