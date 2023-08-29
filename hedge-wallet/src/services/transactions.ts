import { fromHex } from '@cosmjs/encoding';
import {
  DirectSecp256k1HdWallet,
  DirectSecp256k1Wallet,
} from '@cosmjs/proto-signing';
import {
  DeliverTxResponse,
  GasPrice,
  SigningStargateClient,
  StdFee,
  calculateFee,
} from '@cosmjs/stargate';
import { Coin } from 'cosmjs-types/cosmos/base/v1beta1/coin';

import { Account } from '@src/interfaces-and-types/home-state';

import { getPrivateKey } from './utils';

const sendByMnemonics = async (mnemonics: string, DENOM: string) => {
  return await DirectSecp256k1HdWallet.fromMnemonic(mnemonics, {
    prefix: DENOM,
  });
};

const senderByPrivateKey = async (privateKey: string, DENOM: string) => {
  return await DirectSecp256k1Wallet.fromKey(fromHex(privateKey), DENOM);
};

export const initiateTransaction = async (
  activeAccount: Account,
  masterKey: string,
  sendingAmount: string,
  receiverAddress: string,
  transactionSpeed: string,
  rpcUrl: string,
  DENOM: string
) => {
  const senderWallet =
    activeAccount.privateKeyOrPhrase?.split(' ').length > 1
      ? await sendByMnemonics(activeAccount.privateKeyOrPhrase, DENOM)
      : await senderByPrivateKey(
          activeAccount.privateKeyOrPhrase
            ? activeAccount.privateKeyOrPhrase
            : await getPrivateKey(masterKey, activeAccount.pathIndex),
          DENOM
        );

  const [sender] = await senderWallet.getAccounts();

  const senderClient = await SigningStargateClient.connectWithSigner(
    rpcUrl,
    senderWallet
  );

  const gasPrice = getGasPrice(transactionSpeed, DENOM);

  return await sendCoins(
    sender.address,
    receiverAddress,
    senderClient,
    {
      denom: DENOM,
      amount: String(Number(sendingAmount) * 1000000),
    },
    gasPrice
  );
};

const getGasPrice = (transactionSpeed: string, DENOM: string): GasPrice => {
  const slowGasPrice = GasPrice.fromString(`0.05${DENOM}`);
  const mediumGasPrice = GasPrice.fromString(`0.1${DENOM}`);
  const fastGasPrice = GasPrice.fromString(`0.2${DENOM}`);

  switch (transactionSpeed) {
    case 'slow':
      return slowGasPrice;
    case 'medium':
      return mediumGasPrice;
    case 'fast':
      return fastGasPrice;
    default:
      throw new Error('Invalid transaction speed');
  }
};

const sendCoins = async (
  sender: string,
  recipient: string,
  senderClient: SigningStargateClient,
  amount: Coin,
  gasPrice: GasPrice
): Promise<DeliverTxResponse> => {
  const singleBankSendGas = 111_000;
  const bankSendFee: StdFee = calculateFee(singleBankSendGas, gasPrice);

  const bankSendResult = await senderClient.sendTokens(
    sender,
    recipient,
    [amount],
    bankSendFee
  );

  return bankSendResult;
};

export const estimatedGasFees = (txSpeed: string, DENOM: string) => {
  return calculateFee(111_000, getGasPrice(txSpeed, DENOM)).amount[0].amount;
};
