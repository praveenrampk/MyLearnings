{
  const scriptTag = document.createElement('script');
  scriptTag.src = chrome.runtime.getURL('src/pages/provider/index.js');

  scriptTag.addEventListener('load', () => {
    scriptTag.remove();
  });

  (document.head || document.documentElement).appendChild(scriptTag);

  window.addEventListener(
    'message',
    async function (event) {
      // We only accept messages from this window to itself [i.e. not from any iframes]
      if (event.source !== window) return;

      if (event.data.to && event.data.to === 'HedgeHogg') {
        chrome.runtime.sendMessage(event.data, function (data) {
          const dispatch = new CustomEvent('hedgeProvider', { detail: data });
          // eslint-disable-next-line no-console
          data.status ? console.log(data) : console.error(data);
          window.dispatchEvent(dispatch);
        });
      }
    },
    false
  );

  chrome.runtime.onMessage.addListener((msgObj) => {
    const dispatch = new CustomEvent('hedgeProvider', { detail: msgObj });
    window.dispatchEvent(dispatch);
  });

  // content script
  chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
    if (message.type === 'connectionApproved') {
      // Update your content script's state or perform any additional actions
      const domain = message.domain;

      // Notify the background script to update its data if needed
      chrome.runtime.sendMessage({ type: 'updateConnectedSites', domain });
    }
  });
}
