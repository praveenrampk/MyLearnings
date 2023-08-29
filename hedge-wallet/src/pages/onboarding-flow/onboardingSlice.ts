import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  AccountDetails,
  OnboardCreateOrImport,
  OnboardingSecretPhraseUQuery,
  OnboardingState,
  OnboardingStatus,
  OnboardingTypeAndInitialization,
} from '@src/interfaces-and-types/onboarding-flow';
import { RootState } from '@src/redux/store';

const initialState: OnboardingState = {
  onboardType: null,
  onboardingStatus: OnboardingStatus.ONBOARD,
  password: {
    isAgreement: false,
    password: null,
  },
  secretPhrase: {
    isScreenBlur: true,
    isSRPViewed: false,
    isSRPVerified: false,
    phrase: {
      masterKey: null,
      mnemonics: null,
    },
  },
};

export const fetchOnboardingState = createAsyncThunk(
  'onboardingState/get',
  async () => {
    return await chrome.storage.local.get('onboarding');
  }
);

export const updateOnboardingPassword = createAsyncThunk(
  'onboarding/pass-update',
  async (newPassword: OnboardCreateOrImport, thunkAPI) => {
    const { onboarding } = await thunkAPI
      .dispatch(fetchOnboardingState())
      .unwrap();

    await chrome.storage.local.set({
      onboarding: {
        ...onboarding,
        password: { ...newPassword.setPassword },
        onboardingStatus: newPassword.status
          ? OnboardingStatus.CREATE_PASSWORD
          : OnboardingStatus.CREATE_PASSWORD_FOR_IMPORT,
      },
    });

    return await thunkAPI.dispatch(fetchOnboardingState()).unwrap();
  }
);

export const updateOnboardingSRP = createAsyncThunk(
  'onboarding/srp-update',
  async (newSRP: OnboardingSecretPhraseUQuery, thunkAPI) => {
    const { onboarding } = await thunkAPI
      .dispatch(fetchOnboardingState())
      .unwrap();

    if (newSRP.isSRPViewed) {
      await chrome.storage.local.set({
        onboarding: {
          ...onboarding,
          secretPhrase: { ...newSRP },
          onboardingStatus: OnboardingStatus.SRP_CREATED,
        },
      });
    } else {
      await chrome.storage.local.set({
        onboarding: {
          ...onboarding,
          secretPhrase: { ...newSRP },
          onboardingStatus: OnboardingStatus.CREATE_PASSWORD,
        },
      });
    }

    return await thunkAPI.dispatch(fetchOnboardingState()).unwrap();
  }
);

export const putMnemonicsInOnboardingState = createAsyncThunk(
  'onboarding/put-mnemonics',
  async (mnemonics: string, _thunkAPI) => {
    const { onboarding } = await _thunkAPI
      .dispatch(fetchOnboardingState())
      .unwrap();

    await chrome.storage.local.set({
      onboarding: {
        ...onboarding,
        secretPhrase: {
          ...onboarding.secretPhrase,
          phrase: {
            mnemonics: mnemonics,
            masterKey: null,
          },
        },
      },
    });
  }
);

export const completeOnboarding = createAsyncThunk(
  'onboarding/complete',
  async (accountDetails: AccountDetails, thunkAPI) => {
    const { onboarding } = await thunkAPI
      .dispatch(fetchOnboardingState())
      .unwrap();

    await chrome.storage.local.set({
      onboarding: {
        ...onboarding,
        secretPhrase: {
          ...onboarding.secretPhrase,
          phrase: {
            mnemonics: onboarding.secretPhrase.phrase.mnemonics,
            masterKey: accountDetails.activeAccount.connectedSites[0],
          },
          isSRPVerified: true,
        },
        onboardingStatus: OnboardingStatus.COMPLETED,
      },
      accountDetails: {
        ...accountDetails,
        activeAccount: {
          ...accountDetails.activeAccount,
          connectedSites: [],
        },
      },
    });

    await chrome.storage.local.set({
      accountDetails: {
        ...accountDetails,
        activeAccount: {
          ...accountDetails.activeAccount,
          connectedSites: [],
        },
      },
    });

    return await thunkAPI.dispatch(fetchOnboardingState()).unwrap();
  }
);

export const updateOnboardingStatus = createAsyncThunk(
  'onboarding/status-update',
  async (onboardPayload: OnboardingTypeAndInitialization, thunkAPI) => {
    const { onboarding } = await thunkAPI
      .dispatch(fetchOnboardingState())
      .unwrap();

    await chrome.storage.local.set({
      onboarding: {
        ...onboarding,
        onboardType: onboardPayload.type,
        onboardingStatus: onboardPayload.status,
      },
    });

    return await thunkAPI.dispatch(fetchOnboardingState()).unwrap();
  }
);

export const alterInOnboardingState = createAsyncThunk(
  'onboarding/status-alter',
  async (alteredOnboarding: OnboardingState, thunkAPI) => {
    await chrome.storage.local.set({
      onboarding: {
        ...alteredOnboarding,
      },
    });

    return await thunkAPI.dispatch(fetchOnboardingState()).unwrap();
  }
);

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const fulfilledActions = [
      fetchOnboardingState.fulfilled,
      updateOnboardingPassword.fulfilled,
      updateOnboardingStatus.fulfilled,
      updateOnboardingSRP.fulfilled,
      completeOnboarding.fulfilled,
      alterInOnboardingState.fulfilled,
    ];

    fulfilledActions.forEach((action) => {
      builder.addCase(action, (state, action) => {
        return { ...state, ...action.payload.onboarding };
      });
    });
  },
});

export type OnboardingSlice = {
  [onboardingSlice.name]: ReturnType<typeof onboardingSlice['reducer']>;
};

export const onboardingSelectors = (state: RootState) =>
  state[onboardingSlice.name];

export default onboardingSlice.reducer;
