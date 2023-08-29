import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  Account,
  HomeState,
  UpdateAccountsProps,
  UpdateActiveAccountProps,
} from '@src/interfaces-and-types/home-state';
import { RootState } from '@src/redux/store';
import { getCoinBalance } from '@src/services/utils';

const initialState: HomeState = {
  accounts: [],
  activeAccount: undefined,
  accIndex: 0,
  isLogedIn: true,
};

export const fetchAccountsState = createAsyncThunk('home/details', async () => {
  return await chrome.storage.local.get('accountDetails');
});

export const lockWallet = createAsyncThunk(
  'home/lock',
  async (_, _thunkAPI) => {
    const { accountDetails } = await _thunkAPI
      .dispatch(fetchAccountsState())
      .unwrap();

    await chrome.storage.local.set({
      accountDetails: {
        ...accountDetails,
        isLogedIn: false,
      },
    });

    return await _thunkAPI.dispatch(fetchAccountsState()).unwrap();
  }
);

export const unlockWallet = createAsyncThunk(
  'home/unlock',
  async (_, _thunkAPI) => {
    const { accountDetails } = await _thunkAPI
      .dispatch(fetchAccountsState())
      .unwrap();

    await chrome.storage.local.set({
      accountDetails: {
        ...accountDetails,
        isLogedIn: true,
      },
    });

    return await _thunkAPI.dispatch(fetchAccountsState()).unwrap();
  }
);

export const insertNewAccount = createAsyncThunk(
  'home/insert-newAccount',
  async (newAccount: Account, _thunkAPI) => {
    const { accountDetails } = await _thunkAPI
      .dispatch(fetchAccountsState())
      .unwrap();

    await chrome.storage.local.set({
      accountDetails: {
        ...accountDetails,
        activeAccount: {
          ...newAccount,
        },
        accounts: [...accountDetails.accounts, newAccount],
        accIndex: !newAccount.privateKeyOrPhrase
          ? accountDetails.accIndex + 1
          : accountDetails.accIndex,
      },
    });

    return await _thunkAPI.dispatch(fetchAccountsState()).unwrap();
  }
);

export const updateActiveAccount = createAsyncThunk(
  'home/active-account',
  async (updateParams: UpdateActiveAccountProps, _thunkAPI) => {
    const { accountDetails } = await _thunkAPI
      .dispatch(fetchAccountsState())
      .unwrap();

    await chrome.storage.local.set({
      accountDetails: {
        ...accountDetails,
        activeAccount: {
          ...updateParams.account,
          balance: {
            ...(await getCoinBalance(
              updateParams.networkName,
              updateParams.account.publicKey
            )),
          },
        },
      },
    });

    return await _thunkAPI.dispatch(fetchAccountsState()).unwrap();
  }
);

export const updateAccountDetails = createAsyncThunk(
  'home/update-accounts',
  async (updateParams: UpdateAccountsProps, _thunkAPI) => {
    const { accountDetails } = await _thunkAPI
      .dispatch(fetchAccountsState())
      .unwrap();

    await chrome.storage.local.set({
      accountDetails: {
        ...accountDetails,
        accounts: [
          ...(await Promise.all(
            updateParams.accounts.map(async (account: Account) => {
              return {
                ...account,
                balance: {
                  ...(await getCoinBalance(
                    updateParams.networkName,
                    account.publicKey
                  )),
                },
              };
            })
          )),
        ],
      },
    });

    return await _thunkAPI.dispatch(fetchAccountsState()).unwrap();
  }
);

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    const fulfilledActions = [
      fetchAccountsState.fulfilled,
      unlockWallet.fulfilled,
      lockWallet.fulfilled,
      insertNewAccount.fulfilled,
      updateActiveAccount.fulfilled,
      updateAccountDetails.fulfilled,
    ];

    fulfilledActions.forEach((action) => {
      builder.addCase(action, (state, action) => {
        return { ...state, ...action.payload.accountDetails };
      });
    });
  },
});

export type HomeSlice = {
  [homeSlice.name]: ReturnType<typeof homeSlice['reducer']>;
};

export const homeSelectors = (state: RootState) => state[homeSlice.name];

export default homeSlice.reducer;
