/* global chrome */
// eslint-disable-next-line import/default
import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';

// For dev mode
reloadOnUpdate('pages/background');

chrome.runtime.onStartup.addListener(function () {
  chrome.storage.local.clear();
});

async function injectPopup(data) {
  chrome.storage.local.set({ notificationManager: data }, function () {
    chrome.windows.create({
      url: 'src/pages/notification/index.html',
      type: 'popup',
      height: 600,
      width: 385,
    });
  });
}

chrome.runtime.onMessage.addListener((data, _sender, response) => {
  new Promise(() => {
    if (data.provider) {
      injectPopup(data).then(() => {
        return;
      });
    } else {
      response(data);
    }
  });

  return true;
});

chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  if (message.type === 'updateConnectedSites') {
    const domain = message.domain;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];

      if (activeTab) {
        chrome.tabs.sendMessage(activeTab.id, {
          type: 'connectionApproved',
          domain: domain,
        });
      }
    });
  }
});
