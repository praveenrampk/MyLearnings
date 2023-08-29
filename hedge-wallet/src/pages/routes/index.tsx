import { useEffect } from 'react';
import {
  createHashRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Outlet,
} from 'react-router-dom';

import Header from '@src/components/header';
import AssetBasedTransaction from '@src/components/modals/assets-view';
import {
  ADD_NETWORKS,
  ADD_NETWORKS_MANUALLY,
  ADVANCED_ROUTE,
  ASSET_ROUTE,
  CONTACT_ROUTE,
  DEFAULT_ROUTE,
  GENERAL_ROUTE,
  IMPORT_ACCOUNT_ROUTE,
  LOCK_ROUTE,
  NETWORK_ROUTE,
  NEW_ACCOUNT_ROUTE,
  ONBOARDING_COMPLETION_ROUTE,
  ONBOARDING_CONFIRM_SRP_ROUTE,
  ONBOARDING_CREATE_PASSWORD_ROUTE,
  ONBOARDING_IMPORT_WITH_SRP_ROUTE,
  ONBOARDING_ROUTE,
  ONBOARDING_SECURE_YOUR_WALLET_ROUTE,
  ONBOARDING_WELCOME_ROUTE,
  SECURITY_ROUTE,
  SEND_ROUTE,
  SETTINGS_ROUTE,
} from '@src/helpers/constants/routes';
import { useAppDispatch } from '@src/redux/store';

import Home from '../home';
import { fetchAccountsState } from '../home/homeSlice';
import Lock from '../lock/Lock';
import CreateAccount from '../new-accounts/create-account';
import ImportAccount from '../new-accounts/import-account';
import OnboardingCompletion from '../onboarding-flow/completion';
import OnboardingConfirmSRP from '../onboarding-flow/confirm-recovery-phrase';
import OnboardingCreatePassword from '../onboarding-flow/create-password';
import OnboardingFlow from '../onboarding-flow/OnboardingFlow';
import { fetchOnboardingState } from '../onboarding-flow/onboardingSlice';
import OnboardingSecureYourWallet from '../onboarding-flow/secure-your-wallet';
import OnboardingWelcome from '../onboarding-flow/welcome';
import OnboardingConfirmRecoveryPhrase from '../onboarding-flow-import/confirm-recovery-phrase';
import TransferFunds from '../send-transaction';
import AdvancedSettings from '../settings/advanced';
import ContactList from '../settings/contacts/index';
import GeneralSettings from '../settings/general';
import Networks from '../settings/networks';
import AddNetworks from '../settings/networks/add-networks';
import AddNetworksManually from '../settings/networks/add-networks-manually';
import SecurityAndPolicy from '../settings/security-policy';
import { fetchSettingsState } from '../settings/settingsSlice';
import Settings from '../settings/side-navbar';

const router = createHashRouter(
  createRoutesFromElements(
    <Route
      path={DEFAULT_ROUTE}
      element={
        <>
          <Header />
          <Outlet />
        </>
      }
    >
      <Route index element={<Home />} />
      <Route path={ONBOARDING_ROUTE} element={<OnboardingFlow />} />
      <Route path={ONBOARDING_WELCOME_ROUTE} element={<OnboardingWelcome />} />
      <Route
        path={ONBOARDING_CREATE_PASSWORD_ROUTE}
        element={<OnboardingCreatePassword />}
      />
      <Route
        path={ONBOARDING_SECURE_YOUR_WALLET_ROUTE}
        element={<OnboardingSecureYourWallet />}
      />
      <Route
        path={ONBOARDING_CONFIRM_SRP_ROUTE}
        element={<OnboardingConfirmSRP />}
      />
      <Route
        path={ONBOARDING_COMPLETION_ROUTE}
        element={<OnboardingCompletion />}
      />
      <Route path={LOCK_ROUTE} element={<Lock />} />
      <Route path={NEW_ACCOUNT_ROUTE} element={<CreateAccount />} />
      <Route path={IMPORT_ACCOUNT_ROUTE} element={<ImportAccount />} />
      <Route path={SEND_ROUTE} element={<TransferFunds />} />
      <Route
        path={ONBOARDING_IMPORT_WITH_SRP_ROUTE}
        element={<OnboardingConfirmRecoveryPhrase />}
      />
      <Route path={ASSET_ROUTE} element={<AssetBasedTransaction />} />
      <Route path={SETTINGS_ROUTE} element={<Settings />}>
        <Route index path={GENERAL_ROUTE} element={<GeneralSettings />} />
        <Route path={ADVANCED_ROUTE} element={<AdvancedSettings />} />
        <Route path={SECURITY_ROUTE} element={<SecurityAndPolicy />} />
        <Route path={CONTACT_ROUTE} element={<ContactList />} />
        <Route path={NETWORK_ROUTE} element={<Networks />} />
        <Route path={ADD_NETWORKS} element={<AddNetworks />} />
        <Route path={ADD_NETWORKS_MANUALLY} element={<AddNetworksManually />} />
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Route>
  )
);

function App() {
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(fetchOnboardingState()).unwrap();
    appDispatch(fetchAccountsState()).unwrap();
    appDispatch(fetchSettingsState()).unwrap();
  }, [appDispatch]);

  return (
    <div className="app h-screen w-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
