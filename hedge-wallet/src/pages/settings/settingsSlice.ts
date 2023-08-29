import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { HEDGE_CHAIN } from '@src/helpers/misc';
import { contentsInAdvanced } from '@src/helpers/miscs/settings/advanced';
import { contentsInGeneral } from '@src/helpers/miscs/settings/general';
import { securityPrivacyContents } from '@src/helpers/miscs/settings/security-and-privacy';
import { NetworksProps } from '@src/interfaces-and-types/onboarding-flow';
import {
  ContentsInAdvanced,
  ContentsInGeneral,
  SecurityPrivacyContents,
} from '@src/interfaces-and-types/pages/settings';
import {
  AddCosmosNet,
  CryptocurrencyWalletSettings,
  DeleteCosmosNet,
} from '@src/interfaces-and-types/settings-state';
import { RootState } from '@src/redux/store';

const initialState: CryptocurrencyWalletSettings = {
  general: [...contentsInGeneral],
  advanced: [...contentsInAdvanced],
  securityPrivacy: { ...securityPrivacyContents },
  networks: {
    mainNets: [],
    testNets: [],
    activeNet: HEDGE_CHAIN,
  },
};

export const fetchSettingsState = createAsyncThunk(
  'settings/details',
  async () => {
    return await chrome.storage.sync.get('WalletSettings');
  }
);

export const setInitialSettingsState = createAsyncThunk(
  'settings/set-details',
  async (_, thunkAPI) => {
    await chrome.storage.sync.set({
      WalletSettings: { ...initialState },
    });

    return await thunkAPI.dispatch(fetchSettingsState()).unwrap();
  }
);

export const addMainNetOrTestNet = createAsyncThunk(
  'settings/networks/mainnet-or-testnet/add-chain',
  async (networkPayload: AddCosmosNet, _thunkAPI) => {
    const { WalletSettings } = await _thunkAPI
      .dispatch(fetchSettingsState())
      .unwrap();

    await chrome.storage.sync.set({
      WalletSettings: {
        ...WalletSettings,
        networks: {
          ...WalletSettings.networks,
          [networkPayload.status]: [
            ...WalletSettings.networks[networkPayload.status],
            networkPayload.network,
          ],
        },
      },
    });

    return await _thunkAPI.dispatch(fetchSettingsState()).unwrap();
  }
);

export const deleteMainNetOrTestNet = createAsyncThunk(
  'settings/networks/mainnet-or-testnet/delete-chain',
  async (networkPayload: DeleteCosmosNet, _thunkAPI) => {
    const { WalletSettings } = await _thunkAPI
      .dispatch(fetchSettingsState())
      .unwrap();

    await chrome.storage.sync.set({
      WalletSettings: {
        ...WalletSettings,
        networks: {
          ...WalletSettings.networks,
          [networkPayload.status]: [...networkPayload.networks],
        },
      },
    });

    return await _thunkAPI.dispatch(fetchSettingsState()).unwrap();
  }
);

export const alterActiveChain = createAsyncThunk(
  'settings/network/alter-active-chain',
  async (activeNet: NetworksProps, _thunkAPI) => {
    const { WalletSettings } = await _thunkAPI
      .dispatch(fetchSettingsState())
      .unwrap();

    await chrome.storage.sync.set({
      WalletSettings: {
        ...WalletSettings,
        networks: {
          ...WalletSettings.networks,
          activeNet,
        },
      },
    });

    return await _thunkAPI.dispatch(fetchSettingsState()).unwrap();
  }
);

export const alterInAdvancedSettings = createAsyncThunk(
  'settings/advanced/alter',
  async (advanced: ContentsInAdvanced[], _thunkAPI) => {
    const { WalletSettings } = await _thunkAPI
      .dispatch(fetchSettingsState())
      .unwrap();

    await chrome.storage.sync.set({
      WalletSettings: {
        ...WalletSettings,
        advanced,
      },
    });

    return await _thunkAPI.dispatch(fetchSettingsState()).unwrap();
  }
);

export const alterInGeneralSettings = createAsyncThunk(
  'settings/general/alter',
  async (general: ContentsInGeneral[], _thunkAPI) => {
    const { WalletSettings } = await _thunkAPI
      .dispatch(fetchSettingsState())
      .unwrap();

    await chrome.storage.sync.set({
      WalletSettings: {
        ...WalletSettings,
        general,
      },
    });

    return await _thunkAPI.dispatch(fetchSettingsState()).unwrap();
  }
);

export const updateInSecurityPrivacy = createAsyncThunk(
  'settings/security-privacy/update',
  async (securityPrivacy: SecurityPrivacyContents, _thunkAPI) => {
    const { WalletSettings } = await _thunkAPI
      .dispatch(fetchSettingsState())
      .unwrap();

    await chrome.storage.sync.set({
      WalletSettings: {
        ...WalletSettings,
        securityPrivacy,
      },
    });

    return await _thunkAPI.dispatch(fetchSettingsState()).unwrap();
  }
);

export const settingsSlice = createSlice({
  name: 'cryptoWalletSettings',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    const fulfilledActions = [
      fetchSettingsState.fulfilled,
      setInitialSettingsState.fulfilled,
      addMainNetOrTestNet.fulfilled,
      deleteMainNetOrTestNet.fulfilled,
      alterActiveChain.fulfilled,
      alterInAdvancedSettings.fulfilled,
      alterInGeneralSettings.fulfilled,
      updateInSecurityPrivacy.fulfilled,
    ];

    fulfilledActions.forEach((action) => {
      builder.addCase(action, (state, action) => {
        return { ...state, ...action.payload.WalletSettings };
      });
    });
  },
});

export type SettingsSlice = {
  [settingsSlice.name]: ReturnType<typeof settingsSlice['reducer']>;
};

export const settingsSelectors = (state: RootState) =>
  state[settingsSlice.name];

export default settingsSlice.reducer;
