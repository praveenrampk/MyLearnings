const DEFAULT_ROUTE = '/';
const UNLOCK_ROUTE = '/unlock';
const LOCK_ROUTE = '/lock';
const ASSET_ROUTE = '/asset';
const SETTINGS_ROUTE = '/settings';
const GENERAL_ROUTE = '/settings/general';
const ADVANCED_ROUTE = '/settings/advanced';
const EXPERIMENTAL_ROUTE = '/settings/experimental';
const SECURITY_ROUTE = '/settings/security';
const ABOUT_US_ROUTE = '/settings/about-us';
const ALERTS_ROUTE = '/settings/alerts';
const CONTACT_ROUTE = '/settings/contact-list';
const NETWORK_ROUTE = '/settings/networks';
const ADD_NETWORKS = '/settings/networks/add-popular-custom-network';
const ADD_NETWORKS_MANUALLY = '/settings/networks/add-network';

const REVEAL_SEED_ROUTE = '/seed';
const RESTORE_VAULT_ROUTE = '/restore-vault';
const IMPORT_TOKEN_ROUTE = '/import-token';
const CONFIRM_IMPORT_TOKEN_ROUTE = '/confirm-import-token';
const CONFIRM_ADD_SUGGESTED_TOKEN_ROUTE = '/confirm-add-suggested-token';
const NEW_ACCOUNT_ROUTE = '/new-account';
const IMPORT_ACCOUNT_ROUTE = '/new-account/import';

const SEND_ROUTE = '/send';
const TOKEN_DETAILS = '/token-details';
const CONNECT_ROUTE = '/connect';
const CONNECT_CONFIRM_PERMISSIONS_ROUTE = '/confirm-permissions';

const CONNECTED_ROUTE = '/connected';
const CONNECTED_ACCOUNTS_ROUTE = '/connected/accounts';

const ONBOARDING_ROUTE = '/onboarding';
const ONBOARDING_REVIEW_SRP_ROUTE = '/onboarding/review-recovery-phrase';
const ONBOARDING_CONFIRM_SRP_ROUTE = '/onboarding/confirm-recovery-phrase';
const ONBOARDING_CREATE_PASSWORD_ROUTE = '/onboarding/create-password';
const ONBOARDING_COMPLETION_ROUTE = '/onboarding/completion';
const ONBOARDING_UNLOCK_ROUTE = '/onboarding/unlock';
const ONBOARDING_HELP_US_IMPROVE_ROUTE = '/onboarding/help-us-improve';

const ONBOARDING_IMPORT_WITH_SRP_ROUTE =
  '/onboarding/import-with-recovery-phrase';
const ONBOARDING_SECURE_YOUR_WALLET_ROUTE = '/onboarding/secure-your-wallet';
const ONBOARDING_PRIVACY_SETTINGS_ROUTE = '/onboarding/privacy-settings';
const ONBOARDING_PIN_EXTENSION_ROUTE = '/onboarding/pin-extension';
const ONBOARDING_WELCOME_ROUTE = '/onboarding/welcome';

const CONFIRM_TRANSACTION_ROUTE = '/confirm-transaction';
const CONFIRM_SEND_ETHER_PATH = '/send-ether';
const CONFIRM_SEND_TOKEN_PATH = '/send-token';
const CONFIRM_DEPLOY_CONTRACT_PATH = '/deploy-contract';
const CONFIRM_APPROVE_PATH = '/approve';
const CONFIRM_SET_APPROVAL_FOR_ALL_PATH = '/set-approval-for-all';
const CONFIRM_TRANSFER_FROM_PATH = '/transfer-from';
const CONFIRM_SAFE_TRANSFER_FROM_PATH = '/safe-transfer-from';
const CONFIRM_TOKEN_METHOD_PATH = '/token-method';
const SIGNATURE_REQUEST_PATH = '/signature-request';
const DECRYPT_MESSAGE_REQUEST_PATH = '/decrypt-message-request';
const ENCRYPTION_PUBLIC_KEY_REQUEST_PATH = '/encryption-public-key-request';
const CONFIRMATION_V_NEXT_ROUTE = '/confirmation';

export {
  DEFAULT_ROUTE,
  ALERTS_ROUTE,
  ASSET_ROUTE,
  UNLOCK_ROUTE,
  LOCK_ROUTE,
  SETTINGS_ROUTE,
  REVEAL_SEED_ROUTE,
  RESTORE_VAULT_ROUTE,
  IMPORT_TOKEN_ROUTE,
  CONFIRM_IMPORT_TOKEN_ROUTE,
  CONFIRM_ADD_SUGGESTED_TOKEN_ROUTE,
  NEW_ACCOUNT_ROUTE,
  IMPORT_ACCOUNT_ROUTE,
  SEND_ROUTE,
  TOKEN_DETAILS,
  CONFIRM_TRANSACTION_ROUTE,
  CONFIRM_SEND_ETHER_PATH,
  CONFIRM_SEND_TOKEN_PATH,
  CONFIRM_DEPLOY_CONTRACT_PATH,
  CONFIRM_APPROVE_PATH,
  CONFIRM_SET_APPROVAL_FOR_ALL_PATH,
  CONFIRM_TRANSFER_FROM_PATH,
  CONFIRM_SAFE_TRANSFER_FROM_PATH,
  CONFIRM_TOKEN_METHOD_PATH,
  SIGNATURE_REQUEST_PATH,
  DECRYPT_MESSAGE_REQUEST_PATH,
  ENCRYPTION_PUBLIC_KEY_REQUEST_PATH,
  CONFIRMATION_V_NEXT_ROUTE,
  ADVANCED_ROUTE,
  EXPERIMENTAL_ROUTE,
  SECURITY_ROUTE,
  GENERAL_ROUTE,
  ABOUT_US_ROUTE,
  NETWORK_ROUTE,
  ADD_NETWORKS,
  ADD_NETWORKS_MANUALLY,
  CONNECT_ROUTE,
  CONNECT_CONFIRM_PERMISSIONS_ROUTE,
  CONNECTED_ROUTE,
  CONNECTED_ACCOUNTS_ROUTE,
  ONBOARDING_ROUTE,
  ONBOARDING_HELP_US_IMPROVE_ROUTE,
  ONBOARDING_CREATE_PASSWORD_ROUTE,
  ONBOARDING_IMPORT_WITH_SRP_ROUTE,
  ONBOARDING_SECURE_YOUR_WALLET_ROUTE,
  ONBOARDING_REVIEW_SRP_ROUTE,
  ONBOARDING_CONFIRM_SRP_ROUTE,
  ONBOARDING_PRIVACY_SETTINGS_ROUTE,
  ONBOARDING_COMPLETION_ROUTE,
  ONBOARDING_UNLOCK_ROUTE,
  ONBOARDING_PIN_EXTENSION_ROUTE,
  ONBOARDING_WELCOME_ROUTE,
  CONTACT_ROUTE,
};
