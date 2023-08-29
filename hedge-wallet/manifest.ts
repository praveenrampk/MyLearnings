import packageJson from './package.json';

/**
 * After changing, please reload the extension at `chrome://extensions`
 */
const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  background: {
    service_worker: 'src/pages/background/index.js',
    type: 'module',
  },
  action: {
    default_title: 'HedgeHogg Wallet',
    default_popup: 'src/popup.html',
    default_icon: 'icon-34.png',
  },
  icons: {
    '128': 'icon-128.png',
  },
  content_security_policy: {
    extension_pages: "script-src 'self' 'wasm-unsafe-eval'",
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      js: ['src/pages/content/index.js'],
      // KEY for cache invalidation
      css: [],
    },
  ],
  commands: {
    _execute_action: {
      suggested_key: {
        default: 'Ctrl+Shift+H',
      },
    },
  },
  devtools_page: 'src/pages/devtools/index.html',
  host_permissions: [
    'http://localhost:8545/',
    'file://*/*',
    'http://*/*',
    'https://*/*',
  ],
  web_accessible_resources: [
    {
      resources: [
        'assets/js/*.js',
        'assets/css/*.css',
        'icon-128.png',
        'icon-34.png',
        'src/pages/provider/index.js',
      ],
      matches: ['*://*/*'],
    },
  ],
  permissions: [
    'storage',
    'unlimitedStorage',
    'clipboardWrite',
    'activeTab',
    'webRequest',
    'notifications',
    'scripting',
    'tabs',
    'nativeMessaging',
  ],
};

export default manifest;
