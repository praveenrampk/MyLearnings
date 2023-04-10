/* global chrome */
import { get, isEmpty } from "lodash-es";
import { generateRandomValues } from "../service/crypto";
import { getDataFromChromeSyncStorage } from "../service/storage";
import { urlRegex } from "../utils/constants";

chrome.runtime.onStartup.addListener(function () {
  chrome.storage.local.clear(function () {});
});

function getPopup() {
  return new Promise((resolve) => {
    chrome.browserAction.getPopup({}, (popup) => {
      return resolve(popup);
    });
  });
}/*  */

function getResponseFromHex() {
  return new Promise(async (resolve) => {
    chrome.runtime.onMessage.addListener(function (data, sender, response) {
      if (data.type === "response") {
        resolve(data);
      }
    });
  });
}

async function injectPopup(data) {
  const popup = await getPopup();
  const newWindow = window.open(
    popup,
    "HEX" + generateRandomValues(32),
    "height=700,width=385"
  );

  newWindow.custom_data = data;
  newWindow.isNewWindow = true;
  newWindow.shouldForward = true;
}

chrome.runtime.onMessage.addListener(function (data, sender, sendResponse) {
  new Promise(async (respond) => {
    if (data.trigger) {
      chrome.storage.local.get("accountDetails", async (accDetail) => {
        try {
          let accountId, network;
          if (!isEmpty(accDetail)) {
            const account = JSON.parse(accDetail.accountDetails);
            accountId = account.accountId;
            network = account.network;
          }

          const accountsData =
            !isEmpty(accountId) &&
            (await getDataFromChromeSyncStorage(accountId));
          const accountDetail =
            !isEmpty(accountsData) && JSON.parse(accountsData[accountId]);
          const hosts = get(accountDetail, "approvedHosts", []);
          const isApproved =
            !isEmpty(hosts) &&
            hosts.find(
              (host) =>
                host ===
                (sender.origin.match(urlRegex) &&
                  new URL(sender.origin).hostname)
            );
          if (
            data.type === "enable-hex" ||
            (data.type !== "enable-hex" && isApproved)
          ) {
            if (
              isApproved &&
              (data.type === "enable-hex" || data.type === "hex-address")
            ) {
              respond({
                status: "success",
                message: {
                  message:
                    data.type !== "hex-address" ? "Hex Already Enabled" : null,
                  type: "onAccount",
                  accountId,
                  network,
                },
              });
            } else {
              await injectPopup(data);
              respond(getResponseFromHex());
            }
          } else {
            respond({
              status: "error",
              message: "Enable Hex for this site",
            });
          }
        } catch (err) {
          console.log(err.message);
          respond({
            status: "error",
            message: "Error Connecting HEX",
          });
        }
      });
    } else if (data.type === "response") {
      respond();
    } else {
      if (!get(data, "expanded", false)) await injectPopup(data);
      else {
        const popup = await getPopup();
        const newWindow = window.open(popup, "_blank");
        newWindow.custom_data = data;
        newWindow.isNewWindow = true;
        newWindow.shouldForward = true;
      }
      respond();
    }
  }).then(sendResponse);
  return true;
});
