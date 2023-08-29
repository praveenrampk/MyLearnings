import { Buffer } from 'buffer';

import {
  DirectSecp256k1HdWallet,
  DirectSecp256k1Wallet,
} from '@cosmjs/proto-signing';
import { adventurer } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import axios from 'axios';
import { bech32 } from 'bech32';
import { ExtendedKey, Network, Wallet } from 'symbol-hd-wallets';

import { ACCOUNT_PATH } from '@helpers/constants/index';
import { HEDGE_CHAIN } from '@src/helpers/misc';
import {
  BackupDataProps,
  StateLogsProps,
} from '@src/interfaces-and-types/advanced';

export const downloadFile = (
  data: StateLogsProps | BackupDataProps | string[],
  fileName: string
) => {
  const jsonData = new Blob([JSON.stringify(data)], { type: 'text/json' });
  const jsonURL = window.URL.createObjectURL(jsonData);
  const link = document.createElement('a');
  document.body.appendChild(link);
  link.href = jsonURL;
  link.setAttribute('download', fileName);
  link.click();
  document.body.removeChild(link);
};

export const copyToClipboard = (phrases: string) => {
  const copiedSeeds: string = phrases;
  navigator.clipboard.writeText(copiedSeeds);
};

export const shuffleThatSeeds = (phrases: string[]) => {
  let currentIndex: number = phrases.length;
  let temporaryValue: string, randomIndex: number;
  const shuffledSeeds: string[] = [];

  while (currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    shuffledSeeds.push(phrases[randomIndex]);
    temporaryValue = phrases[currentIndex];
    phrases[currentIndex] = phrases[randomIndex];
    phrases[randomIndex] = temporaryValue;
  }

  return shuffledSeeds;
};

export const validateAddress = (address: string) => {
  try {
    bech32.decode(address);

    return true;
  } catch (err) {
    return false;
  }
};

export const getPublicAddress = async (
  masterKey: string,
  accIndex: number,
  DENOM: string
) => {
  const [{ address }] = await (
    await DirectSecp256k1Wallet.fromKey(
      Buffer.from(
        new Wallet(
          ExtendedKey.createFromBase58(masterKey, Network.SYMBOL)
        ).getChildAccountPrivateKey(`${ACCOUNT_PATH}/${accIndex}`),
        'hex'
      ),
      DENOM
    )
  ).getAccounts();

  return address;
};

export const getPrivateKey = async (masterKey: string, accIndex: number) => {
  return new Wallet(
    ExtendedKey.createFromBase58(masterKey, Network.SYMBOL)
  ).getChildAccountPrivateKey(`${ACCOUNT_PATH}/${accIndex}`);
};

export const getPubAddressImptByMnemonics = async (
  mnemonics: string,
  DENOM: string
) => {
  const [{ address }] = await (
    await DirectSecp256k1HdWallet.fromMnemonic(mnemonics, {
      prefix: DENOM,
    })
  ).getAccounts();

  return address;
};

export const getPubAddressImportedByPrivateKey = async (
  privateKey: string,
  DENOM: string
) => {
  const importedKey = Buffer.from(privateKey, 'hex');

  const keys = await DirectSecp256k1Wallet.fromKey(importedKey, DENOM);
  const [{ address }] = await keys.getAccounts();

  return address;
};

export const getCoinBalance = async (chainName: string, address: string) => {
  const endpoint =
    chainName === HEDGE_CHAIN.name
      ? `http://localhost:1317/bank/balances/${address}`
      : `https://rest.cosmos.directory/${chainName}/cosmos/bank/v1beta1/balances/${address}`;

  try {
    const response = await axios.get(endpoint);

    if (chainName === HEDGE_CHAIN.name) {
      return {
        bal: response.data.result[0]?.amount.slice(0, -6) || 0,
        stake: response.data.result[1]?.amount.slice(0, -6) || 0,
      };
    } else {
      return { bal: 0, stake: 0 };
    }
  } catch (error) {
    return { bal: 0, stake: 0 };
  }
};

export const getCurrentConversionOfUsdToETH = async () => {
  try {
    return (
      await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      )
    ).data.ethereum.usd;
  } catch (err) {
    throw new Error(err);
  }
};

export const getTransactionDetails = async (hash: string) => {
  try {
    return (
      await axios.get(`http://localhost:1317/cosmos/tx/v1beta1/txs/${hash}`)
    ).data;
  } catch (err) {
    throw new Error(err);
  }
};

export const truncateWordAtIndex = (word: string, index: number): string => {
  return `${word.slice(0, index)}........${word.slice(-index)}`;
};

export const getShape = (pubKey: string): string => {
  return createAvatar(adventurer, {
    seed: pubKey,
  }).toDataUriSync();
};
