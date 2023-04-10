/* global chrome */
const scriptTag = document.createElement("script");
scriptTag.src = chrome.runtime.getURL("hex-provider.js");
scriptTag.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(scriptTag);

window.addEventListener(
  "message",
  async function (event) {
    // We only accept messages from this window to itself [i.e. not from any iframes]
    if (event.source !== window) return;

    if (event.data.to && event.data.to === "HEX") {
      chrome.runtime.sendMessage(event.data, function (data) {
        const dispatch = new CustomEvent("hexProvider", { detail: data });
        data.status ? console.log(data) : console.error(data);
        window.dispatchEvent(dispatch);
      }); // broadcasts it to rest of extension, or could just broadcast event.data.payload...
    } // else ignore messages seemingly not sent to yourself
  },
  false
);

chrome.runtime.onMessage.addListener((msgObj) => {
  const dispatch = new CustomEvent("hexProvider", { detail: msgObj });
  window.dispatchEvent(dispatch);
});
