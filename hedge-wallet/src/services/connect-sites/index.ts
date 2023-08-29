import { Account, HomeState } from '@src/interfaces-and-types/home-state';

export const addSitesToAccount = async (
  localAcc: HomeState,
  connectedAcc: string[],
  domain: string
) => {
  const accounts = localAcc.accounts.map((account) => {
    if (connectedAcc.includes(account.publicKey)) {
      account.connectedSites.push(domain);

      return account;
    }

    return account;
  });

  localAcc.accounts = [...accounts];

  chrome.storage.local.set({ accountDetails: localAcc }, () => {
    // eslint-disable-next-line no-console
    console.log('site added');
  });
};

export const updateCurrentAccount = (
  accounts: Account[],
  account: Account
): Account => {
  return accounts.filter((acc) => acc.publicKey === account.publicKey).pop();
};
