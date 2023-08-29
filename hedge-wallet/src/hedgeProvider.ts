// export interface Hedge {
//   activeAddress: string;
//   chainId: string;
//   enable: () => void;
//   subscribes: any;
//   subscribe: any;
// }
// const hedge: Hedge = {} as Hedge;
// hedge.activeAddress = null;
// hedge.chainId = null;

// const hedgeSubscribers = () => {
//   const subscribers = {};

//   const publish = (eventName: string, data: any) => {
//     if (!Array.isArray(subscribers[eventName])) return;

//     subscribers[eventName].forEach((callback: (data: any) => void) => {
//       callback(data);
//     });
//   };

//   const subscribe = (eventName: string, callback: () => void) => {
//     if (!Array.isArray(subscribers[eventName])) subscribers[eventName] = [];
//     subscribers[eventName].push(callback);
//   };

//   return { publish, subscribe };
// };
// hedge.subscribes = hedgeSubscribers();
// hedge.subscribe = hedge.subscribes.subscribe;

// window.addEventListener('hedgeProvider', (event: any) => {
//   switch (event.detail.message.type) {
//     case 'onAccount':
//       hedge.subscribes.publish('onAccount', {
//         id: event.detail.message.accountId,
//         network: event.detail.message.network,
//       });
//       hedge.activeAddress = event.detail.message.accountId;
//       hedge.chainId = event.detail.message.network;
//       break;
//     case 'onTransaction':
//       hedge.subscribes.publish('onTransaction', event.detail.message);
//       break;
//     case 'onCancel':
//       hedge.subscribes.publish('onCancel', event.detail.message);
//       break;
//     case 'fileResponse':
//       hedge.subscribes.publish('onFileData', event.detail.message.fileData);
//       break;
//     default:
//   }
// });

// hedge.enable = (): void => {
//   const domain = window.location.hostname;

//   window.postMessage(
//     {
//       to: 'HedgeHogg',
//       provider: true,
//       type: 'enable-hedge',
//       domain,
//     },
//     '*'
//   );
// };

// // hedge.connect = async () => {
// //   const wallet = await Directsec1256k1HdWallet.fromMnemonic(this.mnemonic);
// //   const [firstAccount] = await wallet.getAccounts();
// //   const address = firstAccount.address;

// //   this.address = address;
// //   this.client = new SigningStargateClient(
// //     'http://localhost:26657',
// //     address,
// //     wallet
// //   );
// // };

// hedge = hedge;

import type {
  AccountResponse,
  AddChainParams,
  DisconnectResponse,
  RequestAccountResponse,
  SendTransactionMode,
  SendTransactionResponse,
  SignMessageResponse,
} from './types/message';

export interface Hedge {
  request: (message: { method: string; params?: unknown }) => Promise<any>;
  on: (eventName: string, eventHandler: (event?: unknown) => void) => unknown;
  off: (handler: unknown) => void;
}
const hedge: Hedge = {} as Hedge;

type Param =
  | { method: 'cos_account'; params: string }
  | { method: 'cos_requestAccount'; params: string }
  | { method: 'cos_addChain'; params: AddChainParams }
  | { method: 'cos_sendTransaction'; params: txParams }
  | { method: 'cos_signMessage'; params: signMessageParams };

const request = (requestParams: Param): Promise<any> => {
  switch (requestParams.method) {
    case 'cos_account':
      return getAccount(requestParams.params);
    case 'cos_requestAccount':
      return requestAccount(requestParams.params);
    case 'cos_addChain':
      break;
    case 'cos_sendTransaction':
      break;
    case 'cos_signMessage':
      break;
  }
};

hedge.request = request;

const getAccount = (chainName: string) => {
  return hedge.request({
    method: 'cos_account',
    params: { chainName },
  }) as Promise<AccountResponse>;
};

// hedge.enable = (): void => {
//   const domain = window.location.hostname;

//   window.postMessage(
//     {
//       to: 'HedgeHogg',
//       provider: true,
//       type: 'enable-hedge',
//       domain,
//     },
//     '*'
//   );
// };

const requestAccount = (chainName: string) => {
  return hedge.request({
    method: 'cos_requestAccount',
    params: { chainName },
  }) as Promise<RequestAccountResponse>;
};

const addChain = (chain: AddChainParams) => {
  return hedge.request({
    method: 'cos_addChain',
    params: { ...chain },
  }) as Promise<boolean>;
};

type signMessageParams = { chainName: string; signer: string; message: string };

const signMessage = (messageParams: signMessageParams) => {
  return hedge.request({
    method: 'cos_signMessage',
    params: { ...messageParams },
  }) as Promise<SignMessageResponse>;
};

type txParams = {
  chainName: string;
  txBytes: Uint8Array | string;
  mode: SendTransactionMode;
};

const sendTransaction = (requestTxParams: txParams) => {
  return hedge.request({
    method: 'cos_sendTransaction',
    params: { ...requestTxParams },
  }) as Promise<SendTransactionResponse>;
};

const on = (eventName: 'accountChanged', handler: () => void) => {
  return hedge.on(eventName, handler);
};

const off = (event: unknown) => {
  hedge.off(event);
};

const onAccountChanged = (handler: () => void) => {
  return hedge.on('accountChanged', handler);
};

const offAccountChanged = (event: unknown) => {
  hedge.off(event);
};

const disconnect = () => {
  return hedge.request({
    method: 'cos_disconnect',
  }) as Promise<DisconnectResponse>;
};

window.hedge = hedge;
