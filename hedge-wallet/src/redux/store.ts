import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import homeReducer, { homeSlice } from '@src/pages/home/homeSlice';
import onboardingReducer, {
  onboardingSlice,
} from '@src/pages/onboarding-flow/onboardingSlice';
import settingsReducer, {
  settingsSlice,
} from '@src/pages/settings/settingsSlice';

export const store = configureStore({
  reducer: {
    [onboardingSlice.name]: onboardingReducer,
    [homeSlice.name]: homeReducer,
    [settingsSlice.name]: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
